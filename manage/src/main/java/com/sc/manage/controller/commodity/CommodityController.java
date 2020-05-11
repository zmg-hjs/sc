package com.sc.manage.controller.commodity;

import com.sc.base.dto.commodity.CommodityDto;
import com.sc.manage.service.commodity.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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

    @RequestMapping(value = "/manage_commodity_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageCommodityIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("commodity/commodity_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_commodity_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageCommodityIndexData(CommodityDto commodityDto){
        return commodityService.findCommodityEntityList(commodityDto);
    }

    @RequestMapping(value = "/manage_commodity_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageCommodityFindPage(ModelAndView modelAndView, CommodityDto commodityDto){
        modelAndView.setViewName("commodity/commodity_find");
        modelAndView.addObject("commodityDto",commodityService.findCommodityEntityById(commodityDto).getData());
        return modelAndView;
    }

}
