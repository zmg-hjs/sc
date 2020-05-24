package com.sc.base.dto.user;

import lombok.Data;


@Data
public class ResidentRegistrationDto {

    private String id;
    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String address; //家庭地址
    private String community;//社区
    private String unit;//单元
    private String floor;//楼层
    private String door;//门牌号
    private String phoneNumber;  //微信注册电话号码
    private String createDateStr; //创建时间
    private String updateDateStr; //更新时间
    private String whetherValid;//是否有效type
    private String whetherValidStr;//是否有效name
    private String houseMembers;//家庭身份
    private String houseMembersStr;//家庭身份
}
