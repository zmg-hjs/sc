package com.sc.base.dto.common;

import lombok.Data;

@Data
public class BaseIntoDto {
    private String EndCreateDateStr; //创建时间(结束)
    private String StartCreateDateStr; //创建时间(开始)
    private String EndUpdateDateStr; //更新时间(结束)
    private String StartUpdateDateStr; //更新时间(开始)
    private String whetherValid; //是否有效
    private Integer page;
    private Integer limit;
}
