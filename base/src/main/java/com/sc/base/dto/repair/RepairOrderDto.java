package com.sc.base.dto.repair;

import lombok.Data;


@Data
public class RepairOrderDto {

    private String id;
    private String createDateStr;
    private String updateDateStr;
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String repairId;//维修id
    private String staffUserId;//维修员工id
    private String repairmanStatus;//维修人员状态type（接受，维修中，维修完成/（拒绝，重新分配））
    private String repairmanStatusStr;//维修人员状态name（接受，维修中，维修完成/（拒绝，重新分配））
    private Integer score;//评分，取消-1

}
