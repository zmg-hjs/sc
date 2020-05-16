package com.sc.resident.controller.payment;

import com.sc.base.dto.payment.PaymentDto;
import com.sc.resident.service.payment.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

import java.util.List;

@Controller
@RequestMapping("/sc/resident/news")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    /**
     * 我的缴费(未缴费、已缴费)
     * residentUserId、paymentStatus{
     *     PAID("paid","已缴费"),
     *     UNPAID("unpaid","未缴费");
     * }
     * @param paymentDto
     * @return
     */
    @RequestMapping(value = "/resident_payment_list",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<PaymentDto>> resident_payment_list(@RequestBody PaymentDto paymentDto){
        try {
            return paymentService.findAll(paymentDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 我的缴费详情
     * 传参：id
     * @param paymentDto
     * @return
     */
    @RequestMapping(value = "/resident_payment_one",method = RequestMethod.POST)
    @ResponseBody
    public Result<PaymentDto> resident_payment_one(@RequestBody PaymentDto paymentDto){
        try {
            return paymentService.findOne(paymentDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 缴费
     * 传参：id
     * @param paymentDto
     * @return
     */
    @RequestMapping(value = "/resident_payment_update",method = RequestMethod.POST)
    @ResponseBody
    public Result resident_payment_update(@RequestBody PaymentDto paymentDto){
        try {
            return paymentService.update(paymentDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
