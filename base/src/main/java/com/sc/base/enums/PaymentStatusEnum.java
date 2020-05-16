package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum PaymentStatusEnum {

    PAID("paid","已缴费"),
    UNPAID("unpaid","未缴费");

    private String type;
    private String name;


    PaymentStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static PaymentStatusEnum getTypes(String status) {
        for (PaymentStatusEnum whetherValidEnum : PaymentStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (PaymentStatusEnum whetherValidEnum : PaymentStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<PaymentStatusEnum> getAllEnum(){
        List<PaymentStatusEnum> list= Arrays.asList();
        for (PaymentStatusEnum whetherValidEnum : PaymentStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<PaymentStatusEnum> getEnumTypesBylikeType(String type){
        List<PaymentStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}