package com.sc.property.controller.work;

import com.sc.base.dto.work.WorkDto;
import com.sc.property.service.work.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

import java.util.List;

@Controller
@RequestMapping("/sc/property/work")
public class WorkController {

    @Autowired
    private WorkService workService;

    /**
     * 修改工作状态
     * 传参id（即workId）,workStatus
     * workStatus值{
     *     ON_DUTY_STATUS("on_duty_status","上班"),
     *     BE_BUSY("be_busy","忙碌"),
     *     COME_OFF_DUTY("come_off_duty","下班");
     * }
     * @param workDto
     * @return
     */
    @RequestMapping(value = "/work",method = RequestMethod.POST)
    @ResponseBody
    public Result findAll(@RequestBody WorkDto workDto){
        try {
            return workService.updateWorkStatusById(workDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
