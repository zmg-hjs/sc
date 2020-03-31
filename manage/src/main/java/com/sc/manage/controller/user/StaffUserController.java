package com.sc.manage.controller.user;

import com.sc.base.dto.user.ManageStaffUserIndexIntoDto;
import com.sc.base.dto.user.ManageStaffUserIndexOutDto;
import com.sc.manage.service.user.StaffUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

import java.util.List;

@Controller
@RequestMapping("/sc/manage/user")
public class StaffUserController {

    @Autowired
    private StaffUserService staffUserService;

    @RequestMapping(value = "/manage_staff_user_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageStaffUserIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("user/staff_user_index");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_staff_user_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageStaffUserIndexData(ManageStaffUserIndexIntoDto manageStaffUserIndexIntoDto){
        return staffUserService.ManageStaffUserIndex(manageStaffUserIndexIntoDto);
    }
}
