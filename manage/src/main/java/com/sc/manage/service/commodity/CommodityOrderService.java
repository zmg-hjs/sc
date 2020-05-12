package com.sc.manage.service.commodity;

import com.sc.base.dto.commodity.CommodityDto;
import com.sc.base.dto.commodity.CommodityOrderDto;
import com.sc.base.entity.commodity.CommodityEntity;
import com.sc.base.entity.commodity.CommodityOrderEntity;
import com.sc.base.enums.ClassificationStatusEnum;
import com.sc.base.enums.CommodityStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.commodity.CommodityOrderRepository;
import com.sc.base.repository.commodity.CommodityRepository;
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
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommodityOrderService {

    @Autowired
    private CommodityOrderRepository commodityOrderRepository;
    @Autowired
    private CommodityRepository commodityRepository;


    /**
     * 查询订单列表
     * @return
     */
    public Result<List<CommodityOrderDto>> findCommodityOrderEntityList(CommodityOrderDto commodityOrderDto){
        try {
            //多条件排序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(commodityOrderDto.getPage()-1, commodityOrderDto.getLimit());
            //条件
            Page<CommodityOrderEntity> page = commodityOrderRepository.findAll(new Specification<CommodityOrderEntity>() {
                @Override
                public Predicate toPredicate(Root<CommodityOrderEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(commodityOrderDto.getCommodityName())){
                        predicateList.add(criteriaBuilder.like(root.get("commodityName"),"%"+commodityOrderDto.getCommodityName()+"%"));
                    }
                    if (StringUtils.isNotBlank(commodityOrderDto.getBuyerActualName())){
                        predicateList.add(criteriaBuilder.like(root.get("buyerActualName"),"%"+commodityOrderDto.getBuyerActualName()+"%"));
                    }
                    if (StringUtils.isNotBlank(commodityOrderDto.getCommodityStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("commodityStatus"),commodityOrderDto.getCommodityStatus()));
                    }
                    predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<CommodityOrderDto> commodityDtoList = page.getContent().stream().map(e -> {
                CommodityOrderDto dto = MyBeanUtils.copyPropertiesAndResTarget(e, CommodityOrderDto::new);
                dto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                dto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                dto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                dto.setCommodityStatusStr(CommodityStatusEnum.getTypesName(e.getCommodityStatus()));
                return dto;
            }).collect(Collectors.toList());
            return new Result<List<CommodityOrderDto>>().setSuccess(commodityDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


    /**
     * 查看商品详情
     * @param commodityOrderDto
     * @return
     */
    public Result findCommodityEntityById(CommodityOrderDto commodityOrderDto){
        try {
            CommodityEntity commodityEntity = commodityRepository.findCommodityEntityById(commodityOrderDto.getCommodityId());
            if (StringUtils.isNotBlank(commodityEntity.getId())){
                CommodityDto commodityDto1 = MyBeanUtils.copyPropertiesAndResTarget(commodityEntity, CommodityDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(commodityEntity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(commodityEntity.getUpdateDate()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(commodityEntity.getWhetherValid()));
                    d.setCommodityStatusStr(CommodityStatusEnum.getTypesName(commodityEntity.getCommodityStatus()));
                    d.setCommodityPrice(commodityEntity.getCommodityPrice().doubleValue());
                    d.setCommodityClassificationStr(ClassificationStatusEnum.getTypesName(commodityEntity.getCommodityClassification()));
                    if (StringUtils.isNotBlank(commodityEntity.getCommodityPictureUrl())){
                        d.setCommodityPictureUrlList(Arrays.asList(commodityEntity.getCommodityPictureUrl().split(",")));
                    }
                });
                return new Result().setSuccess(commodityDto1);
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查看订单详情
     * @param commodityOrderDto
     * @return
     */
    public Result findCommodityOrderEntityById(CommodityOrderDto commodityOrderDto){
        try {
            CommodityOrderEntity commodityOrderEntity = commodityOrderRepository.findCommodityOrderEntityById(commodityOrderDto.getId());
            if (StringUtils.isNotBlank(commodityOrderEntity.getId())){
                CommodityOrderDto commodityOrderDto1 = MyBeanUtils.copyPropertiesAndResTarget(commodityOrderEntity, CommodityOrderDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(commodityOrderEntity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(commodityOrderEntity.getUpdateDate()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(commodityOrderEntity.getWhetherValid()));
                    d.setCommodityStatusStr(CommodityStatusEnum.getTypesName(commodityOrderEntity.getCommodityStatus()));
                    if (StringUtils.isNotBlank(commodityOrderEntity.getCommodityPictureUrl())){
                        d.setCommodityPictureUrlList(Arrays.asList(commodityOrderEntity.getCommodityPictureUrl().split(",")));
                    }
                });
                return new Result().setSuccess(commodityOrderDto1);
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
