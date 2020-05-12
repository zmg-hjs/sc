package com.sc.manage.controller.complaint;

import com.sc.base.dto.complaint.ComplaintDto;
import com.sc.manage.service.complaint.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/complaint")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    /**
     * 跳转首页
     * @param modelAndView
     * @return
     */
    @RequestMapping(value = "/manage_complaint_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageCarIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("complaint/complaint_index");
        return modelAndView;
    }

    /**
     * 首页数据
     * @param complaintDto
     * @return
     */
    @RequestMapping(value = "/manage_complaint_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageCarIndexData(ComplaintDto complaintDto){
        return complaintService.list(complaintDto);
    }

    /**
     * 跳转详情页面
     * @param modelAndView
     * @param complaintDto
     * @return
     */
    @RequestMapping(value = "/manage_complaint_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_complaint_find_page(ModelAndView modelAndView, ComplaintDto complaintDto){
        modelAndView.setViewName("complaint/complaint_find");
        modelAndView.addObject("complaintDto",complaintService.findComplaintEntityById(complaintDto).getData());
        return modelAndView;
    }

    /**
     * 跳转回复页面
     * @param modelAndView
     * @param complaintDto
     * @return
     */
    @RequestMapping(value = "/manage_complaint_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView manage_complaint_update_page(ModelAndView modelAndView, ComplaintDto complaintDto){
        modelAndView.setViewName("complaint/complaint_update");
        modelAndView.addObject("complaintDto",complaintService.findComplaintEntityById(complaintDto).getData());
        return modelAndView;
    }

    /**
     * 回复
     * @param complaintDto
     * @return
     */
    @RequestMapping(value = "/manage_complaint_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result manage_complaint_update_data(@RequestBody ComplaintDto complaintDto){
        return complaintService.update(complaintDto);
    }

}
