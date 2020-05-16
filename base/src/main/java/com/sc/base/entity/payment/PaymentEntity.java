package com.sc.base.entity.payment;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "t_property_payment")
public class PaymentEntity {
    @Id
    private String id;
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid; //该数据是否有效

    private String residentUserId;
    private String residentUserActualName;//居民姓名
    private String residentUserPhoneNumber;//居民电话号码
    private String residentUserAddress;

    private BigDecimal propertyCost;//物业费用
    private String paymentStatus;//缴费状态
    private String description;//物业费描述
    private String timeFrame;//那年那月物业费

}
