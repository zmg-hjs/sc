package com.sc.resident.service.complaint;

import com.sc.base.dto.complaint.ComplaintDto;
import com.sc.base.entity.commodity.CommodityEntity;
import com.sc.base.entity.complaint.ComplaintEntity;
import com.sc.base.enums.ComplaintStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.complaint.ComplaintRepository;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    /**
     * 投诉
     * @param complaintDto
     * @return
     */
    public Result add(ComplaintDto complaintDto){
        try {
            ComplaintEntity complaintEntity = MyBeanUtils.copyPropertiesAndResTarget(complaintDto, ComplaintEntity::new);
            Date date = new Date();
            String complaintId = MyStringUtils.getIdDateStr("complaint");
            complaintEntity.setId(complaintId);
            complaintEntity.setCreateDate(date);
            complaintEntity.setUpdateDate(date);
            complaintEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
            complaintEntity.setComplaintStatus(ComplaintStatusEnum.PROCESSING.getType());
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 我的投诉
     * @param complaintDto
     * @return
     */
    public Result<List<ComplaintDto>> findAll(ComplaintDto complaintDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            Page<ComplaintEntity> page = complaintRepository.findAll(new Specification<ComplaintEntity>() {
                @Override
                public Predicate toPredicate(Root<ComplaintEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(complaintDto.getComplaintStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("complaintStatus"),complaintDto.getComplaintStatus()));
                    }
                    if (StringUtils.isNotBlank(complaintDto.getResidentUserId())){
                        predicateList.add(criteriaBuilder.equal(root.get("residentUserId"),complaintDto.getResidentUserId()));
                    }
                    predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),WhetherValidEnum.VALID.getType()));
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ComplaintDto> residentNewsIndexOutDtoList = page.getContent().stream().map(e -> {
                ComplaintDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ComplaintDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                outDto.setComplaintStatusStr(ComplaintStatusEnum.getTypesName(e.getComplaintStatus()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ComplaintDto>>().setSuccess(residentNewsIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
