package com.sc.base.dto.vote;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
public class VoteDto {

    private String id;
    private String createDateStr;  //创建时间
    private String updateDateStr;  //更新时间
    private String whetherValid;//该数据是否有效type
    private String whetherValidStr;//该数据是否有效name

    private String enrollId;  // 报名登记表id
    private String residentUserId;  // 投票居民id
    private String votedPersonId;  // 被投票人员id
    private String residentUserActualName;  // 投票居民姓名
    private String votedPersonActualName;  // 被投票人员姓名
    //投票居民 把票投给了 被投票人员
}
