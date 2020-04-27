package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum WorkStatusEnum {

    ON_DUTY_STATUS("on_duty_status","上班"),
    BE_BUSY("be_busy","忙碌"),
    COME_OFF_DUTY("come_off_duty","下班");

    private String type;
    private String name;


    WorkStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static WorkStatusEnum getTypes(String status) {
        for (WorkStatusEnum whetherValidEnum : WorkStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (WorkStatusEnum whetherValidEnum : WorkStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<WorkStatusEnum> getAllEnum(){
        List<WorkStatusEnum> list= Arrays.asList();
        for (WorkStatusEnum whetherValidEnum : WorkStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<WorkStatusEnum> getEnumTypesBylikeType(String type){
        List<WorkStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}