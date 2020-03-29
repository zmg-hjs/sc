package com.sc.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultEnum {
    DEFAULT(0, "Now you's code is 0,this is not normal"),
    SUCCESS(1, "Already success"),
    FAIL(-1, "Sorry,You fail"),
    FAILMESSAGE_SYSTEM_ERROR(-2, "I'm sorry,System error");

    public int code;
    private String message;
}
