package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum TransactionModeStatusEnum {

    CASH_ON_DELIVERY("cash_on_delivery ","货到付款");

    private String type;
    private String name;


    TransactionModeStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static TransactionModeStatusEnum getTypes(String status) {
        for (TransactionModeStatusEnum whetherValidEnum : TransactionModeStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (TransactionModeStatusEnum whetherValidEnum : TransactionModeStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<TransactionModeStatusEnum> getAllEnum(){
        List<TransactionModeStatusEnum> list= Arrays.asList();
        for (TransactionModeStatusEnum whetherValidEnum : TransactionModeStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<TransactionModeStatusEnum> getEnumTypesBylikeType(String type){
        List<TransactionModeStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}