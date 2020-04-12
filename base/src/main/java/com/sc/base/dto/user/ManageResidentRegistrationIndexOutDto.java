package com.sc.base.dto.user;

import com.sc.base.dto.common.BaseOutDto;
import lombok.Data;

@Data
public class ManageResidentRegistrationIndexOutDto extends BaseOutDto {
    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String address; //地址
    private String phoneNumber;  //注册电话号码
    private String community;//社区
    private String unit;//单元
    private String floor;//楼层
    private String door;//门牌号
}
