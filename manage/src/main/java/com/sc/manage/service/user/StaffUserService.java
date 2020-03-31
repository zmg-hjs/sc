package com.sc.manage.service.user;

import com.sc.base.dto.common.BaseIntoDto;
import com.sc.base.dto.user.ManageStaffUserIndexIntoDto;
import com.sc.base.dto.user.ManageStaffUserIndexOutDto;
import com.sc.base.entity.user.StaffUserEntity;
import com.sc.base.repository.user.StaffUserRepository;
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
public class StaffUserService {

    @Autowired
    private StaffUserRepository staffUserRepository;

    /**
     * 获取工作人员信息，分页条件查询
     * @param indexIntoDto
     * @return
     */
    /**
     * @param indexIntoDto
     * @return
     */
    public Result<List<ManageStaffUserIndexOutDto>> ManageStaffUserIndex(ManageStaffUserIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(indexIntoDto.getPage()-1, indexIntoDto.getLimit(),sort);
            //条件
            Page<StaffUserEntity> page = staffUserRepository.findAll(new Specification<StaffUserEntity>() {
                @Override
                public Predicate toPredicate(Root<StaffUserEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(indexIntoDto.getUsername())){
                        predicateList.add(criteriaBuilder.equal(root.get("username"),indexIntoDto.getUsername()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getActualName())){
                        predicateList.add(criteriaBuilder.equal(root.get("actualName"),indexIntoDto.getActualName()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getIdNumber())){
                        predicateList.add(criteriaBuilder.equal(root.get("idNumber"),indexIntoDto.getIdNumber()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getAddress())){
                        predicateList.add(criteriaBuilder.equal(root.get("address"),indexIntoDto.getAddress()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getPosition())){
                        predicateList.add(criteriaBuilder.equal(root.get("position"),indexIntoDto.getUsername()));
                    }
                    getBaseIntoDtoPredicate(predicateList,(BaseIntoDto) indexIntoDto,root,criteriaQuery,criteriaBuilder);
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ManageStaffUserIndexOutDto> manageStaffUserIndexOutDtoList = page.getContent().stream().map(e -> {
                ManageStaffUserIndexOutDto manageStaffUserIndexOutDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageStaffUserIndexOutDto::new);
                manageStaffUserIndexOutDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                manageStaffUserIndexOutDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                return manageStaffUserIndexOutDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageStaffUserIndexOutDto>>().setSuccess(manageStaffUserIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    private void getBaseIntoDtoPredicate(List<Predicate> predicateList, BaseIntoDto intoDto,Root<StaffUserEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder){
        if (StringUtils.isNotBlank(intoDto.getWhetherValid())){
            predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),intoDto.getWhetherValid()));
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

}
