package com.sc.base.dto.commodity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Data
public class CommodityDto {
    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String businessId;//商家id
    private String businessActualName;// 商家姓名
    private String businessPhoneNumber;// 商家电话号码
    private String commodityName;// 商品名称
    private String commodityIntroduce;// 商品介绍
    private String commodityPictureUrl;// 商品图片
    private List<String> commodityPictureUrlList;// 商品图片
    private Double commodityPrice;// 商品价格
    private String commodityClassification;// 商品分类
    private String commodityClassificationStr;// 商品分类
    private String transactionMode;// 交易方式
    private String commodityReviewStatus;// 商品审核状态type
    private String commodityReviewStatusStr;// 商品审核状态name
    private String commodityStatus;// 商品状态type
    private String commodityStatusStr;// 商品状态name
    private String reviewReason;// '审核失败原因',
    private Integer commodityNumber;// '商品数量',
    private String commodityOrderId;// 订单id

    private Integer page;
    private Integer limit;

}
