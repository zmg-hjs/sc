package com.sc.base.dto.news;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
public class NewsDto {

    private String id;
    private String title;
    private String content;
    private String fileUrl;
    private String createDateStr;
    private String updateDateStr;
    private String whetherValid;
    private String whetherValidStr;
    private String staffUserId;
    private String staffUserActualName;
}
