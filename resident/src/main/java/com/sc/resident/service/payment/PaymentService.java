package com.sc.resident.service.payment;

import com.sc.base.dto.payment.PaymentDto;
import com.sc.base.entity.payment.PaymentEntity;
import com.sc.base.enums.PaymentStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.payment.PaymentRepository;
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
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    /**
     * 查询缴费
     * @param paymentDto
     * @return
     */
    public Result<List<PaymentDto>> findAll(PaymentDto paymentDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            Page<PaymentEntity> page = paymentRepository.findAll(new Specification<PaymentEntity>() {
                @Override
                public Predicate toPredicate(Root<PaymentEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(paymentDto.getResidentUserId())){
                        predicateList.add(criteriaBuilder.equal(root.get("residentUserId"),paymentDto.getResidentUserId()));
                    }
                    if (StringUtils.isNotBlank(paymentDto.getPaymentStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("paymentStatus"),paymentDto.getPaymentStatus()));
                    }
                    if (StringUtils.isNotBlank(paymentDto.getWhetherValid())){
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),paymentDto.getWhetherValid()));
                    }else {
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<PaymentDto> paymentDtoList = page.getContent().stream().map(e -> {
                PaymentDto dto = MyBeanUtils.copyPropertiesAndResTarget(e, PaymentDto::new);
                dto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                dto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                dto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                dto.setPaymentStatusStr(PaymentStatusEnum.getTypesName(e.getPaymentStatus()));
                dto.setPropertyCost(e.getPropertyCost().doubleValue());
                return dto;
            }).collect(Collectors.toList());
            return new Result<List<PaymentDto>>().setSuccess(paymentDtoList).setCount(page.getTotalElements());

        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    public Result<PaymentDto> findOne(PaymentDto paymentDto){
        try {
            PaymentEntity e = paymentRepository.findPaymentEntityById(paymentDto.getId());
            PaymentDto dto = MyBeanUtils.copyPropertiesAndResTarget(e, PaymentDto::new);
            dto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
            dto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
            dto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
            dto.setPaymentStatusStr(PaymentStatusEnum.getTypesName(e.getPaymentStatus()));
            dto.setPropertyCost(e.getPropertyCost().doubleValue());
            return new Result<PaymentDto>().setSuccess(dto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


    public Result update(PaymentDto paymentDto){
        try {
            PaymentEntity paymentEntity = paymentRepository.findPaymentEntityById(paymentDto.getId());
            paymentEntity.setUpdateDate(new Date());
            paymentEntity.setPaymentStatus(PaymentStatusEnum.PAID.getType());
            paymentRepository.save(paymentEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
