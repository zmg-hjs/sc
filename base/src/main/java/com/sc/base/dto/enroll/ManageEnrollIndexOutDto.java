package com.sc.base.dto.enroll;

import com.sc.base.dto.common.BaseOutDto;
import lombok.Data;

@Data
public class ManageEnrollIndexOutDto extends BaseOutDto {

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
