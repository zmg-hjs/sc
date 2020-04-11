package com.sc.base.dto.activity;

import com.sc.base.dto.common.BaseOutDto;
import lombok.Data;

@Data
public class ManageActivityIndexOutDto extends BaseOutDto {

    private String title;// 选举活动题目
    private String hostParty;// 举办方
    private String activityStatus;// 活动状态type
    private String activityStatusStr;// 活动状态name
    private Integer committeesNumber;//委员会人数
    private String activityStartTimeStr;// 活动开始时间
    private String votingEndTimeStr;// 投票结束时间

}
