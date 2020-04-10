package com.sc.manage.controller.activity;

import com.sc.base.dto.activity.ActivityDto;
import com.sc.base.dto.activity.ManageActivityIndexIntoDto;
import com.sc.manage.service.activity.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @RequestMapping(value = "/manage_activity_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageActivityIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("activity/activity_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_activity_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageActivityIndexData(ManageActivityIndexIntoDto manageActivityIndexIntoDto){
        return activityService.ManageActivityIndex(manageActivityIndexIntoDto);
    }

    @RequestMapping(value = "/manage_activity_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageActivityFindPage(ModelAndView modelAndView, ActivityDto activityDto){
        modelAndView.setViewName("activity/activity_find");
        modelAndView.addObject("activityDto",activityService.findActivityEntityById(activityDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_activity_examine_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageActivityExaminePage(ModelAndView modelAndView,ActivityDto activityDto){
        modelAndView.setViewName("activity/activity_examine");
        modelAndView.addObject("activityDto",activityService.findActivityEntityById(activityDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_activity_examine_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageActivityExamineData(@RequestBody ActivityDto activityDto){
        return activityService.updateActivityEntityWhetherValid(activityDto);
    }

    @RequestMapping(value = "/manage_activity_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageActivityUpdatePage(ModelAndView modelAndView,ActivityDto activityDto){
        modelAndView.setViewName("activity/activity_update");
        modelAndView.addObject("activityDto",activityService.findActivityEntityById(activityDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_activity_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageActivityUpdateData(@RequestBody ActivityDto activityDto){
        return activityService.updateActivityEntityById(activityDto);
    }

    @RequestMapping(value = "/manage_activity_add_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageActivityAddPage(ModelAndView modelAndView){
        modelAndView.setViewName("activity/activity_add");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_activity_add_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageActivityAddData(@RequestBody ActivityDto activityDto){
        return activityService.addActivityEntity(activityDto);
    }


}
