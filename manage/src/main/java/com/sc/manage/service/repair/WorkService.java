package com.sc.manage.service.repair;

import com.sc.base.dto.work.WorkDto;
import com.sc.base.entity.work.WorkEntity;
import com.sc.base.enums.PositionEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.enums.WorkStatusEnum;
import com.sc.base.repository.work.WorkRepository;
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
public class WorkService {
    @Autowired
    private WorkRepository workRepository;

    /**
     * 员工列表
     * @param workDto
     * @return
     */
    public Result<List<WorkDto>> list(WorkDto workDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(workDto.getPage()-1, workDto.getLimit());
            //条件
            Page<WorkEntity> page = workRepository.findAll(new Specification<WorkEntity>() {
                @Override
                public Predicate toPredicate(Root<WorkEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(workDto.getStaffUserActualName())){
                        predicateList.add(criteriaBuilder.like(root.get("staffUserActualName"),"%"+workDto.getStaffUserActualName()+"%"));
                    }
                    if (StringUtils.isNotBlank(workDto.getWhetherValid())){
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),workDto.getWhetherValid()));
                    }else {
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<WorkDto> workDtoList = page.getContent().stream().map(e -> {
                WorkDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, WorkDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                outDto.setWorkStatusStr(WorkStatusEnum.getTypesName(e.getWorkStatus()));
                outDto.setStaffUserPositionStr(PositionEnum.getTypesName(e.getStaffUserPosition()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<WorkDto>>().setSuccess(workDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    public Result<WorkDto> findOne(WorkDto workDto){
        try {
            WorkEntity workEntity = workRepository.findWorkEntityById(workDto.getId());
            WorkDto workDto1 = MyBeanUtils.copyPropertiesAndResTarget(workEntity, WorkDto::new);
            workDto1.setCreateDateStr(MyDateUtil.getDateAndTime(workEntity.getCreateDate()));
            workDto1.setUpdateDateStr(MyDateUtil.getDateAndTime(workEntity.getUpdateDate()));
            workDto1.setWhetherValidStr(WhetherValidEnum.getTypesName(workEntity.getWhetherValid()));
            workDto1.setWorkStatusStr(WorkStatusEnum.getTypesName(workEntity.getWorkStatus()));
            workDto1.setStaffUserPositionStr(PositionEnum.getTypesName(workEntity.getStaffUserPosition()));
            return new Result<WorkDto>().setSuccess(workDto1);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


}
