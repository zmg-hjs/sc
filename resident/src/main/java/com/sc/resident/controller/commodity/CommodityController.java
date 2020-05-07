package com.sc.resident.controller.commodity;

import com.sc.base.dto.commodity.CommodityDto;
import com.sc.base.dto.commodity.CommodityOrderDto;
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
     * 卖家取消发布
     * 传入参数 id
     * @param commodityDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_my_unpublish",method = RequestMethod.POST)
    @ResponseBody
    public Result unpublish(@RequestBody CommodityDto commodityDto){
        try {
            return commodityService.unpublish(commodityDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 卖家取消交易
     * 传入参数 id,commodityOrderId
     * @param commodityDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_my_cancel",method = RequestMethod.POST)
    @ResponseBody
    public Result cancelTransaction(@RequestBody CommodityDto commodityDto){
        try {
            return commodityService.cancelTransaction(commodityDto);
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
    public Result<CommodityDto> findCommodityEntityById(@RequestBody CommodityDto commodityDto){
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
    public Result add(@RequestBody CommodityDto commodityDto){
        try {
            return commodityService.add(commodityDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询我的商品列表
     * 传入参数 businessid、commoditystatus
     * @param commodityDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_my_list",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<CommodityDto>> findMyCommodityEntityList(@RequestBody CommodityDto commodityDto){
        try {
            return commodityService.findCommodityEntityList(commodityDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询我的商品详情,如果该商品存在commodityOrderId，需调用接口resident_commodity_order_one
     * 传入参数 id
     * @param commodityDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_my_one",method = RequestMethod.POST)
    @ResponseBody
    public Result<CommodityDto> findMyCommodityEntityById(@RequestBody CommodityDto commodityDto){
        try {
            return commodityService.findCommodityEntityById(commodityDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询我的订单列表
     * 传入参数 buyerId、commodityStatus
     * @param commodityOrderDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_order_list",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<CommodityOrderDto>> findCommodityOrderEntityList(@RequestBody CommodityOrderDto commodityOrderDto){
        try {
            return commodityService.findCommodityOrderEntityList(commodityOrderDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询我的订单详情,还需调用接口resident_commodity_my_one
     * 传入参数 id
     * @param commodityOrderDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_order_one",method = RequestMethod.POST)
    @ResponseBody
    public Result<CommodityOrderDto> findCommodityOrderEntityById(@RequestBody CommodityOrderDto commodityOrderDto){
        try {
            return commodityService.findCommodityOrderEntityById(commodityOrderDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 购买
     * 传入参数 buyerId;//买家id,buyerActualName;// 买家姓名,buyerPhoneNumber;// 买家电话号码,
     *         harvestAddress;// 买家地址,commodityId;// 商品id,
     * @param commodityOrderDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_buy",method = RequestMethod.POST)
    @ResponseBody
    public Result buy(@RequestBody CommodityOrderDto commodityOrderDto){
        try {
            return commodityService.buy(commodityOrderDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 买家取消交易
     * 传入参数 id，commodityId
     * @param commodityOrderDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_order_cancel",method = RequestMethod.POST)
    @ResponseBody
    public Result buyerCancelTransaction(@RequestBody CommodityOrderDto commodityOrderDto){
        try {
            return commodityService.buyerCancelTransaction(commodityOrderDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 买家完成交易
     * 传入参数 id，commodityId
     * @param commodityOrderDto
     * @return
     */
    @RequestMapping(value = "/resident_commodity_order_complete",method = RequestMethod.POST)
    @ResponseBody
    public Result buyerCompleteTransaction(@RequestBody CommodityOrderDto commodityOrderDto){
        try {
            return commodityService.buyerCompleteTransaction(commodityOrderDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }



}
