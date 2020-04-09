package com.sc.base.dto.news;

import com.sc.base.dto.common.BaseOutDto;
import lombok.Data;

@Data
public class ManageNewsIndexOutDto extends BaseOutDto {
    private String title;
    private String content;
    private String fileUrl;
    private String staffUserId;
    private String staffUserActualName;
}
