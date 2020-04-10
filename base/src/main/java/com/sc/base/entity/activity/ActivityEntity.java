package com.sc.base.entity.activity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_activity")
public class ActivityEntity {
    @Id
    private String id;
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid; //该数据是否有效

    private String title;// 选举活动题目
    private String content;//选举活动内容
    private String hostParty;// 举办方
    private String activityStatus;// 活动状态
    private Integer committeesNumber;//委员会人数

    private String activityStartTime;// 活动开始时间
    private String activityEndTime;//  活动结束时间
    private String votingStartTime;// 投票开始时间
    private String votingEndTime;// 投票结束时间

}
