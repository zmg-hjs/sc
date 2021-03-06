package com.sc.base.dto.user;

import lombok.Data;

@Data
public class RegisterDto {

    private String encryptedData; //包括敏感数据在内的完整用户信息的加密数据
    private String iv;
    private String code;

    private String phoneNumber; //电话号码
    private String unit;  //单元
    private String actualName; //姓名（身份证）
    private String floor; //楼层
    private String door; //门牌号

}
