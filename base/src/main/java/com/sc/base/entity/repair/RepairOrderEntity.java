package com.sc.base.entity.repair;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_repair_order")
public class RepairOrderEntity {

    @Id
    private String id;
    private Date createDate;
    private Date updateDate;
    private String whetherValid;

    private String repairId;//维修id
    private String staffUserId;//维修员工id
    private String staffUserActualName;//维修人员姓名
    private String staffUserPhoneNumber;//维修人员电话号码
    private String workId;
    private String repairmanStatus;//维修人员状态（接受，维修中，维修完成/（拒绝，重新分配））
    private Integer score;//评分，取消-1

}
