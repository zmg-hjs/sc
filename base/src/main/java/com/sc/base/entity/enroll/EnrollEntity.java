package com.sc.base.entity.enroll;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_activity")
public class EnrollEntity {
    @Id
    private String id;
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid;//该数据是否有效

    private String residentUserId;  // 居民id
    private String residentUserActualName;  // 姓名
    private String residentUserAddress;  // 地址
    private String briefIntroduction;  // 简介（简单介绍自己，参加选举原因，能力）
    private String auditStatus;  // 审核状态
    private String auditReason;  // 原因（通过原因，失败原因）
    private Integer voteNumber;  // 票数（默认为0）

}
