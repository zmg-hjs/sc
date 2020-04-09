package com.sc.resident.service.news;

import com.sc.base.dto.common.BaseIntoDto;
import com.sc.base.dto.news.NewsDto;
import com.sc.base.dto.news.ResidentNewsIndexIntoDto;
import com.sc.base.dto.news.ResidentNewsIndexOutDto;
import com.sc.base.entity.news.NewsEntity;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.news.NewsRepository;
import mydate.MyDateUtil;
import myspringbean.MyBeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vo.Result;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    /**
     * 需要传入 page=1,limit=50
     * @param indexIntoDto
     * @return
     */
    public Result<List<ResidentNewsIndexOutDto>> findAll(ResidentNewsIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(indexIntoDto.getPage()-1, indexIntoDto.getLimit(),sort);
            //条件
            Page<NewsEntity> page = newsRepository.findAll(pageable);
            List<ResidentNewsIndexOutDto> residentNewsIndexOutDtoList = page.getContent().stream().map(e -> {
                ResidentNewsIndexOutDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ResidentNewsIndexOutDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ResidentNewsIndexOutDto>>().setSuccess(residentNewsIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 需传参dto.getId()
     * @param dto
     * @return
     */
    public Result<NewsDto> findNewsEntityById(NewsDto dto){
        try {
            NewsEntity entity = newsRepository.findNewsEntityById(dto.getId());
            if (entity!=null){
                NewsDto newsDto = MyBeanUtils.copyPropertiesAndResTarget(entity, NewsDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(entity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(entity.getUpdateDate()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(entity.getWhetherValid()));
                });
                return new Result().setSuccess(newsDto);
            }else {
                return Result.createSimpleFailResult();
            }
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
