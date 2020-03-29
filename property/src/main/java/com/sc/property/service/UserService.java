package com.sc.property.service;

import com.sc.entity.UserEntity;
import com.sc.enums.WhetherValidEnum;
import com.sc.property.repository.UserRepository;
import myJson.MyJsonUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vo.Result;
import weChat.entity.WeChatEntity;
import weChat.util.GetWeChatInfoUtil;

import java.util.Date;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;
    @Value("${wechat.appid}")
    private String appId;
    @Value("${wechat.appsecret}")
    private String appSecret;

    public UserEntity findUserEntityById(String id){
        return userRepository.findUserEntityById(id);
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
     * 跳转到注册页面{
     * 1.注册时从居民记录表中审核信息，如果不存在，返回失败
     * 2.如果存在则注册信息{
     *      获取用户信息需要参数 encryptedData,iv
     * }
     * }
     */
    public Result login(WeChatEntity weChatEntity){
        weChatEntity.setAppid(appId);
        weChatEntity.setAppSecret(appSecret);

        String data = GetWeChatInfoUtil.getOpenIdAndSessionKey(weChatEntity).getData();
        data = data.replace("session_key", "sessionKey");
        data = data.replace("openid","openId");
        System.out.println(data);
        WeChatEntity weChatEntity1 = MyJsonUtil.jsonToPojo(data, WeChatEntity.class);

        UserEntity userEntity = userRepository.findUserEntityByOpenId(weChatEntity1.getOpenId());
        if (userEntity!=null && StringUtils.isNotBlank(userEntity.getId())) return new Result().setSuccess(userEntity);

        weChatEntity.setOpenId(weChatEntity1.getOpenId());
        weChatEntity.setSessionKey(weChatEntity1.getSessionKey());
        Result<String> result = GetWeChatInfoUtil.getUserInfo(weChatEntity);
        System.out.println(result.getData());
        return new Result().setSuccess(weChatEntity);
        //查询是否拥有该居民，是，注册,返回成功，不是，返回失败;
//        return Result.createSimpleFailResult();
    }

    /**
     * 方式2
     * 1.获取openId
     * 2.判断数据库是否存在openId，存在，自动登录
     */
    public Result automaticLogin(WeChatEntity weChatEntity){
        weChatEntity.setAppid(appId);
        weChatEntity.setAppSecret(appSecret);
        WeChatEntity weChatEntity1 = MyJsonUtil.jsonToPojo(GetWeChatInfoUtil.getOpenIdAndSessionKey(weChatEntity).getData(), WeChatEntity.class);
        UserEntity userEntity = userRepository.findUserEntityByOpenId(weChatEntity1.getOpenId());
        if (StringUtils.isNotBlank(userEntity.getId())) return new Result().setSuccess(userEntity);
        return Result.createSimpleFailResult();
    }

    public void addUserEntity(UserEntity userEntity){
        userEntity.setCreateDate(new Date());
        userEntity.setUpdateDate(new Date());
        userEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
        userRepository.save(userEntity);
    }

}
