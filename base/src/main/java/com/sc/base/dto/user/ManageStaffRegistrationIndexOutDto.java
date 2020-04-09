package com.sc.base.dto.user;

import com.sc.base.dto.common.BaseOutDto;
import lombok.Data;

@Data
public class ManageStaffRegistrationIndexOutDto extends BaseOutDto {
    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String position; //职位（角色）type
    private String positionStr; //职位（角色）name
    private String address; //地址
    private String phoneNumber;  //注册电话号码
}
