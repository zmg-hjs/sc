package com.sc.base.entity.user;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_staff_registration")
public class StaffRegistrationEntity {
    @Id
    private String id;
    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String position; //职位（角色）
    private String address; //地址
    private String phoneNumber;  //注册电话号码
    private Date createDate; //创建时间
    private Date updateDate; //更新时间
    private String whetherValid; //是否有效
}
