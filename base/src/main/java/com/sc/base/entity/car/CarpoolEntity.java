package com.sc.base.entity.car;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Entity
@Table(name = "t_resident_carpool")
public class CarpoolEntity {

    @Id
    private String id;
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid;

    private String residentCarId;//拼车id
    private String residentUserId;//拼车发起人id
    private String residentUserActualName;//拼车发起人姓名
    private String carpoolUserId;//拼车人id
    private String carpoolUserActualName;//拼车人姓名
    private String carpoolStatus;
    private Integer carpoolNumber;//拼车人数

}
