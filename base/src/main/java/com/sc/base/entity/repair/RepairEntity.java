package com.sc.base.entity.repair;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_repair")
public class RepairEntity {

    @Id
    private String id;
    private Date createDate;
    private Date updateDate;
    private String whetherValid;

    private String residentUserId;
    private String residentUserActualName;//居民姓名
    private String residentUserPhoneNumber;//居民电话号码
    private String maintenanceContent;//报修内容
    private String maintenanceAddress;//报修地址
    private String maintenanceStatus;//维修状态（派遣中，派遣成功，维修中，维修完成，反馈）
    private String maintenanceFeedback;//反馈
    private Integer score;//评分
    private String staffUserId;//维修人员id
    private String staffUserActualName;//维修人员姓名
    private String staffUserPhoneNumber;//维修人员电话号码
    private String repairOrderId;
    private String workId;

}
