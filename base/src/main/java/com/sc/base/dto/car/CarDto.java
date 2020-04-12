package com.sc.base.dto.car;

import lombok.Data;

@Data
public class CarDto {

    private String id;

    private String userId; //拼车发起者id
    private String userActualName; //拼车发起者name
    private String starting; //起始地
    private String destination; //目的地
    private Integer peopleNum; //目标人数
    private Integer peopleNow; //现有人数
    private String telephone; //发起人电话
    private String carNum; //车牌号
    private String time; //出发时间
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;
    private String whetherValidStr;
    private String carpoolStatus;
    private String carpoolStatusStr;
}
