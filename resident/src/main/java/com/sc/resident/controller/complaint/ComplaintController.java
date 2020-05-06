package com.sc.resident.controller.complaint;

import com.sc.base.dto.complaint.ComplaintDto;
import com.sc.resident.service.complaint.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

import java.util.List;

@Controller
@RequestMapping("/sc/resident/complaint")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    /**
     * 我的投诉列表
     * 传入参数  residentUserId,complaintStatus
     * complaintStatus值{
     *     PROCESSING("processing","处理中"),
     *     PROCESSED("processed","已处理"),
     * }
     * @param complaintDto
     * @return
     */
    @RequestMapping(value = "/resident_complint_my_list",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<ComplaintDto>> findAll(@RequestBody ComplaintDto complaintDto){
        try {
            return complaintService.findAll(complaintDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 投诉
     * 传参 residentUserId，residentUserActualName，complaintContent（投诉内容）
     * @param complaintDto
     * @return
     */
    @RequestMapping(value = "/resident_complint_add",method = RequestMethod.POST)
    @ResponseBody
    public Result add(@RequestBody ComplaintDto complaintDto){
        try {
            return complaintService.add(complaintDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
