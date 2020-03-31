package com.sc.base.dto.user;

import com.sc.base.dto.common.BaseIntoDto;
import lombok.Data;

import javax.persistence.Id;
import java.util.Date;

@Data
public class ManageStaffUserIndexIntoDto extends BaseIntoDto {

    private String username;  //微信用户名
    private String actualName; //身份证名称
    private String idNumber; //身份证号
    private String address; //家庭地址
    private String userAuditId; //审核表id;
    private String position; //角色
    private String applicationStatus; //申请状态

}
