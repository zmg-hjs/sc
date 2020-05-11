package com.sc.base.dto.commodity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

@Data
public class CommodityOrderDto {
    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String buyerId;//买家id
    private String buyerActualName;// 买家姓名
    private String buyerPhoneNumber;// 买家电话号码
    private String harvestAddress;// 买家地址
    private String commodityId;// 商品id

    private String commodityStatus;// 商品状态type
    private String commodityStatusStr;// 商品状态name
    private String feedback;// '反馈',
    private String commodityName;// '商品名称',
    private String commodityPictureUrl;// '商品图片',
    private List<String> commodityPictureUrlList;

    private Integer page;
    private Integer limit;

}
