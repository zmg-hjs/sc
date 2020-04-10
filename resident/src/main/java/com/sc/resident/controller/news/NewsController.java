package com.sc.resident.controller.news;

import com.sc.base.dto.news.NewsDto;
import com.sc.base.dto.news.ResidentNewsIndexIntoDto;
import com.sc.base.dto.news.ResidentNewsIndexOutDto;
import com.sc.base.entity.news.NewsEntity;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.news.NewsRepository;
import com.sc.resident.service.news.NewsService;
import mydate.MyDateUtil;
import myspringbean.MyBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/sc/resident/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @RequestMapping(value = "/resident_news_index",method = RequestMethod.POST)
    @ResponseBody
    public Result<List<ResidentNewsIndexOutDto>> findAll(@RequestBody ResidentNewsIndexIntoDto indexIntoDto){
        try {
            return newsService.findAll(indexIntoDto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    @RequestMapping(value = "/resident_news_one_data",method = RequestMethod.POST)
    @ResponseBody
    public Result<NewsDto> residentNewsOneData(@RequestBody NewsDto dto){
        try {
            return newsService.findNewsEntityById(dto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
