package com.sc.base.dto.common;

import lombok.Data;

@Data
public class BaseOutDto {
    private String id;
    private String whetherValid; //是否有效
    private String createDateStr; //创建时间
    private String updateDateStr; //更新时间
}
