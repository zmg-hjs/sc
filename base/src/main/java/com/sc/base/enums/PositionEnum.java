package com.sc.base.enums;

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
public enum PositionEnum {

    ADMINISTRATOR("administrator","管理员"),
    REPAIRMAN("repairman","维修员工"),
    GENERAL_STAFF("general_staff","普通员工");

    private String type;
    private String name;


    PositionEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static PositionEnum getTypes(String status) {
        for (PositionEnum whetherValidEnum : PositionEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (PositionEnum whetherValidEnum : PositionEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<PositionEnum> getAllEnum(){
        List<PositionEnum> list= Arrays.asList();
        for (PositionEnum whetherValidEnum : PositionEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<PositionEnum> getEnumTypesBylikeType(String type){
        List<PositionEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}