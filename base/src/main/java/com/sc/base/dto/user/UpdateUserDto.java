package com.sc.base.dto.user;

import lombok.Data;

/**
 * Package: com.sc.base.dto.user
 * <p>
 * Description： TODO
 * <p>
 * Author: hjscode
 * <p>
 * Date: Created in 2020/4/8 18:22
 */
@Data
public class UpdateUserDto {
    private String openId; //用户ID
    private String change; //修改的属性
    private String value; //属性

}
