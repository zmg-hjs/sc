package com.sc.base.dto.activity;

import com.sc.base.dto.enroll.EnrollDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ActivityDto {

    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid; //该数据是否有效type
    private String whetherValidStr; //该数据是否有效name

    private String title;// 选举活动题目
    private String content;//选举活动内容
    private String hostParty;// 举办方
    private String activityStatus;// 活动状态type
    private String activityStatusStr;// 活动状态name
    private Integer committeesNumber;//委员会人数

    private String activityStartTimeStr;// 活动开始时间
    private String activityEndTimeStr;//  活动结束时间
    private String votingStartTimeStr;// 投票开始时间
    private String votingEndTimeStr;// 投票结束时间

    private List<EnrollDto> enrollDtoList = new ArrayList<>();

}
