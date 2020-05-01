package com.sc.property.controller.repair;

import com.sc.base.dto.repair.RepairDto;
import com.sc.base.dto.repair.RepairOrderDto;
import com.sc.property.service.repair.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

import java.util.List;

@Controller
@RequestMapping("/sc/property/repair")
public class RepairController {

    @Autowired
    private RepairService repairService;

    /**
     * 报修列表
     * 传入参数 无
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/property_repair_list",method = RequestMethod.POST)
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
     * 报修列表详情
     * 传入参数 id维修表id
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/property_repair_one",method = RequestMethod.POST)
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
     * 报修列表接受
     * 传入参数 id维修表id、staffUserId、workId、staffUserActualName、staffUserPhoneNumber
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/property_repair_add",method = RequestMethod.POST)
    @ResponseBody
    public Result addRepairOrderEntity(@RequestBody RepairDto repairDto){
        try {
            return repairService.addRepairOrderEntity(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 我的维修列表
     * 传入参数 staffUserId、maintenanceStatus
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/property_repair_my_list",method = RequestMethod.POST)
    @ResponseBody
    public Result findMyRepairEntityList(@RequestBody RepairDto repairDto){
        try {
            return repairService.findMyRepairEntityList(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 我的维修列表详情
     * 传入参数 id维修表id
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/property_repair_my_one",method = RequestMethod.POST)
    @ResponseBody
    public Result<RepairDto> findMyRepairEntityById(@RequestBody RepairDto repairDto){
        try {
            return repairService.findRepairEntityById(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 取消维修
     * 传入参数 id维修表id,repairOrderId,workId,staffUserId
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/property_repair_my_cancel",method = RequestMethod.POST)
    @ResponseBody
    public Result<RepairDto> cacelRepair(@RequestBody RepairDto repairDto){
        try {
            return repairService.cacelRepair(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 开始维修
     * 传入参数 id维修表id,repairOrderId
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/property_repair_my_start",method = RequestMethod.POST)
    @ResponseBody
    public Result<RepairDto> startRepair(@RequestBody RepairDto repairDto){
        try {
            return repairService.startRepair(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 完成维修
     * 传入参数 id维修表id,repairOrderId,workId,staffUserId
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/property_repair_my_end",method = RequestMethod.POST)
    @ResponseBody
    public Result<RepairDto> endRepair(@RequestBody RepairDto repairDto){
        try {
            return repairService.endRepair(repairDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


    /**
     * 我的取消维修列表
     * 传入参数 staffUserId
     * @param repairOrderDto
     * @return
     */
    @RequestMapping(value = "/property_repair_my_cancel_list",method = RequestMethod.POST)
    @ResponseBody
    public Result findMyRepairEntityList(@RequestBody RepairOrderDto repairOrderDto){
        try {
            return repairService.findMyCancel(repairOrderDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
