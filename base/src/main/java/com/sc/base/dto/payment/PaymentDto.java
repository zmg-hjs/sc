package com.sc.base.dto.payment;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
public class PaymentDto {

    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String residentUserId;
    private String residentUserActualName;//居民姓名
    private String residentUserPhoneNumber;//居民电话号码
    private String residentUserAddress;

    private Double propertyCost;//物业费用
    private String paymentStatus;//缴费状态type
    private String paymentStatusStr;//缴费状态name
    private String description;//物业费描述
    private String timeFrame;//那年那月物业费

    private Integer page;
    private Integer limit;
}
