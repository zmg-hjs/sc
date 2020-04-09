package com.sc.manage.controller.user;

import com.sc.base.dto.user.ManageStaffRegistrationIndexIntoDto;
import com.sc.base.dto.user.ManageStaffUserIndexIntoDto;
import com.sc.base.dto.user.StaffRegistrationDto;
import com.sc.base.dto.user.StaffUserDto;
import com.sc.manage.service.user.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @RequestMapping(value = "/manage_staff_user_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageStaffUserIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("user/staff_user_index");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_staff_user_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageStaffUserIndexData(ManageStaffUserIndexIntoDto manageStaffUserIndexIntoDto){
        return staffService.ManageStaffUserIndex(manageStaffUserIndexIntoDto);
    }

    @RequestMapping(value = "/manage_staff_user_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manageStaffUserFindPage(ModelAndView modelAndView,StaffUserDto staffUserDto){
        modelAndView.addObject("staffUser", staffService.findStaffUserById(staffUserDto).getData());
        modelAndView.setViewName("user/staff_user_update");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_staff_user_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manageStaffUserUpdatePage(ModelAndView modelAndView,StaffUserDto staffUserDto){
        modelAndView.addObject("staffUser", staffService.findStaffUserById(staffUserDto).getData());
        modelAndView.setViewName("user/staff_user_examine");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_staff_user_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manageStaffUserUpdatePage(@RequestBody StaffUserDto staffUserDto){
        return staffService.updateStaffUserWhetherValid(staffUserDto);
    }
//    --------------------------------------------------------------------------------------

    @RequestMapping(value = "/manage_staff_registration_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageStaffRegistrationIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("user/staff_registration_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_staff_registration_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageStaffRegistrationIndexData(ManageStaffRegistrationIndexIntoDto manageStaffRegistrationIndexIntoDto){
        return staffService.ManageStaffRegistrationIndex(manageStaffRegistrationIndexIntoDto);
    }

    @RequestMapping(value = "/manage_staff_registration_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageStaffRegistrationFindPage(ModelAndView modelAndView,StaffRegistrationDto staffRegistrationDto){
        modelAndView.setViewName("user/staff_registration_find");
        modelAndView.addObject("staffRegistration",staffService.findStaffRegistrationEntityById(staffRegistrationDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_staff_registration_examine_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageStaffRegistrationExaminePage(ModelAndView modelAndView,StaffRegistrationDto staffRegistrationDto){
        modelAndView.setViewName("user/staff_registration_examine");
        modelAndView.addObject("staffRegistration",staffService.findStaffRegistrationEntityById(staffRegistrationDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_staff_registration_examine_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageStaffRegistrationExamineData(@RequestBody StaffRegistrationDto staffRegistrationDto){
        return staffService.updateStaffRegistrationWhetherValid(staffRegistrationDto);
    }

    @RequestMapping(value = "/manage_staff_registration_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageStaffRegistrationUpdatePage(ModelAndView modelAndView,StaffRegistrationDto staffRegistrationDto){
        modelAndView.setViewName("user/staff_registration_update");
        modelAndView.addObject("staffRegistration",staffService.findStaffRegistrationEntityById(staffRegistrationDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_staff_registration_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageStaffRegistrationUpdateData(@RequestBody StaffRegistrationDto staffRegistrationDto){
        return staffService.updateStaffRegistrationEntity(staffRegistrationDto);
    }

    @RequestMapping(value = "/manage_staff_registration_add_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageStaffRegistrationAddPage(ModelAndView modelAndView){
        modelAndView.setViewName("user/staff_registration_add");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_staff_registration_add_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageStaffRegistrationAddData(@RequestBody StaffRegistrationDto staffRegistrationDto){
        return staffService.addStaffRegistrationEntity(staffRegistrationDto);
    }

}
