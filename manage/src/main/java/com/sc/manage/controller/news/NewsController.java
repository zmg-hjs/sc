package com.sc.manage.controller.news;

import com.sc.base.dto.news.ManageNewsIndexIntoDto;
import com.sc.base.dto.news.NewsDto;
import com.sc.base.repository.user.StaffUserRepository;
import com.sc.manage.service.news.NewsService;
import com.sc.manage.service.user.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/news")
public class NewsController {

    @Autowired
    private NewsService newsService;
    @Autowired
    private StaffService staffService;

    @RequestMapping(value = "/manage_news_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageNewsIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("news/news_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_news_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageNewsIndexData(ManageNewsIndexIntoDto manageNewsIndexIntoDto){
        return newsService.ManageNewsIndex(manageNewsIndexIntoDto);
    }

    @RequestMapping(value = "/manage_news_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageNewsFindPage(ModelAndView modelAndView, NewsDto newsDto){
        modelAndView.setViewName("news/news_find");
        modelAndView.addObject("newsDto",newsService.findNewsEntityById(newsDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_news_examine_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageNewsExaminePage(ModelAndView modelAndView,NewsDto newsDto){
        modelAndView.setViewName("news/news_examine");
        modelAndView.addObject("newsDto",newsService.findNewsEntityById(newsDto).getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_news_examine_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageNewsExamineData(@RequestBody NewsDto newsDto){
        return newsService.updateNewsEntityWhetherValid(newsDto);
    }

    @RequestMapping(value = "/manage_news_update_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageNewsUpdatePage(ModelAndView modelAndView,NewsDto newsDto){
        modelAndView.setViewName("news/news_update");
        modelAndView.addObject("newsDto",newsService.findNewsEntityById(newsDto).getData());
        modelAndView.addObject("staffUserDtoList",staffService.findStaffUserEntitiesByPosition().getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_news_update_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageNewsUpdateData(@RequestBody NewsDto newsDto){
        return newsService.updateNewsEntityById(newsDto);
    }

    @RequestMapping(value = "/manage_news_add_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageNewsAddPage(ModelAndView modelAndView){
        modelAndView.setViewName("news/news_add");
        modelAndView.addObject("staffUserDtoList",staffService.findStaffUserEntitiesByPosition().getData());
        return modelAndView;
    }

    @RequestMapping(value = "/manage_news_add_data",method = RequestMethod.POST)
    @ResponseBody
    public Result ManageNewsAddData(@RequestBody NewsDto newsDto){
        return newsService.addNewsEntity(newsDto);
    }

}
