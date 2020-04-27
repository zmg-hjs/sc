package com.sc.base.entity.work;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_work")
public class WorkEntity {
    @Id
    private String id;
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid;//该数据是否有效

    private String staffUserId;//员工id
    private String staffUserActualName;//员工姓名
    private String staffUserPhoneNumber;//员工电话号码
    private String staffUserPosition;//员工职位
    private String workStatus;//员工工作状态
    private Integer newsNumber;//发布新闻数量
    private Integer repairNumber;//维修数量
    private Integer weight;//优先级

}
