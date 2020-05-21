package com.sc.manage.controller.repair;

import com.sc.base.dto.repair.RepairOrderDto;
import com.sc.manage.service.repair.RepairOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/repair")
public class RepairOrderController {

    @Autowired
    private RepairOrderService repairOrderService;

    @RequestMapping(value = "/manage_repair_order_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_repair_order_index_page(ModelAndView modelAndView){
        modelAndView.setViewName("repair/repair_order_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_repair_order_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result manage_repair_order_index_data(RepairOrderDto repairOrderDto){
        return repairOrderService.findMyRepairEntityList(repairOrderDto);
    }

    @RequestMapping(value = "/manage_repair_order_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_repair_order_find_page(ModelAndView modelAndView, RepairOrderDto repairOrderDto){
        modelAndView.setViewName("repair/repair_order_find");
        modelAndView.addObject("repairDto",repairOrderService.findRepairEntityOne(repairOrderDto).getData());
        modelAndView.addObject("repairOrderDto",repairOrderService.findRepairOrderEntityOne(repairOrderDto).getData());

        return modelAndView;
    }
}
