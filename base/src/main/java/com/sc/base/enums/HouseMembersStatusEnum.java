package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum HouseMembersStatusEnum {

    HOMEOWNER("homeowner","房主"),
    RESIDENTS("resident","居住成员");

    private String type;
    private String name;


    HouseMembersStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static HouseMembersStatusEnum getTypes(String status) {
        for (HouseMembersStatusEnum whetherValidEnum : HouseMembersStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (HouseMembersStatusEnum whetherValidEnum : HouseMembersStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<HouseMembersStatusEnum> getAllEnum(){
        List<HouseMembersStatusEnum> list= Arrays.asList();
        for (HouseMembersStatusEnum whetherValidEnum : HouseMembersStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<HouseMembersStatusEnum> getEnumTypesBylikeType(String type){
        List<HouseMembersStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}