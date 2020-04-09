package com.sc.base.dto.car;

import lombok.Data;

@Data
public class CarDto {

    private String id;

    private String userId; //拼车发起者id
    private String starting; //起始地
    private String destinayion; //目的地
    private String peopleNum; //目标人数
    private String peopleNow; //现有人数
    private String telephone; //发起人电话
    private String carNum; //车牌号
    private String time; //出发时间
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;

}
