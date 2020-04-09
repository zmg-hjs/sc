package com.sc.base.dto.user;

import com.sc.base.dto.common.BaseIntoDto;
import lombok.Data;


@Data
public class ManageResidentUserIndexIntoDto extends BaseIntoDto {

    private String username;  //微信用户名
    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String address; //家庭地址
    private String role; //角色
    private String phoneNumber;//工作人员后台登记号码

}
