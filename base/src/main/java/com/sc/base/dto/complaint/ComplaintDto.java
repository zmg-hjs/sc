package com.sc.base.dto.complaint;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "t_complaint")
public class ComplaintDto {
    @Id
    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String residentUserId;//投诉居民id
    private String residentUserActualName;//投诉居民姓名
    private String complaintContent;//投诉内容
    private String complaintStatus;// 投诉状态type
    private String complaintStatusStr;// 投诉状态name

}
