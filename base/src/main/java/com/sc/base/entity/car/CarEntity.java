package com.sc.base.entity.car;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Package: com.sc.base.entity.car
 * <p>
 * Description： TODO
 * <p>
 * Author: hjscode
 * <p>
 * Date: Created in 2020/3/31 21:54
 */
@Data
@Entity
@Table(name = "t_resident_car")
public class CarEntity {
    @Id
    private String id;

    private String userId; //拼车发起者id
    private String starting; //起始地
    private String destinayion; //目的地
    private String peopleNum; //目标人数
    private String peopleNow; //现有人数
    private String telephone; //发起人电话
    private String carNum; //车牌号
    private String time; //出发时间
    private Date createDate;  //创建时间
    private Date updateDate;  //更新时间
    private String whetherValid;
}
