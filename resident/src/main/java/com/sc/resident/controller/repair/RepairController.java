package com.sc.resident.controller.repair;

import com.sc.base.dto.repair.RepairDto;
import com.sc.resident.service.repair.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

import java.util.List;

@Controller
@RequestMapping("/sc/resident/repair")
public class RepairController {

    @Autowired
    private RepairService repairService;

    /**
     * 查询列表
     * 传入参数 residentUserId居民id
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/resident_repair_list",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<RepairDto>> findRepairEntityList(@RequestBody RepairDto repairDto){
        try {
            return repairService.findRepairEntityList(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询详情
     * 传入参数 id维修表id
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/resident_repair_one",method = RequestMethod.POST)
    @ResponseBody
    public Result<RepairDto> findRepairEntityById(@RequestBody RepairDto repairDto){
        try {
            return repairService.findRepairEntityById(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 报修
     * 传入参数 residentUserId 居民id
     * residentUserActualName 报修人员姓名
     * residentUserPhoneNumber 报修人员联系方式
     * maintenanceContent 报修内容
     * maintenanceAddress 报修人员维修地址
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/resident_repair_add",method = RequestMethod.POST)
    @ResponseBody
    public Result addRepairEntity(@RequestBody RepairDto repairDto){
        try {
            return repairService.addRepairEntity(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 取消报修
     * 传入参数 id维修表id
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/resident_repair_cancel",method = RequestMethod.POST)
    @ResponseBody
    public Result cacelRepair(@RequestBody RepairDto repairDto){
        try {
            return repairService.cacelRepair(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 报修反馈
     * 传入参数 id维修表id  maintenanceFeedback报修反馈
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/resident_repair_feedback",method = RequestMethod.POST)
    @ResponseBody
    public Result repairFeedback(@RequestBody RepairDto repairDto){
        try {
            return repairService.repairFeedback(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


}
