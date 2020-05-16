package com.sc.base.dto.user;

import com.sc.base.dto.common.BaseIntoDto;
import lombok.Data;


@Data
public class ManageResidentRegistrationIndexIntoDto extends BaseIntoDto {

    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String address; //地址
    private String phoneNumber;  //注册电话号码
    private String houseMembers;//成员

}
