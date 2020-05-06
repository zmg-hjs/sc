package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum ComplaintStatusEnum {

    PROCESSING("processing","处理中"),
    PROCESSED("processed","已处理"),
    CANCEL("cancel","取消处理");

    private String type;
    private String name;


    ComplaintStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static ComplaintStatusEnum getTypes(String status) {
        for (ComplaintStatusEnum whetherValidEnum : ComplaintStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (ComplaintStatusEnum whetherValidEnum : ComplaintStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<ComplaintStatusEnum> getAllEnum(){
        List<ComplaintStatusEnum> list= Arrays.asList();
        for (ComplaintStatusEnum whetherValidEnum : ComplaintStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<ComplaintStatusEnum> getEnumTypesBylikeType(String type){
        List<ComplaintStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}