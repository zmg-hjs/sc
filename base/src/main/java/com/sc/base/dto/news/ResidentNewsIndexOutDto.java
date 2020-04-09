package com.sc.base.dto.news;

import com.sc.base.dto.common.BaseOutDto;
import lombok.Data;

@Data
public class ResidentNewsIndexOutDto extends BaseOutDto {
    private String title;
    private String content;
    private String staffUserActualName;
}
