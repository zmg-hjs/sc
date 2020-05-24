package com.sc.manage.controller.repair;

import com.sc.base.dto.repair.RepairDto;
import com.sc.manage.service.repair.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/repair")
public class RepairController {

    @Autowired
    private RepairService repairService;

    @RequestMapping(value = "/manage_repair_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_repair_index_page(ModelAndView modelAndView){
        modelAndView.setViewName("repair/repair_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_repair_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result manage_repair_index_data(RepairDto repairDto){
        return repairService.findRepairEntityList(repairDto);
    }

    @RequestMapping(value = "/manage_repair_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_repair_find_page(ModelAndView modelAndView, RepairDto repairDto){
        modelAndView.setViewName("repair/repair_find");
        modelAndView.addObject("repairDto",repairService.findOne(repairDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_repair_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_repair_update_page(ModelAndView modelAndView, RepairDto repairDto){
        modelAndView.setViewName("repair/repair_update");
        modelAndView.addObject("repairDto",repairService.findOne(repairDto).getData());
        modelAndView.addObject("workDtoList",repairService.findStaffUserList().getData());
        return modelAndView;
    }

    /**
     * 分配
     * @param repairDto
     * @return
     */
    @RequestMapping(value = "/manage_repair_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manage_repair_update_data(@RequestBody RepairDto repairDto){
        return repairService.update(repairDto);
    }

}
