package weChat.entity;

import lombok.Data;

@Data
public class WeChatEntity {

    private String appid;    // 小程序配置文件---------小程序（或者个人id）
    private String appSecret; //小程序配置文件---------密钥


    private String encryptedData; //包括敏感数据在内的完整用户信息的加密数据
    private String iv;
    private String code;


    private String unionId; //代表同一个微信用户
    private String openId; //代表同一个微信小程序用户的身份
    private String sessionKey;//可以通过code 获取
    private String accessToken;

    private String phoneNumber;
}
