package com.sc.manage.service.enroll;

import com.sc.base.dto.common.BaseIntoDto;
import com.sc.base.dto.enroll.EnrollDto;
import com.sc.base.dto.enroll.ManageEnrollIndexIntoDto;
import com.sc.base.dto.enroll.ManageEnrollIndexOutDto;
import com.sc.base.entity.enroll.EnrollEntity;
import com.sc.base.enums.AuditStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.enroll.EnrollRepository;
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
public class EnrollService {

    @Autowired
    private EnrollRepository enrollRepository;

    /**
     * 分页条件查询
     * @param indexIntoDto
     * @return
     */
    public Result<List<ManageEnrollIndexOutDto>> ManageEnrollIndex(ManageEnrollIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"voteNumber");
            //页数与每页大小
            Pageable pageable = PageRequest.of(indexIntoDto.getPage()-1, indexIntoDto.getLimit(),sort);
            //条件
            Page<EnrollEntity> page = enrollRepository.findAll(new Specification<EnrollEntity>() {
                @Override
                public Predicate toPredicate(Root<EnrollEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(indexIntoDto.getActivityId())){
                        predicateList.add(criteriaBuilder.equal(root.get("activityId"),indexIntoDto.getActivityId()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getResidentUserActualName())){
                        predicateList.add(criteriaBuilder.like(root.get("residentUserActualName"),"%"+indexIntoDto.getResidentUserActualName()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getAuditStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("auditStatus"),indexIntoDto.getAuditStatus()));
                    }
                    getBaseIntoDtoPredicate(predicateList,(BaseIntoDto) indexIntoDto,root,criteriaQuery,criteriaBuilder);
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ManageEnrollIndexOutDto> manageEnrollIndexOutDtoList = page.getContent().stream().map(e -> {
                ManageEnrollIndexOutDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageEnrollIndexOutDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setAuditStatusStr(AuditStatusEnum.getTypesName(e.getAuditStatus()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageEnrollIndexOutDto>>().setSuccess(manageEnrollIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    public Result findEnrollEntityById(EnrollDto dto){
        try {
            EnrollEntity entity = enrollRepository.findEnrollEntityById(dto.getId());
            if (entity!=null){
                EnrollDto newsDto = MyBeanUtils.copyPropertiesAndResTarget(entity, EnrollDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(entity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(entity.getUpdateDate()));
                    d.setAuditStatusStr(AuditStatusEnum.getTypesName(entity.getAuditStatus()));
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

    public Result updateEnrollEntityAuditStatus(EnrollDto dto){
        try {
            Date date = new Date();
            EnrollEntity entity = enrollRepository.findEnrollEntityById(dto.getId());
            if (entity!=null){
                entity.setAuditStatus(dto.getAuditStatus());
                entity.setUpdateDate(date);
                entity.setAuditReason(dto.getAuditReason());
                enrollRepository.save(entity);
                return Result.createSimpleSuccessResult();
            }else {
                return Result.createSimpleFailResult();
            }
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    private void getBaseIntoDtoPredicate(List<Predicate> predicateList, BaseIntoDto intoDto, Root<EnrollEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder){
        if (StringUtils.isNotBlank(intoDto.getWhetherValid())){
            predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),intoDto.getWhetherValid()));
        }else {
            predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
        }
        if (StringUtils.isNotBlank(intoDto.getStartCreateDateStr())){
            predicateList.add(criteriaBuilder.greaterThanOrEqualTo(root.get("createDate"),intoDto.getStartCreateDateStr()));
        }
        if (StringUtils.isNotBlank(intoDto.getStartCreateDateStr())){
            predicateList.add(criteriaBuilder.lessThanOrEqualTo(root.get("createDate"),intoDto.getStartCreateDateStr()));
        }
        if (StringUtils.isNotBlank(intoDto.getStartUpdateDateStr())){
            predicateList.add(criteriaBuilder.greaterThanOrEqualTo(root.get("updateDate"),intoDto.getStartUpdateDateStr()));
        }
        if (StringUtils.isNotBlank(intoDto.getStartUpdateDateStr())){
            predicateList.add(criteriaBuilder.lessThanOrEqualTo(root.get("updateDate"),intoDto.getStartUpdateDateStr()));
        }
    }

    /**
     * 柱状图
     * @param indexIntoDto
     * @return
     */
    public Result<List<ManageEnrollIndexOutDto>> enrollEchart(ManageEnrollIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"voteNumber");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            Page<EnrollEntity> page = enrollRepository.findAll(new Specification<EnrollEntity>() {
                @Override
                public Predicate toPredicate(Root<EnrollEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(indexIntoDto.getActivityId())){
                        predicateList.add(criteriaBuilder.equal(root.get("activityId"),indexIntoDto.getActivityId()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getAuditStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("auditStatus"),indexIntoDto.getAuditStatus()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getWhetherValid())){
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),indexIntoDto.getWhetherValid()));
                    }else {
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ManageEnrollIndexOutDto> manageEnrollIndexOutDtoList = page.getContent().stream().map(e -> {
                ManageEnrollIndexOutDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageEnrollIndexOutDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setAuditStatusStr(AuditStatusEnum.getTypesName(e.getAuditStatus()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageEnrollIndexOutDto>>().setSuccess(manageEnrollIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
