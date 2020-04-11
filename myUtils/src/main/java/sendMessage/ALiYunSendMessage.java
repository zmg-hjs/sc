package sendMessage;


import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsRequest;
import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import vo.Result;

import java.util.Objects;

public class ALiYunSendMessage {
    //产品名称:云通信短信API产品,开发者无需替换
    static final String product = "Dysmsapi";
    //产品域名,开发者无需替换
    static final String domain = "dysmsapi.aliyuncs.com";

    static final String accessKeyId = "";  // TODO 修改成自己的accessKeyId
    static final String accessKeySecret = "";   // TODO 修改成自己的accessKeySecret
    static final String signName = "在线商城";

        static Result sendMassage(String telephone, String templateCode, String contect)  {
        Objects.requireNonNull(telephone);
        Objects.requireNonNull(templateCode);
        //初始化acsClient,暂不支持region化
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
        DefaultProfile.addEndpoint("cn-hangzhou", product, domain);
        IAcsClient acsClient = new DefaultAcsClient(profile);
        //组装请求对象-具体描述见控制台-文档部分内容
        SendSmsRequest request = new SendSmsRequest();
        request.setTemplateParam("{\"code\":\"" + contect + "\"}");
        request.setPhoneNumbers(telephone);
        request.setSignName(signName);    // TODO 修改成自己的 自己申请的签名
        request.setTemplateCode(templateCode);    // TODO 修改成自己的 模板管理中模板CODE
        try{
            SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);
            if (sendSmsResponse.getCode() != null && sendSmsResponse.getCode().equals(ALiYunSendMessageEnum.SUCCESS.getName())) {
                return Result.createSimpleSuccessResult();
            }else {
                return new Result().setFail("error code " + sendSmsResponse.getCode() + " error message: " + sendSmsResponse.getMessage());
            }
        }catch (ClientException e){
            return Result.createSystemErrorResult();
        }
    }

}
