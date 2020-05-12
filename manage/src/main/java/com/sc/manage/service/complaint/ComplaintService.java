package com.sc.manage.service.complaint;

import com.sc.base.dto.complaint.ComplaintDto;
import com.sc.base.entity.complaint.ComplaintEntity;
import com.sc.base.enums.ComplaintStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.complaint.ComplaintRepository;
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
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    /**
     * 首页
     * @param complaintDto
     * @return
     */
    public Result<List<ComplaintDto>> list(ComplaintDto complaintDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(complaintDto.getPage()-1, complaintDto.getLimit());
            //条件
            Page<ComplaintEntity> page = complaintRepository.findAll(new Specification<ComplaintEntity>() {
                @Override
                public Predicate toPredicate(Root<ComplaintEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(complaintDto.getResidentUserActualName())){
                        predicateList.add(criteriaBuilder.like(root.get("residentUserActualName"),"%"+complaintDto.getResidentUserActualName()+"%"));
                    }
                    if (StringUtils.isNotBlank(complaintDto.getComplaintStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("complaintStatus"),complaintDto.getComplaintStatus()));
                    }
                    if (StringUtils.isNotBlank(complaintDto.getResidentUserId())){
                        predicateList.add(criteriaBuilder.equal(root.get("residentUserId"),complaintDto.getResidentUserId()));
                    }
                    if (StringUtils.isNotBlank(complaintDto.getWhetherValid())){
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),complaintDto.getWhetherValid()));
                    }else {
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ComplaintDto> complaintDtoList = page.getContent().stream().map(e -> {
                ComplaintDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ComplaintDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                outDto.setComplaintStatusStr(ComplaintStatusEnum.getTypesName(e.getComplaintStatus()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ComplaintDto>>().setSuccess(complaintDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询详情
     * @param complaintDto
     * @return
     */
    public Result<ComplaintDto> findComplaintEntityById(ComplaintDto complaintDto){
        try {
            ComplaintEntity entity = complaintRepository.findComplaintEntityById(complaintDto.getId());
            ComplaintDto dto = MyBeanUtils.copyPropertiesAndResTarget(entity, ComplaintDto::new);
            dto.setCreateDateStr(MyDateUtil.getDateAndTime(entity.getCreateDate()));
            dto.setUpdateDateStr(MyDateUtil.getDateAndTime(entity.getUpdateDate()));
            dto.setWhetherValidStr(WhetherValidEnum.getTypesName(entity.getWhetherValid()));
            dto.setComplaintStatusStr(ComplaintStatusEnum.getTypesName(entity.getComplaintStatus()));
            return new Result<ComplaintDto>().setSuccess(dto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    public Result update(ComplaintDto complaintDto){
        try {
            ComplaintEntity entity = complaintRepository.findComplaintEntityById(complaintDto.getId());
            if (entity==null) return Result.createSimpleFailResult();
            entity.setComplaintStatus(ComplaintStatusEnum.PROCESSED.getType());
            entity.setFeedback(complaintDto.getFeedback());
            entity.setWhetherValid(complaintDto.getWhetherValid());
            entity.setUpdateDate(new Date());
            complaintRepository.save(entity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
