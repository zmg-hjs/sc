package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum RepairStatusEnum {

    CANCEL("cancel","取消"),
    DISPATCH("dispatch","派遣中"),
    SUCCESSFUL_DISPATCH("complete_dispatch","完成派遣"),
    UNDER_MAINTENANCE("under_repair","维修中"),
    REPAIR_SUCCESSFUL("repair_complete","完成维修"),
    FEEDBACK("feedback","反馈");

    private String type;
    private String name;


    RepairStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static RepairStatusEnum getTypes(String status) {
        for (RepairStatusEnum whetherValidEnum : RepairStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (RepairStatusEnum whetherValidEnum : RepairStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<RepairStatusEnum> getAllEnum(){
        List<RepairStatusEnum> list= Arrays.asList();
        for (RepairStatusEnum whetherValidEnum : RepairStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<RepairStatusEnum> getEnumTypesBylikeType(String type){
        List<RepairStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}