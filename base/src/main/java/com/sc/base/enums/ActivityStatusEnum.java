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
public enum ActivityStatusEnum {

    UNPUBLISHED("unpublished","未发布"),
    ENROLMENT("enrolment","报名进行中"),
    IN_AUDIT("in_audit","人员审核中"),
    VOTING("voting","投票选举中"),
    END("end","活动已结束，查看结果");

    private String type;
    private String name;


    ActivityStatusEnum(String status, String name) {
        this.type = status;
        this.name = name;
    }

    public static ActivityStatusEnum getTypes(String status) {
        for (ActivityStatusEnum whetherValidEnum : ActivityStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum;
            }
        }
        return null;
    }
    public static String getTypesName(String status) {
        for (ActivityStatusEnum whetherValidEnum : ActivityStatusEnum.values()) {
            if (whetherValidEnum.getType().equals(status)) {
                return whetherValidEnum.getName();
            }
        }
        return null;
    }

    public static List<ActivityStatusEnum> getAllEnum(){
        List<ActivityStatusEnum> list= Arrays.asList();
        for (ActivityStatusEnum whetherValidEnum : ActivityStatusEnum.values()) {
            list.add(whetherValidEnum);
        }
        return list;
    }

    public static List<ActivityStatusEnum> getEnumTypesBylikeType(String type){
        List<ActivityStatusEnum> list=  getAllEnum();
        return list.stream().filter(o->o.getType().contains(type)).collect(Collectors.toList());
    }

}