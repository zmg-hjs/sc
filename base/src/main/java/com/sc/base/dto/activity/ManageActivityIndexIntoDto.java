package com.sc.base.dto.activity;

import com.sc.base.dto.common.BaseIntoDto;
import lombok.Data;


@Data
public class ManageActivityIndexIntoDto extends BaseIntoDto {
    private String title;// 选举活动题目
    private String hostParty;// 举办方
    private String activityStatus;// 活动状态type
}
