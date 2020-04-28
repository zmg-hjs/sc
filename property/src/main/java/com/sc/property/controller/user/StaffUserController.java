package com.sc.property.controller.user;


import com.sc.base.dto.user.RegisterDto;
import com.sc.base.entity.user.StaffUserEntity;
import com.sc.property.service.user.StaffUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;
import weChat.entity.WeChatEntity;

@Controller
@RequestMapping("/sc/property/user")
public class StaffUserController {

    @Autowired
    private StaffUserService staffUserService;

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    @ResponseBody
    public Result<StaffUserEntity> findStaffUserEntityById(){
        return new Result<StaffUserEntity>().setSuccess(staffUserService.findStaffUserEntityById("1"));
    }

    /**
     * 微信小程序登录或注册
     * @return
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Result login(@RequestBody WeChatEntity weChatEntity){
        try {
            Result login = staffUserService.login(weChatEntity);
            return login;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    @ResponseBody
    public Result register(@RequestBody RegisterDto registerDto){
        try {
            Result register = staffUserService.register(registerDto);
            return register;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 微信小程序登录或注册
     * @return
     */
    @RequestMapping(value = "/automaticLogin",method = RequestMethod.POST)
    @ResponseBody
    public Result automaticLogin(@RequestBody WeChatEntity weChatEntity){
        try {
            Result automaticLoginResult = staffUserService.automaticLogin(weChatEntity);
            return automaticLoginResult;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }


}
