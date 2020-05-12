package com.sc.manage.controller.repair;

import com.sc.base.dto.work.WorkDto;
import com.sc.manage.service.repair.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/repair")
public class WorkController {
    
    @Autowired
    private WorkService workService;

    @RequestMapping(value = "/manage_work_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageNewsIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("repair/work_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_work_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageNewsIndexData(WorkDto workDto){
        return workService.list(workDto);
    }

    @RequestMapping(value = "/manage_work_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageCarFindPage(ModelAndView modelAndView, WorkDto workDto){
        modelAndView.setViewName("repair/work_find");
        modelAndView.addObject("workDto",workService.findOne(workDto).getData());
        return modelAndView;
    }


}
