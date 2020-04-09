package com.sc.base.dto.common;

import lombok.Data;

@Data
public class BaseOutDto {
    private String id;
    private String whetherValid; //是否有效type
    private String whetherValidStr;//是否有效name
    private String createDateStr; //创建时间
    private String updateDateStr; //更新时间
}
