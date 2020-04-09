package com.sc.manage.controller.user;

import com.sc.base.dto.user.ManageResidentRegistrationIndexIntoDto;
import com.sc.base.dto.user.ManageResidentUserIndexIntoDto;
import com.sc.base.dto.user.ResidentRegistrationDto;
import com.sc.base.dto.user.ResidentUserDto;
import com.sc.manage.service.user.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/resident")
public class ResidentController {

    @Autowired
    private ResidentService residentService;

    @RequestMapping(value = "/manage_resident_user_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageResidentUserIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("user/resident_user_index");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_resident_user_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageResidentUserIndexData(ManageResidentUserIndexIntoDto manageResidentUserIndexIntoDto){
        return residentService.ManageResidentUserIndex(manageResidentUserIndexIntoDto);
    }

    @RequestMapping(value = "/manage_resident_user_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manageResidentUserFindPage(ModelAndView modelAndView, ResidentUserDto residentUserDto){
        modelAndView.addObject("residentUser", residentService.findResidentUserById(residentUserDto).getData());
        modelAndView.setViewName("user/resident_user_update");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_resident_user_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manageResidentUserUpdatePage(ModelAndView modelAndView,ResidentUserDto residentUserDto){
        modelAndView.addObject("residentUser", residentService.findResidentUserById(residentUserDto).getData());
        modelAndView.setViewName("user/resident_user_examine");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_resident_user_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manageResidentUserUpdatePage(@RequestBody ResidentUserDto residentUserDto){
        return residentService.updateResidentUserWhetherValid(residentUserDto);
    }
//    --------------------------------------------------------------------------------------

    @RequestMapping(value = "/manage_resident_registration_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageResidentRegistrationIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("user/resident_registration_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_resident_registration_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageResidentRegistrationIndexData(ManageResidentRegistrationIndexIntoDto manageResidentRegistrationIndexIntoDto){
        return residentService.ManageResidentRegistrationIndex(manageResidentRegistrationIndexIntoDto);
    }

    @RequestMapping(value = "/manage_resident_registration_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageResidentRegistrationFindPage(ModelAndView modelAndView, ResidentRegistrationDto residentRegistrationDto){
        modelAndView.setViewName("user/resident_registration_find");
        modelAndView.addObject("residentRegistration",residentService.findResidentRegistrationEntityById(residentRegistrationDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_resident_registration_examine_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageResidentRegistrationExaminePage(ModelAndView modelAndView,ResidentRegistrationDto residentRegistrationDto){
        modelAndView.setViewName("user/resident_registration_examine");
        modelAndView.addObject("residentRegistration",residentService.findResidentRegistrationEntityById(residentRegistrationDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_resident_registration_examine_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageResidentRegistrationExamineData(@RequestBody ResidentRegistrationDto residentRegistrationDto){
        return residentService.updateResidentRegistrationWhetherValid(residentRegistrationDto);
    }

    @RequestMapping(value = "/manage_resident_registration_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageResidentRegistrationUpdatePage(ModelAndView modelAndView,ResidentRegistrationDto residentRegistrationDto){
        modelAndView.setViewName("user/resident_registration_update");
        modelAndView.addObject("residentRegistration",residentService.findResidentRegistrationEntityById(residentRegistrationDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_resident_registration_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageResidentRegistrationUpdateData(@RequestBody ResidentRegistrationDto residentRegistrationDto){
        return residentService.updateResidentRegistrationEntity(residentRegistrationDto);
    }

    @RequestMapping(value = "/manage_resident_registration_add_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageResidentRegistrationAddPage(ModelAndView modelAndView){
        modelAndView.setViewName("user/resident_registration_add");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_resident_registration_add_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageResidentRegistrationAddData(@RequestBody ResidentRegistrationDto residentRegistrationDto){
        return residentService.addResidentRegistrationEntity(residentRegistrationDto);
    }
    
}
