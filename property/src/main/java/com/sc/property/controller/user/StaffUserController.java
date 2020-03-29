package com.sc.property.controller.user;


import com.sc.entity.StaffUserEntity;
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
    public Result<StaffUserEntity> findUserEntityById(){
        return new Result<StaffUserEntity>().setSuccess(staffUserService.findUserEntityById("1"));
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

    /**
     * 微信小程序登录或注册
     * @return
     */
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    @ResponseBody
    public Result register(@RequestBody WeChatEntity weChatEntity){
        try {
            Result login = staffUserService.login(weChatEntity);
            return login;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }


}
