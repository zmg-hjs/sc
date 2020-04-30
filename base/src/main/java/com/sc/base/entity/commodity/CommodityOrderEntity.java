package com.sc.base.entity.commodity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_commodity_order")
public class CommodityOrderEntity {
    @Id
    private String id;
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid;//该数据是否有效

    private String buyerId;//'买家id',
    private String buyerActualName;// '买家姓名',
    private String buyerPhoneNumber;// '买家电话号码',
    private String commodityId;// 商品id
    private String commodityStatus;// 商品状态
    private String harvestAddress;// 收获地址
    private String feedback;// '反馈',


}
