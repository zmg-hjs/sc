package com.sc.manage.controller.payment;

import com.sc.base.dto.payment.PaymentDto;
import com.sc.base.dto.user.ManageResidentUserIndexIntoDto;
import com.sc.base.dto.user.ResidentUserDto;
import com.sc.base.enums.HouseMembersStatusEnum;
import com.sc.manage.service.payment.PaymentService;
import com.sc.manage.service.user.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private ResidentService residentService;

    @RequestMapping(value = "/manage_payment_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_payment_index_page(ModelAndView modelAndView){
        modelAndView.setViewName("payment/payment_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_payment_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result manage_payment_index_data(PaymentDto paymentDto){
        return paymentService.list(paymentDto);
    }

    @RequestMapping(value = "/manage_payment_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_payment_find_page(ModelAndView modelAndView, PaymentDto paymentDto){
        modelAndView.setViewName("payment/payment_find");
        modelAndView.addObject("paymentDto",paymentService.findOne(paymentDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_payment_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_payment_update_page(ModelAndView modelAndView,PaymentDto paymentDto){
        modelAndView.setViewName("payment/payment_update");
        modelAndView.addObject("paymentDto",paymentService.findOne(paymentDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_payment_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manage_payment_update_data(@RequestBody PaymentDto paymentDto){
        return paymentService.update1(paymentDto);
    }

    @RequestMapping(value = "/manage_payment_send_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_payment_send_page(ModelAndView modelAndView,PaymentDto paymentDto){
        modelAndView.setViewName("payment/payment_send");
        modelAndView.addObject("paymentDto",paymentService.findOne(paymentDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_payment_send_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manage_payment_send_data(@RequestBody PaymentDto paymentDto){
        return paymentService.update2(paymentDto);
    }

    @RequestMapping(value = "/manage_payment_examine_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_payment_examine_page(ModelAndView modelAndView,PaymentDto paymentDto){
        modelAndView.setViewName("payment/payment_examine");
        modelAndView.addObject("paymentDto",paymentService.findOne(paymentDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_payment_examine_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manage_payment_examine_data(@RequestBody PaymentDto paymentDto){
        return paymentService.examine(paymentDto);
    }


    @RequestMapping(value = "/manage_payment_add_list_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_payment_add_list_page(ModelAndView modelAndView){
        modelAndView.setViewName("payment/payment_add");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_payment_add_list_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manage_payment_add_list_data(@RequestBody PaymentDto paymentDto){
        return paymentService.addList(paymentDto);
    }

    ////////////////////////////////////////////////////////////
    @RequestMapping(value = "/manage_resident_user_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_resident_user_index_page(ModelAndView modelAndView){
        modelAndView.setViewName("payment/homeowner_index");
        return modelAndView;
    }

    @RequestMapping(value = "/manage_resident_user_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result manage_resident_user_index_data(ManageResidentUserIndexIntoDto manageResidentUserIndexIntoDto){
        manageResidentUserIndexIntoDto.setHouseMembers(HouseMembersStatusEnum.HOMEOWNER.getType());
        return residentService.ManageResidentUserIndex(manageResidentUserIndexIntoDto);
    }

    @RequestMapping(value = "/manage_payment_add_one_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_payment_add_one_page(ModelAndView modelAndView, ResidentUserDto residentUserDto){
        modelAndView.setViewName("payment/payment_add_one");
        modelAndView.addObject("residentUserDto",residentService.findResidentUserById(residentUserDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_payment_add_one_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manage_payment_add_one_data(@RequestBody PaymentDto paymentDto){
        return paymentService.addOne(paymentDto);
    }

}
