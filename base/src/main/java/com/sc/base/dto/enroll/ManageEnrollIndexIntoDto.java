package com.sc.base.dto.enroll;

import com.sc.base.dto.common.BaseIntoDto;
import lombok.Data;


@Data
public class ManageEnrollIndexIntoDto extends BaseIntoDto {
    private String activityId;//活动id
    private String residentUserActualName;  // 姓名
    private String auditStatus;  // 审核状态type
    private Integer voteNumber;  // 票数（默认为0）
}
