package com.sc.property.service.user;

import com.alibaba.fastjson.JSONObject;
import com.sc.base.dto.RegisterDto;
import com.sc.base.entity.StaffRegistrationEntity;
import com.sc.base.entity.StaffUserEntity;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.user.StaffRegistrationRepository;
import com.sc.base.repository.user.StaffUserRepository;
import myJson.MyJsonUtil;
import myString.MyStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vo.Result;
import weChat.entity.WeChatEntity;
import weChat.util.GetWeChatInfoUtil;

import java.util.Date;

@Service
public class StaffUserService {


    @Autowired
    private StaffUserRepository staffUserRepository;
    @Autowired
    private StaffRegistrationRepository staffRegistrationRepository;
    @Value("${wechat.appid}")
    private String appId;
    @Value("${wechat.appsecret}")
    private String appSecret;

    public StaffUserEntity findStaffUserEntityById(String id){
        return staffUserRepository.findStaffUserEntityById(id);
    }

    //用户登录方式
    // 1.点击登录，获取用户信息注册
    // 2.已注册，自动登录
    /**
     * 方式1
     * 1.获取openId{
     *     需要参数 appId,appSecret,code
     * }
     * 2.判断数据库是否存在openId，存在，登录{
     *   返回userEntity
     * }，
     * 不存在,返回失败
     */
    public Result<StaffUserEntity> login(WeChatEntity weChatEntity){
        //查询用户openId
        weChatEntity.setAppid(appId);
        weChatEntity.setAppSecret(appSecret);
        Result<String> result1 = GetWeChatInfoUtil.getOpenIdAndSessionKey(weChatEntity);
        if (!result1.isSuccess()) return Result.createNewResult(result1);
        JSONObject jsonObject = JSONObject.parseObject(result1.getData());
        weChatEntity.setOpenId((String) jsonObject.get("openid"));
        //根据openId查询是否存在改用户
        StaffUserEntity staffUserEntity = staffUserRepository.findStaffUserEntityByOpenId(weChatEntity.getOpenId());
        if (staffUserEntity !=null && StringUtils.isNotBlank(staffUserEntity.getId())) return new Result().setSuccess(staffUserEntity);
        return Result.createSimpleFailResult();
    }

    /**
     * //查询是否拥有该居民，是，注册,返回成功，不是，返回失败;
     * 跳转到注册页面{
     *  1.注册时从居民记录表中审核信息，如果不存在，返回失败
     *  2.如果存在则注册信息{
     *      获取用户信息需要参数 encryptedData,iv
     *  }
     * }
     * @param registerDto
     * @return
     */
    public Result register(RegisterDto registerDto){
        //判断是否存在该用户
        StaffRegistrationEntity staffRegistrationEntity = staffRegistrationRepository.findStaffRegistrationEntityByIdNumber(registerDto.getIdNumber());
        if (staffRegistrationEntity==null&&StringUtils.isBlank(staffRegistrationEntity.getId()))
            return Result.createSimpleFailResult();

        StaffUserEntity staffUserEntity = new StaffUserEntity();
        staffUserEntity.setId(MyStringUtils.getIdDateStr("staffUser"));
        staffUserEntity.setIdNumber(registerDto.getIdNumber());
        staffUserEntity.setActualName(staffRegistrationEntity.getActualName());
        staffUserEntity.setAddress(staffRegistrationEntity.getAddress());
        staffUserEntity.setPosition(staffRegistrationEntity.getPosition());
        staffUserEntity.setUserAuditId(staffRegistrationEntity.getId());
        staffUserEntity.setPhoneNumber(staffRegistrationEntity.getPhoneNumber());
        //获取微信用户信息
        WeChatEntity weChatEntity = new WeChatEntity();
        weChatEntity.setAppid(appId);
        weChatEntity.setAppSecret(appSecret);
        weChatEntity.setCode(registerDto.getCode());
        weChatEntity.setEncryptedData(registerDto.getEncryptedData());
        weChatEntity.setIv(registerDto.getIv());
        Result<String> result = GetWeChatInfoUtil.getUserInfo(weChatEntity);
        /*
        {"openId":"oojUN5JWGwgsLgdwoPXI5LmTKY6U",
        "nickName":"源","gender":0,
        "language":"zh_CN",
        "city":"","province":"","country":"",
        "avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/wjSpv6ibG6ribZU7eFAzYUQYgcZAOqTmkWTpXcQicBUc1ry1rYXOSVlaEoI3Km2j0LyvB3HRZeXxgYnCyIzFSFtibw/132",
        "watermark":{"timestamp":1585462984,"appid":"wx358e0da133141282"}}
         */
        if (StringUtils.isNotBlank(result.getData())){
            JSONObject jsonObject = JSONObject.parseObject(result.getData());
            staffUserEntity.setOpenId((String) jsonObject.get("openId"));
            staffUserEntity.setUsername((String) jsonObject.get("nickName"));
            staffUserEntity.setHeadPictureUrl((String) jsonObject.get("avatarUrl"));
            addUserEntity(staffUserEntity);
        }
        return Result.createSimpleSuccessResult();
    }

    /**
     * 方式2
     * 1.获取openId
     * 2.判断数据库是否存在openId，存在，自动登录
     */
    public Result<StaffUserEntity> automaticLogin(WeChatEntity weChatEntity){
        weChatEntity.setAppid(appId);
        weChatEntity.setAppSecret(appSecret);
        WeChatEntity weChatEntity1 = MyJsonUtil.jsonToPojo(GetWeChatInfoUtil.getOpenIdAndSessionKey(weChatEntity).getData(), WeChatEntity.class);
        StaffUserEntity staffUserEntity = staffUserRepository.findStaffUserEntityByOpenId(weChatEntity1.getOpenId());
        if (StringUtils.isNotBlank(staffUserEntity.getId())) return new Result().setSuccess(staffUserEntity);
        return Result.createSimpleFailResult();
    }

    public void addUserEntity(StaffUserEntity staffUserEntity){
        staffUserEntity.setCreateDate(new Date());
        staffUserEntity.setUpdateDate(new Date());
        staffUserEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
        staffUserRepository.save(staffUserEntity);
    }

}
