package com.sc.base.entity.complaint;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_complaint")
public class ComplaintEntity {
    @Id
    private String id;
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid;//该数据是否有效

    private String residentUserId;//投诉居民id
    private String residentUserActualName;//投诉居民姓名
    private String complaintContent;//投诉内容
    private String complaintStatus;// 投诉状态
    private String feedback;//反馈回复

}
