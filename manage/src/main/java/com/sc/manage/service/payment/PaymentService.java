package com.sc.manage.service.payment;

import com.sc.base.dto.payment.PaymentDto;
import com.sc.base.entity.payment.PaymentEntity;
import com.sc.base.entity.user.ResidentUserEntity;
import com.sc.base.enums.HouseMembersStatusEnum;
import com.sc.base.enums.PaymentStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.payment.PaymentRepository;
import com.sc.base.repository.user.ResidentUserRepository;
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
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private ResidentUserRepository residentUserRepository;

    /**
     * 缴费信息列表
     * @param paymentDto
     * @return
     */
    public Result<List<PaymentDto>> list(PaymentDto paymentDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(paymentDto.getPage()-1, paymentDto.getLimit(),sort);
            //条件
            Page<PaymentEntity> page = paymentRepository.findAll(new Specification<PaymentEntity>() {
                @Override
                public Predicate toPredicate(Root<PaymentEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(paymentDto.getPaymentStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("paymentStatus"),paymentDto.getPaymentStatus()));
                    }
                    if (StringUtils.isNotBlank(paymentDto.getResidentUserActualName())){
                        predicateList.add(criteriaBuilder.like(root.get("residentUserActualName"),"%"+paymentDto.getResidentUserActualName()+"%"));
                    }
                    if (StringUtils.isNotBlank(paymentDto.getTimeFrame())){
                        predicateList.add(criteriaBuilder.equal(root.get("timeFrame"),paymentDto.getTimeFrame()));
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
                PaymentDto d = MyBeanUtils.copyPropertiesAndResTarget(e, PaymentDto::new);
                d.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                d.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                d.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                d.setPaymentStatusStr(PaymentStatusEnum.getTypesName(e.getPaymentStatus()));
                d.setPropertyCost(e.getPropertyCost().doubleValue());
                return d;
            }).collect(Collectors.toList());
            return new Result<List<PaymentDto>>().setSuccess(paymentDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询缴费通知信息
     * @param paymentDto
     * @return
     */
    public Result<PaymentDto> findOne(PaymentDto paymentDto){
        try {
            PaymentEntity e = paymentRepository.findPaymentEntityById(paymentDto.getId());
            PaymentDto d = MyBeanUtils.copyPropertiesAndResTarget(e, PaymentDto::new);
            d.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
            d.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
            d.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
            d.setPaymentStatusStr(PaymentStatusEnum.getTypesName(e.getPaymentStatus()));
            d.setPropertyCost(e.getPropertyCost().doubleValue());
            return new Result<PaymentDto>().setSuccess(d);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 添加一条缴费通知信息
     * @param paymentDto
     * @return
     */
    public Result addOne(PaymentDto paymentDto){
        try {
            Date date = new Date();
            PaymentEntity paymentEntity = new PaymentEntity();
            paymentEntity.setId(MyStringUtils.getIdDateStr());
            paymentEntity.setCreateDate(date);
            paymentEntity.setUpdateDate(date);
            paymentEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
            if (StringUtils.isNotBlank(paymentDto.getResidentUserId())){
                ResidentUserEntity residentUserEntity = residentUserRepository.findResidentUserEntityById(paymentDto.getResidentUserId());
                paymentEntity.setResidentUserId(residentUserEntity.getId());
                paymentEntity.setResidentUserActualName(residentUserEntity.getActualName());
                paymentEntity.setResidentUserAddress(residentUserEntity.getAddress());
                paymentEntity.setResidentUserPhoneNumber(residentUserEntity.getPhoneNumber());
            }
            paymentEntity.setPropertyCost(new BigDecimal(paymentDto.getPropertyCost().toString()));
            paymentEntity.setDescription(paymentDto.getDescription());
            paymentEntity.setTimeFrame(paymentDto.getTimeFrame());
            paymentEntity.setPaymentStatus(paymentDto.getPaymentStatus());
            paymentRepository.save(paymentEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 给所有的房主添加缴费通知
     * @param paymentDto
     * @return
     */
    public Result addList(PaymentDto paymentDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            Page<ResidentUserEntity> page = residentUserRepository.findAll(new Specification<ResidentUserEntity>() {
                @Override
                public Predicate toPredicate(Root<ResidentUserEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    predicateList.add(criteriaBuilder.equal(root.get("houseMembers"), HouseMembersStatusEnum.HOMEOWNER.getType()));
                    predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),WhetherValidEnum.VALID.getType()));
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            page.getContent().stream().forEach(residentUserEntity->{
                Date date = new Date();
                PaymentEntity paymentEntity = new PaymentEntity();
                paymentEntity.setId(MyStringUtils.getIdDateStr());
                paymentEntity.setCreateDate(date);
                paymentEntity.setUpdateDate(date);
                paymentEntity.setWhetherValid(WhetherValidEnum.VALID.getType());

                paymentEntity.setResidentUserId(residentUserEntity.getId());
                paymentEntity.setResidentUserActualName(residentUserEntity.getActualName());
                paymentEntity.setResidentUserAddress(residentUserEntity.getAddress());
                paymentEntity.setResidentUserPhoneNumber(residentUserEntity.getPhoneNumber());

                paymentEntity.setPropertyCost(new BigDecimal(paymentDto.getPropertyCost().toString()));
                paymentEntity.setDescription(paymentDto.getDescription());
                paymentEntity.setTimeFrame(paymentDto.getTimeFrame());
                paymentEntity.setPaymentStatus(paymentDto.getPaymentStatus());
                paymentRepository.save(paymentEntity);
            });
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


    /**
     * 修改未发送缴费通知信息
     * @param paymentDto
     * @return
     */
    public Result update1(PaymentDto paymentDto){
        try {
            Date date = new Date();
            PaymentEntity paymentEntity = paymentRepository.findPaymentEntityById(paymentDto.getId());
            paymentEntity.setUpdateDate(date);
            paymentEntity.setPropertyCost(new BigDecimal(paymentDto.getPropertyCost().toString()));
            paymentEntity.setDescription(paymentDto.getDescription());
            paymentEntity.setTimeFrame(paymentDto.getTimeFrame());
            paymentRepository.save(paymentEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 发送缴费通知信息
     * @param paymentDto
     * @return
     */
    public Result update2(PaymentDto paymentDto){
        try {
            Date date = new Date();
            PaymentEntity paymentEntity = paymentRepository.findPaymentEntityById(paymentDto.getId());
            paymentEntity.setUpdateDate(date);
            paymentEntity.setPaymentStatus(PaymentStatusEnum.UNPAID.getType());
            paymentRepository.save(paymentEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 发送缴费通知信息
     * @param paymentDto
     * @return
     */
    public Result examine(PaymentDto paymentDto){
        try {
            Date date = new Date();
            PaymentEntity paymentEntity = paymentRepository.findPaymentEntityById(paymentDto.getId());
            paymentEntity.setUpdateDate(date);
            paymentEntity.setWhetherValid(paymentDto.getWhetherValid());
            paymentRepository.save(paymentEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
