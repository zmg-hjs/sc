package com.sc.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_resident_registration")
public class ResidentRegistrationEntity {
    @Id
    private String id;
    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String address; //家庭地址
    private String phoneNumber;  //微信注册电话号码
    private Date createDate; //创建时间
    private Date updateDate; //更新时间
}
