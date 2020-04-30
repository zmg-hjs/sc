package com.sc.resident.controller.commodity;

import com.sc.base.dto.commodity.CommodityDto;
import com.sc.resident.service.commodity.CommodityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

import java.util.List;

@Controller
@RequestMapping("/sc/resident/commodity")
public class CommodityController {

    @Autowired
    private CommodityService commodityService;

    /**
     * 查询商品列表
     * 传入参数
     * 选传 commodityName、commodityClassification
     * 必传 commoditystatus=audit_successful(审核成功)
     * @param commodityDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_list",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<CommodityDto>> findCommodityEntityList(@RequestBody CommodityDto commodityDto){
        try {
            return commodityService.findCommodityEntityList(commodityDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查看商品详情
     * 传入参数
     * @param commodityDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_one",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<CommodityDto>> findCommodityEntityById(@RequestBody CommodityDto commodityDto){
        try {
            return commodityService.findCommodityEntityById(commodityDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 发布商品
     * 传入参数 businessId商家id，businessActualName商家姓名，businessPhoneNumber商家电话号码
     *         commodityName商品名称,commodityIntroduce商品介绍,commodityPictureUrl商品图片地址
     *         commodityPrice商品价格，commodityClassification商品分类
     * @param commodityDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_add",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<CommodityDto>> add(@RequestBody CommodityDto commodityDto){
        try {
            return commodityService.add(commodityDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    



}
