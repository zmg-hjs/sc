package com.sc.base.dto.user;

import lombok.Data;

import javax.persistence.Id;

@Data
public class ResidentUserDto {

    private String id;

    private String openId; //微信小程序用户id
    private String unionId; //用户在同一微信开放平台下id
    private String username;  //微信用户名
    private String password;  //密码
    private String headPictureUrl; //微信头像图片地址
    private String phoneNumber;  //微信注册电话号码（工作人员登记号码）
    private String createDateStr; //创建时间
    private String updateDateStr; //更新时间

    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String address; //家庭地址
    private String userAuditId; //审核表id;
    private String role; //角色
    private String roleStr; //角色
    private String applicationStatus; //申请状态
    private String whetherValid; //是否有效
    private String whetherValidStr; //是否有效

}
