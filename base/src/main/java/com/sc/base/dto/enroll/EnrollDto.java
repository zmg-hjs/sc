package com.sc.base.dto.enroll;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
public class EnrollDto {

    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String activityId;//活动id
    private String residentUserId;  // 居民id
    private String residentUserActualName;  // 姓名
    private String residentUserAddress;  // 地址
    private String briefIntroduction;  // 简介（简单介绍自己，参加选举原因，能力）
    private String auditStatus;  // 审核状态type
    private String auditStatusStr;  // 审核状态name
    private String auditReason;  // 原因（通过原因，失败原因）
    private Integer voteNumber;  // 票数（默认为0）

}
