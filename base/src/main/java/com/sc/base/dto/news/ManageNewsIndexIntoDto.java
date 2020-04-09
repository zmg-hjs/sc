package com.sc.base.dto.news;

import com.sc.base.dto.common.BaseIntoDto;
import lombok.Data;


@Data
public class ManageNewsIndexIntoDto extends BaseIntoDto {
    private String title;
    private String content;
    private String staffUserId;
    private String staffUserActualName;
}
