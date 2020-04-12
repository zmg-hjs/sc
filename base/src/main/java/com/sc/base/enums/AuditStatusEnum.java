package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum AuditStatusEnum {

    UNAUDITED("unaudited","未审核"),
    SUCCESS("success","成功"),
    FAIL("fail","失败");

    private String type;
    private String name;


    AuditStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static AuditStatusEnum getTypes(String status) {
        for (AuditStatusEnum whetherValidEnum : AuditStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (AuditStatusEnum whetherValidEnum : AuditStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<AuditStatusEnum> getAllEnum(){
        List<AuditStatusEnum> list= Arrays.asList();
        for (AuditStatusEnum whetherValidEnum : AuditStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<AuditStatusEnum> getEnumTypesBylikeType(String type){
        List<AuditStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}