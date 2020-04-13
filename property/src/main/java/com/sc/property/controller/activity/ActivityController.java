package com.sc.property.controller.activity;

import com.sc.base.dto.activity.ActivityDto;
import com.sc.base.dto.activity.ManageActivityIndexIntoDto;
import com.sc.base.dto.enroll.EnrollDto;
import com.sc.base.dto.vote.VoteDto;
import com.sc.property.service.activity.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

@Controller
@RequestMapping("/sc/property/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @RequestMapping(value ="/findAll",method = RequestMethod.POST)
    @ResponseBody
    public Result activityIndex(@RequestBody ManageActivityIndexIntoDto indexIntoDto){
        try {
            Result result = activityService.activityIndex(indexIntoDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }

    @RequestMapping(value ="/findOne",method = RequestMethod.POST)
    @ResponseBody
    public Result findActivityEntityById(@RequestBody ActivityDto activityDto){
        try {
            Result result = activityService.findActivityEntityById(activityDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }

    @RequestMapping(value ="/enroll/findAll",method = RequestMethod.POST)
    @ResponseBody
    public Result findEnrollEntitiesByActivityIdOrderByCreateDateDesc(@RequestBody EnrollDto enrollDto){
        try {
            Result result = activityService.findEnrollEntitiesByActivityIdOrderByCreateDateDesc(enrollDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }

    @RequestMapping(value ="/enroll/findAll",method = RequestMethod.POST)
    @ResponseBody
    public Result findEnrollEnitiesByActivityIdAndAuditStatus(@RequestBody EnrollDto enrollDto){
        try {
            Result result = activityService.findEnrollEnitiesByActivityIdAndAuditStatus(enrollDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }

    @RequestMapping(value ="/enroll/findOne",method = RequestMethod.POST)
    @ResponseBody
    public Result findEnrollEnityById(@RequestBody EnrollDto enrollDto){
        try {
            Result result = activityService.findEnrollEnityById(enrollDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }

    @RequestMapping(value ="/vote/findAll",method = RequestMethod.POST)
    @ResponseBody
    public Result findAllVote(@RequestBody VoteDto voteDto){
        try {
            Result result = activityService.findAll(voteDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
}
