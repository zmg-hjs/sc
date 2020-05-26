package com.sc.manage.controller.login;

import com.sc.base.dto.user.StaffUserDto;
import com.sc.manage.configuration.WebSecurityConfig;
import com.sc.manage.service.user.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    private StaffService staffService;

    @GetMapping("/")
    public String index(@SessionAttribute(WebSecurityConfig.SESSION_KEY) StaffUserDto staffUserDto, Model model) {
        model.addAttribute("staffUserDto", staffUserDto);
        return "index";
    }

    @RequestMapping(value = "/sc/manage/login_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView loginPage(ModelAndView modelAndView){
        modelAndView.setViewName("user/login");
        return modelAndView;
    }

    @RequestMapping(value = "/sc/manage/login",method = RequestMethod.POST)
    public String ManageNewsIndexPage(ModelAndView modelAndView, StaffUserDto staffUserDto, HttpSession session){
        Result<StaffUserDto> result = staffService.login(staffUserDto);
        if (result.isSuccess()){
            session.setAttribute(WebSecurityConfig.SESSION_KEY, result.getData());
        }
        return "redirect:/";
    }

    @RequestMapping(value = "/sc/manage/logout",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageNewsIndexPage(HttpSession session){
        session.removeAttribute(WebSecurityConfig.SESSION_KEY);
        return Result.createSimpleSuccessResult();
    }

    @RequestMapping(value = "/main",method = RequestMethod.GET)
    public String ManageNewsIndexPage(){
        return "main";
    }

}
