package com.sc.base.entity.news;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_news")
public class NewsEntity {

    @Id
    private String id;
    private String title;
    private String content;
    private String fileUrl;
    private Date createDate;
    private Date updateDate;
    private String whetherValid;
    private String staffUserId;
    private String staffUserActualName;
}
