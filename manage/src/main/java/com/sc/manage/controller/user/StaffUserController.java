package com.sc.manage.controller.user;

import com.sc.manage.service.user.StaffUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/user")
public class StaffUserController {

    @Autowired
    private StaffUserService staffUserService;

    @RequestMapping(value = "/test",method = RequestMethod.GET)
    @ResponseBody
    public Result findStaffUserEntityById(){
        return new Result().setSuccess(staffUserService.findAll());
    }

}
