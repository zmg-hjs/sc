package com.sc.manage.service.repair;

import com.sc.base.dto.repair.RepairDto;
import com.sc.base.dto.repair.RepairOrderDto;
import com.sc.base.entity.repair.RepairEntity;
import com.sc.base.entity.repair.RepairOrderEntity;
import com.sc.base.enums.RepairOrderStatusEnum;
import com.sc.base.enums.RepairStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.repair.RepairOrderRepository;
import com.sc.base.repository.repair.RepairRepository;
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
public class RepairOrderService {

    @Autowired
    private RepairRepository repairRepository;
    @Autowired
    private RepairOrderRepository repairOrderRepository;

    /**
     * 维修列表
     * @return
     */
    public Result<List<RepairOrderDto>> findMyRepairEntityList(RepairOrderDto repairOrderDto){
        try {
            //多条件排序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(repairOrderDto.getPage()-1, repairOrderDto.getLimit(),sort);
            //条件
            Page<RepairOrderEntity> page = repairOrderRepository.findAll(new Specification<RepairOrderEntity>() {
                @Override
                public Predicate toPredicate(Root<RepairOrderEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(repairOrderDto.getRepairmanStatus())){
                        predicateList.add(criteriaBuilder.equal(root.get("repairmanStatus"), repairOrderDto.getRepairmanStatus()));
                    }
                    if (StringUtils.isNotBlank(repairOrderDto.getStaffUserActualName())){
                        predicateList.add(criteriaBuilder.equal(root.get("staffUserActualName"), "%"+repairOrderDto.getStaffUserActualName()+"%"));
                    }
                    if (StringUtils.isNotBlank(repairOrderDto.getWhetherValid())){
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),repairOrderDto.getWhetherValid()));
                    }else {
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<RepairOrderDto> repairOrderDtoList = page.getContent().stream().map(e -> {
                return MyBeanUtils.copyPropertiesAndResTarget(e, RepairOrderDto::new, dto -> {
                    dto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                    dto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                    dto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                    dto.setRepairmanStatusStr(RepairOrderStatusEnum.getTypesName(e.getRepairmanStatus()));
                });
            }).collect(Collectors.toList());
            return new Result<List<RepairOrderDto>>().setSuccess(repairOrderDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询报修详情
     * @param repairOrderDto
     * @return
     */
    public Result<RepairDto> findRepairEntityOne(RepairOrderDto repairOrderDto){
        try {
            RepairEntity repairEntity = repairRepository.findRepairEntityById(repairOrderDto.getRepairId());
            RepairDto repairDto1 = MyBeanUtils.copyPropertiesAndResTarget(repairEntity, RepairDto::new, d -> {
                d.setCreateDateStr(MyDateUtil.getDateAndTime(repairEntity.getCreateDate()));
                d.setUpdateDateStr(MyDateUtil.getDateAndTime(repairEntity.getUpdateDate()));
                d.setWhetherValidStr(WhetherValidEnum.getTypesName(repairEntity.getWhetherValid()));
                d.setMaintenanceStatusStr(RepairStatusEnum.getTypesName(repairEntity.getMaintenanceStatus()));
            });
            return new Result<RepairDto>().setSuccess(repairDto1);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询维修详情
     * @param repairOrderDto
     * @return
     */
    public Result<RepairOrderDto> findRepairOrderEntityOne(RepairOrderDto repairOrderDto){
        try {
            RepairOrderEntity repairOrderEntity = repairOrderRepository.findRepairOrderEntityById(repairOrderDto.getId());
            RepairOrderDto repairOrderDto1 = MyBeanUtils.copyPropertiesAndResTarget(repairOrderEntity, RepairOrderDto::new, d -> {
                d.setCreateDateStr(MyDateUtil.getDateAndTime(repairOrderEntity.getCreateDate()));
                d.setUpdateDateStr(MyDateUtil.getDateAndTime(repairOrderEntity.getUpdateDate()));
                d.setWhetherValidStr(WhetherValidEnum.getTypesName(repairOrderEntity.getWhetherValid()));
                d.setRepairmanStatusStr(RepairStatusEnum.getTypesName(repairOrderEntity.getRepairmanStatus()));
            });
            return new Result<RepairOrderDto>().setSuccess(repairOrderDto1);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }
}
