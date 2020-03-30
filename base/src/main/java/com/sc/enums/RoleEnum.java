package com.sc.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @Author dsj
 * @Create 2019-02-28 10:09
 * @Description 霸王餐订购状态
 **/

/**
 * 暂时未用到
 */
@Getter
public enum RoleEnum {

    RESIDENT("resident","居民"),
    COMMITTEE_MEMBER("committee_member","委员会成员");

    private String type;
    private String name;


    RoleEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static RoleEnum getTypes(String status) {
        for (RoleEnum whetherValidEnum : RoleEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (RoleEnum whetherValidEnum : RoleEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<RoleEnum> getAllEnum(){
        List<RoleEnum> list= Arrays.asList();
        for (RoleEnum whetherValidEnum : RoleEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<RoleEnum> getEnumTypesBylikeType(String type){
        List<RoleEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}