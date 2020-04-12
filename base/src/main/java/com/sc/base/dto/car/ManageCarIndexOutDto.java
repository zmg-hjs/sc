package com.sc.base.dto.car;

import com.sc.base.dto.common.BaseOutDto;
import lombok.Data;

@Data
public class ManageCarIndexOutDto extends BaseOutDto {
    private String userActualName; //拼车发起者name
    private String telephone; //发起人电话
    private String starting; //起始地
    private String destination; //目的地
    private String carNum; //车牌号
    private String time; //出发时间
    private Integer peopleNum; //目标人数
    private Integer peopleNow; //现有人数
    private String carpoolStatus;
    private String carpoolStatusStr;
}
