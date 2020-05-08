package com.sc.resident.controller.user;


import com.sc.base.dto.user.RegisterDto;
import com.sc.base.dto.user.ResidentUserDto;
import com.sc.base.dto.user.UpdateUserDto;
import com.sc.resident.service.user.ResidentUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;
import weChat.entity.WeChatEntity;

import java.util.List;

@Controller
@RequestMapping("/sc/resident/user")
public class ResidentUserController {

    @Autowired
    private ResidentUserService residentUserService;

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    @ResponseBody
    public Result findResidentUserEntityById(){
        return new Result().setSuccess(residentUserService.findResidentUserEntityById("1"));
    }

    /**
     * 微信小程序登录或注册
     * @return
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Result login(@RequestBody WeChatEntity weChatEntity){
        try {
            Result login = residentUserService.login(weChatEntity);
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
    public Result register(@RequestBody RegisterDto registerDto){
        try {
            Result register = residentUserService.register(registerDto);
            return register;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
    /**
     * 更新用户属数据
     */
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    @ResponseBody
    public Result update(@RequestBody UpdateUserDto updateUserDto){
        try{
            Result update = residentUserService.update(updateUserDto);
            return update;
        }catch (Exception e){
            return  Result.createSystemErrorResult();
        }
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/all",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<ResidentUserDto>> findAll(@RequestBody ResidentUserDto residentUserDto){
        try{
            Result<List<ResidentUserDto>> result = residentUserService.findAll(residentUserDto);
            return result;
        }catch (Exception e){
            return  Result.createSystemErrorResult();
        }
    }


}
