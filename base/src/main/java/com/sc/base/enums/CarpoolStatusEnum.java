package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum CarpoolStatusEnum {

    IN_PROGRESS("in_progress","进行中"),
    COMPLETE("complete","完成"),
    CANCEL("cancel","取消");

    private String type;
    private String name;


    CarpoolStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static CarpoolStatusEnum getTypes(String status) {
        for (CarpoolStatusEnum whetherValidEnum : CarpoolStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (CarpoolStatusEnum whetherValidEnum : CarpoolStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<CarpoolStatusEnum> getAllEnum(){
        List<CarpoolStatusEnum> list= Arrays.asList();
        for (CarpoolStatusEnum whetherValidEnum : CarpoolStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<CarpoolStatusEnum> getEnumTypesBylikeType(String type){
        List<CarpoolStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}