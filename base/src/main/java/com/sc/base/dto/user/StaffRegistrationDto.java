package com.sc.base.dto.user;

import lombok.Data;

@Data
public class StaffRegistrationDto {
    private String id;
    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String position; //职位（角色）type
    private String positionStr; //职位（角色）name
    private String address; //地址
    private String phoneNumber;  //注册电话号码
    private String createDateStr; //创建时间
    private String updateDateStr; //更新时间
    private String whetherValid; //是否有效
    private String whetherValidStr; //是否有效
}
