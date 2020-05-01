package com.sc.resident.service.commodity;

import com.sc.base.dto.commodity.CommodityDto;
import com.sc.base.dto.commodity.CommodityOrderDto;
import com.sc.base.entity.commodity.CommodityEntity;
import com.sc.base.entity.commodity.CommodityOrderEntity;
import com.sc.base.enums.CommodityStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.commodity.CommodityOrderRepository;
import com.sc.base.repository.commodity.CommodityRepository;
import myString.MyStringUtils;
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
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommodityService {

    @Autowired
    private CommodityRepository commodityRepository;
    @Autowired
    private CommodityOrderRepository commodityOrderRepository;

    /**
     * 发布商品
     * @param commodityDto
     * @return
     */
    public Result add(CommodityDto commodityDto){
        try {
            Date date = new Date();
            CommodityEntity commodityEntity = MyBeanUtils.copyPropertiesAndResTarget(commodityDto, CommodityEntity::new, e -> {
                String commodityId = MyStringUtils.getIdDateStr("");
                e.setId(commodityId);
                e.setCreateDate(date);
                e.setUpdateDate(date);
                e.setWhetherValid(WhetherValidEnum.VALID.getType());
                //转换价格
                e.setCommodityPrice(new BigDecimal(commodityDto.getCommodityPrice().toString()));
                e.setCommodityStatus(CommodityStatusEnum.UNDER_REVIEW.getType());
                e.setCommodityReviewStatus(CommodityStatusEnum.UNDER_REVIEW.getType());
            });
            commodityRepository.save(commodityEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询商品列表
     * @return
     */
    public Result<List<CommodityDto>> findCommodityEntityList(CommodityDto commodityDto){
        try {
            //多条件排序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            Page<CommodityEntity> page = commodityRepository.findAll(new Specification<CommodityEntity>() {
                @Override
                public Predicate toPredicate(Root<CommodityEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(commodityDto.getCommodityName())){
                        predicateList.add(criteriaBuilder.like(root.get("commodityName"),"%"+commodityDto.getCommodityName()+"%"));
                    }
                    if (StringUtils.isNotBlank(commodityDto.getCommodityClassification())){
                        predicateList.add(criteriaBuilder.equal(root.get("commodityClassification"),commodityDto.getCommodityClassification()));
                    }
                    if (StringUtils.isNotBlank(commodityDto.getBusinessId())){
                        predicateList.add(criteriaBuilder.equal(root.get("businessId"),commodityDto.getBusinessId()));
                    }
                    if (StringUtils.isNotBlank(commodityDto.getCommodityStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("commodityStatus"),commodityDto.getCommodityStatus()));
                    }
                    predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<CommodityDto> commodityDtoList = page.getContent().stream().map(e -> {
                CommodityDto dto = MyBeanUtils.copyPropertiesAndResTarget(e, CommodityDto::new);
                dto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                dto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                dto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                dto.setCommodityStatusStr(CommodityStatusEnum.getTypesName(e.getCommodityStatus()));
                return dto;
            }).collect(Collectors.toList());
            return new Result<List<CommodityDto>>().setSuccess(commodityDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查看商品详情
     * @param commodityDto
     * @return
     */
    public Result findCommodityEntityById(CommodityDto commodityDto){
        try {
            CommodityEntity commodityEntity = commodityRepository.findCommodityEntityById(commodityDto.getId());
            if (StringUtils.isNotBlank(commodityEntity.getId())){
                CommodityDto commodityDto1 = MyBeanUtils.copyPropertiesAndResTarget(commodityEntity, CommodityDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(commodityEntity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(commodityEntity.getUpdateDate()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(commodityEntity.getWhetherValid()));
                    d.setCommodityStatusStr(CommodityStatusEnum.getTypesName(commodityEntity.getCommodityStatus()));
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
            CommodityOrderEntity commodityOrderEntity = commodityOrderRepository.findCommodityOrderEntityByCommodityId(commodityOrderDto.getCommodityId());
            if (StringUtils.isNotBlank(commodityOrderEntity.getId())){
                CommodityOrderDto commodityOrderDto1 = MyBeanUtils.copyPropertiesAndResTarget(commodityOrderEntity, CommodityOrderDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(commodityOrderEntity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(commodityOrderEntity.getUpdateDate()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(commodityOrderEntity.getWhetherValid()));
                    d.setCommodityStatusStr(CommodityStatusEnum.getTypesName(commodityOrderEntity.getCommodityStatus()));
                });
                return new Result().setSuccess(commodityOrderDto1);
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 购买商品
     * 1.修改商品状态
     * 2.添加订单表
     * @param commodityOrderDto
     * @return
     */
    public Result buy(CommodityOrderDto commodityOrderDto){
        try {
            Date date = new Date();
            String commodityOrderId = MyStringUtils.getIdDateStr("");
            //1.修改商品表
            CommodityEntity commodityEntity = commodityRepository.findCommodityEntityById(commodityOrderDto.getCommodityId());
            commodityEntity.setCommodityStatus(CommodityStatusEnum.IN_TRANSACTION.getType());
            commodityEntity.setUpdateDate(date);
            commodityEntity.setCommodityOrderId(commodityOrderId);
            commodityRepository.save(commodityEntity);
            //2.添加订单表
            CommodityOrderEntity commodityOrderEntity = MyBeanUtils.copyPropertiesAndResTarget(commodityOrderDto, CommodityOrderEntity::new, e -> {
                e.setId(commodityOrderId);
                e.setCreateDate(date);
                e.setUpdateDate(date);
                e.setWhetherValid(WhetherValidEnum.VALID.getType());
                e.setCommodityStatus(commodityEntity.getCommodityStatus());
            });
            commodityOrderRepository.save(commodityOrderEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询订单列表
     * @return
     */
    public Result<List<CommodityOrderDto>> findCommodityOrderEntityList(CommodityOrderDto commodityOrderDto){
        try {
            //多条件排序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            Page<CommodityOrderEntity> page = commodityOrderRepository.findAll(new Specification<CommodityOrderEntity>() {
                @Override
                public Predicate toPredicate(Root<CommodityOrderEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(commodityOrderDto.getBuyerId())){
                        predicateList.add(criteriaBuilder.equal(root.get("buyerId"),commodityOrderDto.getBuyerId()));
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
     * 卖家取消发布
     * 1.修改商品状态
     * 2.修改订单表
     * @param commodityDto
     * @return
     */
    public Result unpublish(CommodityDto commodityDto){
        try {
            Date date = new Date();
            //1.修改商品表
            CommodityEntity commodityEntity = commodityRepository.findCommodityEntityById(commodityDto.getId());
            commodityEntity.setCommodityStatus(CommodityStatusEnum.UNPUBLISH.getType());
            commodityEntity.setUpdateDate(date);
            commodityRepository.save(commodityEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 卖家取消交易
     * 1.修改商品状态
     * 2.修改订单表
     * @param commodityDto
     * @return
     */
    public Result cancelTransaction(CommodityDto commodityDto){
        try {
            Date date = new Date();
            //1.修改商品表
            CommodityEntity commodityEntity = commodityRepository.findCommodityEntityById(commodityDto.getId());
            commodityEntity.setCommodityStatus(CommodityStatusEnum.CANCEL_TRANSACTION.getType());
            commodityEntity.setUpdateDate(date);
            commodityEntity.setCommodityOrderId(null);
            commodityRepository.save(commodityEntity);
            //2.修改订单表
            CommodityOrderEntity commodityOrderEntity = commodityOrderRepository.findCommodityOrderEntityById(commodityDto.getCommodityOrderId());
            commodityOrderEntity.setCommodityStatus(CommodityStatusEnum.CANCEL_TRANSACTION.getType());
            commodityOrderEntity.setUpdateDate(date);
            commodityOrderRepository.save(commodityOrderEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 买家取消交易
     * 1.修改商品状态
     * 2.修改订单表
     * @param commodityOrderDto
     * @return
     */
    public Result buyerCancelTransaction(CommodityOrderDto commodityOrderDto){
        try {
            Date date = new Date();
            //1.修改商品表
            CommodityEntity commodityEntity = commodityRepository.findCommodityEntityById(commodityOrderDto.getCommodityId());
            commodityEntity.setCommodityStatus(CommodityStatusEnum.IN_TRANSACTION.getType());
            commodityEntity.setUpdateDate(date);
            commodityEntity.setCommodityOrderId(null);
            commodityRepository.save(commodityEntity);
            //2.修改订单表
            CommodityOrderEntity commodityOrderEntity = commodityOrderRepository.findCommodityOrderEntityById(commodityOrderDto.getId());
            commodityOrderEntity.setCommodityStatus(CommodityStatusEnum.CANCEL_TRANSACTION.getType());
            commodityOrderEntity.setUpdateDate(date);
            commodityOrderRepository.save(commodityOrderEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


}
