package com.sc.base.entity.commodity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "t_commodity")
public class CommodityEntity {
    @Id
    private String id;
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid;//该数据是否有效

    private String businessId;//'商家id',
    private String businessActualName;// '商家姓名',
    private String businessPhoneNumber;// '商家电话号码',
    private String commodityName;// '商品名称',
    private String commodityIntroduce;// '商品介绍',
    private String commodityPictureUrl;// '商品图片',
    private BigDecimal commodityPrice;// '商品价格',
    private String commodityClassification;// '商品分类',
    private String transactionMode;// '交易方式',
    private String commodityReviewStatus;// '商品审核状态',
    private String commodityStatus;// '商品状态',
    private Integer commodityNumber;// '商品数量',
    private String reviewReason;// '审核失败原因',
    private String commodityOrderId;// '订单id'

}
