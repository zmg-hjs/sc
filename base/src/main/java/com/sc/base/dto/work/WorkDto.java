package com.sc.base.dto.work;

import lombok.Data;


@Data
public class WorkDto {
    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String staffUserId;//员工id
    private String staffUserActualName;//员工姓名
    private String staffUserPhoneNumber;//员工电话号码
    private String staffUserPosition;//员工职位

    private String workStatus;//员工工作状态type
    private String workStatusStr;//员工工作状态name

    private Integer newsNumber;//发布新闻数量
    private Integer repairNumber;//维修数量

}
