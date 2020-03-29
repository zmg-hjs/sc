package weChat.util;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import vo.Result;
import weChat.entity.WeChatEntity;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.AlgorithmParameters;
import java.security.Security;

/*Spring RestTemplate 之exchange方法
https://www.cnblogs.com/jnba/p/10522608.html*/

public class GetWeChatInfoUtil {

    static {
        //BouncyCastle是一个开源的加解密解决方案，主页在http://www.bouncycastle.org/
        Security.addProvider(new BouncyCastleProvider());
    }
    private static String encodingFormat = "utf-8";

    public static Result<String> getOpenIdAndSessionKey(WeChatEntity weChatEntity){
        try {
            String url = "https://api.weixin.qq.com/sns/jscode2session?appid=APPID" +
                    "&secret=APPSECRET" + "&js_code=CODE&grant_type=authorization_code";
            url = url.replace("APPID", weChatEntity.getAppid());
            url = url.replace("APPSECRET", weChatEntity.getAppSecret());
            url = url.replace("CODE", weChatEntity.getCode());
            String doGet = HttpClientUtil.doGet(url, null);
            return new Result().setSuccess(doGet);
        }catch (Exception e){
            return Result.createSystemErrorResult().setCustomMessage(e.getMessage());
        }
    }
    public static Result<String> getUserInfo(WeChatEntity weChatEntity){
        try {
            Result<String> result1 = getOpenIdAndSessionKey(weChatEntity);
            if (!result1.isSuccess()) return result1;
            JSONObject jsonObject = JSONObject.parseObject(result1.getData());
            weChatEntity.setOpenId((String) jsonObject.get("openid"));
            weChatEntity.setSessionKey((String) jsonObject.get("session_key"));

            //被加密的数据
            byte[] dataByte = Base64.decodeBase64(weChatEntity.getEncryptedData());
            //加密秘钥
            byte[] keyByte = Base64.decodeBase64(weChatEntity.getSessionKey());
            //偏移量
            byte[] ivByte = Base64.decodeBase64(weChatEntity.getIv());
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
            AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
            parameters.init(new IvParameterSpec(ivByte));
            cipher.init(Cipher.DECRYPT_MODE, spec, parameters);// 初始化
            byte[] resultByte = cipher.doFinal(dataByte);
            if (null != resultByte && resultByte.length > 0) {
                String string = new String(resultByte, encodingFormat);
                Result<String> result = new Result<String>().setSuccess(string);
                return result;
            }
            return Result.createSimpleFailResult();
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }


}
