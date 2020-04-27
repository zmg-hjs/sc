package com.sc.base.dto.repair;

import lombok.Data;


@Data
public class RepairDto {

    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String residentUserId;
    private String residentUserActualName;//居民姓名
    private String residentUserPhoneNumber;//居民电话号码
    private String maintenanceContent;//报修内容
    private String maintenanceAddress;//报修地址

    private String maintenanceStatus;//维修状态type（派遣中，派遣成功，维修中，维修完成，反馈）
    private String maintenanceStatusStr;//维修状态name（派遣中，派遣成功，维修中，维修完成，反馈）


    private String maintenanceFeedback;//反馈
    private Integer score;//评分
    private String staffUserId;//维修人员id
    private String staffUserActualName;//维修人员姓名
    private String staffUserPhoneNumber;//维修人员电话号码

}
