package com.sc.manage.controller.commodity;

import com.sc.base.dto.commodity.CommodityDto;
import com.sc.base.dto.commodity.CommodityOrderDto;
import com.sc.manage.service.commodity.CommodityOrderService;
import com.sc.manage.service.commodity.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/commodity")
public class CommodityController {

    @Autowired
    private CommodityService commodityService;
    @Autowired
    private CommodityOrderService commodityOrderService;

    @RequestMapping(value = "/manage_commodity_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_commodity_index_page(ModelAndView modelAndView){
        modelAndView.setViewName("commodity/commodity_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_commodity_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result manage_commodity_index_data(CommodityDto commodityDto){
        return commodityService.findCommodityEntityList(commodityDto);
    }

    @RequestMapping(value = "/manage_commodity_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_commodity_find_page(ModelAndView modelAndView, CommodityDto commodityDto){
        modelAndView.setViewName("commodity/commodity_find");
        modelAndView.addObject("commodityDto",commodityService.findCommodityEntityById(commodityDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_commodity_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_commodity_update_page(ModelAndView modelAndView, CommodityDto commodityDto){
        modelAndView.setViewName("commodity/commodity_update");
        modelAndView.addObject("commodityDto",commodityService.findCommodityEntityById(commodityDto).getData());
        return modelAndView;
    }

    /**
     * 审核
     * @param commodityDto
     * @return
     */
    @RequestMapping(value = "/manage_commodity_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manage_commodity_update_data(@RequestBody CommodityDto commodityDto){
        return commodityService.update(commodityDto);
    }
    ////////////////////////////////////////////////////////////
    @RequestMapping(value = "/manage_commodity_order_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_commodity_order_index_page(ModelAndView modelAndView){
        modelAndView.setViewName("commodity/commodity_order_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_commodity_order_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result manage_commodity_order_index_data(CommodityOrderDto commodityOrderDto){
        return commodityOrderService.findCommodityOrderEntityList(commodityOrderDto);
    }

    @RequestMapping(value = "/manage_commodity_order_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_commodity_order_find_page(ModelAndView modelAndView, CommodityOrderDto commodityOrderDto){
        modelAndView.setViewName("commodity/commodity_order_find");
        modelAndView.addObject("commodityOrderDto",commodityOrderService.findCommodityOrderEntityById(commodityOrderDto).getData());
        modelAndView.addObject("commodityDto",commodityOrderService.findCommodityEntityById(commodityOrderDto).getData());
        return modelAndView;
    }
}
