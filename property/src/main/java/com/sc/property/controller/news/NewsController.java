package com.sc.property.controller.news;

import com.sc.base.dto.news.NewsDto;
import com.sc.base.dto.news.ResidentNewsIndexIntoDto;
import com.sc.base.dto.news.ResidentNewsIndexOutDto;
import com.sc.property.service.news.NewsService;
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
public class NewsController {

    @Autowired
    private NewsService newsService;

    @RequestMapping(value = "/resident_news_index",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<ResidentNewsIndexOutDto>> findAll(ResidentNewsIndexIntoDto indexIntoDto){
        try {
            return newsService.findAll(indexIntoDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    @RequestMapping(value = "/resident_news_one_data",method = RequestMethod.GET)
    @ResponseBody
    public Result<NewsDto> residentNewsOneData(@RequestBody NewsDto dto){
        try {
            return newsService.findNewsEntityById(dto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    @RequestMapping(value = "/resident_news_add_data",method = RequestMethod.POST)
    @ResponseBody
    public Result<NewsDto> residentNewsAddData(@RequestBody NewsDto dto){
        try {
            return newsService.addNewsEntity(dto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


}
