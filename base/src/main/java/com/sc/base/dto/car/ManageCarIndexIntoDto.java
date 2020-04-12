package com.sc.base.dto.car;

import com.sc.base.dto.common.BaseIntoDto;
import lombok.Data;


@Data
public class ManageCarIndexIntoDto extends BaseIntoDto {
    private String userActualName; //拼车发起者name
    private String starting; //起始地
    private String destination; //目的地
    private String telephone; //发起人电话
    private String carNum; //车牌号
    private String carpoolStatus;
}
