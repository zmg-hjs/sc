package com.sc.resident.controller.upload;

import myJson.MyJsonUtil;
import mydate.MyDateUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import vo.Result;
import vsftpd.FtpUtil;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

@Controller
@RequestMapping("/sc/resident/upload")
public class uploadController {

    @Value("${vsftpd.username}")
    private String username;
    @Value("${vsftpd.password}")
    private String password;
    @Value("${vsftpd.ip}")
    private String ip;
    @Value("${vsftpd.port}")
    private Integer port;
    @Value("${vsftpd.baseUrl}")
    private String baseUrl;
    @Value("${picUrl}")
    private String picUrl;


    @RequestMapping(value = "/images",method = RequestMethod.POST)
    @ResponseBody
    public Result up(@RequestParam(value = "file",required = false)MultipartFile myfile) {
        try {
            //得到原文件名
            String originalFilename = myfile.getOriginalFilename();
            //生成新文件名（使用工具类，使用uuid也行）
            String newName=UUID.randomUUID().toString();
            newName=newName+originalFilename.substring(originalFilename.lastIndexOf("."));
            //图片上传
            String imagePath=MyDateUtil.date2String(new Date(),"/yyyy/MM/dd");
            boolean flag= FtpUtil.uploadFile(ip, port, username, password, baseUrl,imagePath,newName, myfile.getInputStream());
            if(!flag){
                return null;
//                return Result.createSimpleFailResult();
            }
//            HashMap<String, Object> map1 = new HashMap<>();
//            map1.put("code",0);
//            map1.put("msg","上传图片成功");
//            map1.put("data",picUrl+imagePath+"/"+newName);
//
//            return MyJsonUtil.toJson(map1);
            return new Result().setSuccess(picUrl+imagePath+"/"+newName);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
//            return Result.createSystemErrorResult();
        }
    }
}
