package com.sc.resident.controller.activity;

import com.sc.base.dto.activity.ActivityDto;
import com.sc.base.dto.activity.ManageActivityIndexIntoDto;
import com.sc.base.dto.enroll.EnrollDto;
import com.sc.base.dto.enroll.ManageEnrollIndexIntoDto;
import com.sc.base.dto.vote.VoteDto;
import com.sc.resident.service.activity.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

@Controller
@RequestMapping("sc/resident/activity")
public class activityController {

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

    @RequestMapping(value ="/enroll/add",method = RequestMethod.POST)
    @ResponseBody
    public Result addEnrollEnity(@RequestBody EnrollDto enrollDto){
        try {
            Result result = activityService.addEnrollEnity(enrollDto);
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
    @RequestMapping(value ="/enroll/findResult",method = RequestMethod.POST)
    @ResponseBody
    public Result enrollEntityResult(@RequestBody ManageEnrollIndexIntoDto indexIntoDto){
        try {
            Result result = activityService.enrollEntityResult(indexIntoDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
    @RequestMapping(value ="/vote/add",method = RequestMethod.POST)
    @ResponseBody
    public Result addCarAndCarpool(@RequestBody VoteDto voteDto){
        try {
            Result result = activityService.addVoteEnity(voteDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }

}
