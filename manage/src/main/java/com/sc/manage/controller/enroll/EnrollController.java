package com.sc.manage.controller.enroll;

import com.sc.base.dto.enroll.EnrollDto;
import com.sc.base.dto.enroll.ManageEnrollIndexIntoDto;
import com.sc.manage.service.enroll.EnrollService;
import com.sc.manage.service.vote.VoteService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/sc/manage/enroll")
public class EnrollController {

    @Autowired
    private EnrollService enrollService;

    @Autowired
    private VoteService voteService;

    @RequestMapping(value = "/manage_enroll_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageEnrollIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("enroll/enroll_index");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_enroll_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageEnrollIndexPage(ModelAndView modelAndView, String id, HttpSession session){
        session.setAttribute("activityId", id);
        modelAndView.setViewName("enroll/enroll_index");
        modelAndView.addObject("activityId",id);
        return modelAndView;
    }

    @RequestMapping(value = "/manage_enroll_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageEnrollIndexData(ManageEnrollIndexIntoDto manageEnrollIndexIntoDto,HttpSession session){
        String activityId = (String) session.getAttribute("activityId");
        if (StringUtils.isNotBlank(activityId)){
            manageEnrollIndexIntoDto.setActivityId(activityId);
        }else return Result.createSystemErrorResult();
        return enrollService.ManageEnrollIndex(manageEnrollIndexIntoDto);
    }

    @RequestMapping(value = "/manage_enroll_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageEnrollFindPage(ModelAndView modelAndView, EnrollDto enrollDto){
        modelAndView.setViewName("enroll/enroll_find");
        modelAndView.addObject("enrollDto",enrollService.findEnrollEntityById(enrollDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_enroll_examine_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageEnrollExaminePage(ModelAndView modelAndView,EnrollDto enrollDto){
        modelAndView.setViewName("enroll/enroll_examine");
        modelAndView.addObject("enrollDto",enrollService.findEnrollEntityById(enrollDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_enroll_examine_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageEnrollExamineData(@RequestBody EnrollDto enrollDto){
        return enrollService.updateEnrollEntityAuditStatus(enrollDto);
    }

    @RequestMapping(value = "/manage_enroll_vote_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageEnrollVotePage(ModelAndView modelAndView,EnrollDto enrollDto){
        modelAndView.setViewName("enroll/enroll_vote");
        modelAndView.addObject("voteDtoList",voteService.findAll(enrollDto.getId()).getData());
        return modelAndView;
    }



}
