package com.sc.base.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum CommodityStatusEnum {

    UNPUBLISH("unpublish","取消发布"),
    UNDER_REVIEW("under_review","审核中"),
    AUDIT_SUCCESSFUL("audit_successful","审核成功"),
    AUDIT_FAILED("audit_failed","审核失败"),
    IN_TRANSACTION("in_transaction","交易中"),
    CANCEL_TRANSACTION("cancel_transaction","取消交易"),
    TRANSACTION_SUCCESSFUL("transaction_successful","交易成功"),
    TRANSACTION_FAILED("transaction_failed","交易失败"),
    FEEDBACK("feedback ","反馈");

    private String type;
    private String name;


    CommodityStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static CommodityStatusEnum getTypes(String status) {
        for (CommodityStatusEnum whetherValidEnum : CommodityStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (CommodityStatusEnum whetherValidEnum : CommodityStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<CommodityStatusEnum> getAllEnum(){
        List<CommodityStatusEnum> list= Arrays.asList();
        for (CommodityStatusEnum whetherValidEnum : CommodityStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<CommodityStatusEnum> getEnumTypesBylikeType(String type){
        List<CommodityStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}