package com.sc.base.dto.car;

import lombok.Data;

import javax.persistence.Id;

@Data
public class CarpoolDto {

    @Id
    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;
    private String whetherValidStr;

    private String residentCarId;//拼车id
    private String residentUserId;//拼车发起人id
    private String residentUserActualName;//拼车发起人姓名
    private String carpoolUserId;//拼车人id
    private String carpoolUserActualName;//拼车人姓名
    private String carpoolStatus;
    private String carpoolStatusStr;
    private Integer carpoolNumber;//拼车人数

}
