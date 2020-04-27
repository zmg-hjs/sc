package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum RepairOrderStatusEnum {

    RECEIVE_DISPATCH("receive_repair","接受"),
    UNDER_MAINTENANCE("under_repair","维修中"),
    REPAIR_SUCCESSFUL("repair_complete","完成维修"),
    CANCEL("cancel","取消维修");

    private String type;
    private String name;


    RepairOrderStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static RepairOrderStatusEnum getTypes(String status) {
        for (RepairOrderStatusEnum whetherValidEnum : RepairOrderStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (RepairOrderStatusEnum whetherValidEnum : RepairOrderStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<RepairOrderStatusEnum> getAllEnum(){
        List<RepairOrderStatusEnum> list= Arrays.asList();
        for (RepairOrderStatusEnum whetherValidEnum : RepairOrderStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<RepairOrderStatusEnum> getEnumTypesBylikeType(String type){
        List<RepairOrderStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}