package com.sc.property.controller;


import com.sc.entity.UserEntity;
import com.sc.property.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;
import weChat.entity.WeChatEntity;
import weChat.util.GetWeChatInfoUtil;

@Controller
@RequestMapping("/sc/property/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    @ResponseBody
    public Result<UserEntity> findUserEntityById(){
        return new Result<UserEntity>().setSuccess(userService.findUserEntityById("1"));
    }

    /**
     * 微信小程序登录或注册
     * @return
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Result login(@RequestBody WeChatEntity weChatEntity){
        try {
            Result login = userService.login(weChatEntity);
            return login;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }

}
