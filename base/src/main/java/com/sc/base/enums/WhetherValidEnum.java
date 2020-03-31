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
public enum WhetherValidEnum {

    All("all","全部"),
    VALID("valid","生效"),
    INVALID("invalid","失效");




    private String type;
    private String name;
    private String peration;

    WhetherValidEnum(String status, String name, String peration) {
        this.type = status;
        this.name = name;
        this.peration=peration;
    }

    WhetherValidEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static WhetherValidEnum getTypes(String status) {
        for (WhetherValidEnum whetherValidEnum : WhetherValidEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (WhetherValidEnum whetherValidEnum : WhetherValidEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<WhetherValidEnum> getAllEnum(){
        List<WhetherValidEnum> list= Arrays.asList();
        for (WhetherValidEnum whetherValidEnum : WhetherValidEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<WhetherValidEnum> getEnumTypesBylikeType(String type){
        List<WhetherValidEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}