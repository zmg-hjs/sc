package com.sc.manage.service.repair;

import com.sc.base.dto.repair.RepairDto;
import com.sc.base.entity.repair.RepairEntity;
import com.sc.base.entity.repair.RepairOrderEntity;
import com.sc.base.entity.work.WorkEntity;
import com.sc.base.enums.*;
import com.sc.base.repository.repair.RepairOrderRepository;
import com.sc.base.repository.repair.RepairRepository;
import com.sc.base.repository.work.WorkRepository;
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
public class RepairService {

    @Autowired
    private RepairRepository repairRepository;
    @Autowired
    private RepairOrderRepository repairOrderRepository;
    @Autowired
    private WorkRepository workRepository;

    /**
     * 查询列表
     * @return
     */
    public Result<List<RepairDto>> findRepairEntityList(RepairDto repairDto){
        try {
            //多条件排序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(repairDto.getPage()-1, repairDto.getLimit(),sort);
            //条件
            Page<RepairEntity> page = repairRepository.findAll(new Specification<RepairEntity>() {
                @Override
                public Predicate toPredicate(Root<RepairEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(repairDto.getResidentUserActualName())){
                        predicateList.add(criteriaBuilder.like(root.get("residentUserActualName"),"%"+repairDto.getResidentUserActualName()+"%"));
                    }
                    if (StringUtils.isNotBlank(repairDto.getWhetherValid())){
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),repairDto.getWhetherValid()));
                    }else {
                        predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<RepairDto> repairDtoList = page.getContent().stream().map(e -> {
                RepairDto dto = MyBeanUtils.copyPropertiesAndResTarget(e, RepairDto::new);
                dto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                dto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                dto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                dto.setMaintenanceStatusStr(RepairStatusEnum.getTypesName(e.getMaintenanceStatus()));
                return dto;
            }).collect(Collectors.toList());
            return new Result<List<RepairDto>>().setSuccess(repairDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询详情
     * @param repairDto
     * @return
     */
    public Result<RepairDto> findOne(RepairDto repairDto){
        try {
            RepairEntity repairEntity = repairRepository.findRepairEntityById(repairDto.getId());
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
     * 分配
     * 传入参数 id维修表id、staffUserId、workId、staffUserActualName、staffUserPhoneNumber
     * @param repairDto
     * @return
     */
    public Result update(RepairDto repairDto){
        try {
            Date date = new Date();
            //修改工作表
            WorkEntity workEntity = workRepository.findWorkEntityById(repairDto.getWorkId());
            workEntity.setWorkStatus(WorkStatusEnum.BE_BUSY.getType());
            workEntity.setUpdateDate(date);
            workRepository.save(workEntity);
            //添加维修订单表
            RepairOrderEntity repairOrderEntity = new RepairOrderEntity();
            String repairOrderId = MyStringUtils.getIdDateStr("repair_order");
            repairOrderEntity.setId(repairOrderId);
            repairOrderEntity.setCreateDate(date);
            repairOrderEntity.setUpdateDate(date);
            repairOrderEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
            repairOrderEntity.setScore(3);
            repairOrderEntity.setRepairId(repairDto.getId());
            repairOrderEntity.setStaffUserId(workEntity.getStaffUserId());
            repairOrderEntity.setRepairmanStatus(RepairOrderStatusEnum.RECEIVE_DISPATCH.getType());
            repairOrderRepository.save(repairOrderEntity);
            //修改维修表
            RepairEntity repairEntity = repairRepository.findRepairEntityById(repairDto.getId());
            repairEntity.setWorkId(workEntity.getId());
            repairEntity.setRepairOrderId(repairOrderId);
            repairEntity.setMaintenanceStatus(RepairStatusEnum.SUCCESSFUL_DISPATCH.getType());
            repairEntity.setStaffUserId(workEntity.getStaffUserId());
            repairEntity.setStaffUserActualName(workEntity.getStaffUserActualName());
            repairEntity.setStaffUserPhoneNumber(workEntity.getStaffUserPhoneNumber());
            repairEntity.setUpdateDate(date);
            repairRepository.save(repairEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询维修员工
     * @return
     */
    public Result<List<WorkEntity>> findStaffUserList(){
        //多条件排序
        try {
            List<Sort.Order> orderList = new ArrayList<>();
            orderList.add(new Sort.Order(Sort.Direction.ASC,"repairNumber"));
            orderList.add(new Sort.Order(Sort.Direction.ASC,"weight"));
            Sort sort =Sort.by(orderList);
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            Page<WorkEntity> page = workRepository.findAll(new Specification<WorkEntity>() {
                @Override
                public Predicate toPredicate(Root<WorkEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    predicateList.add(criteriaBuilder.like(root.get("staffUserPosition"), "%"+ PositionEnum.REPAIRMAN.getType()+"%"));
                    predicateList.add(criteriaBuilder.equal(root.get("workStatus"), WorkStatusEnum.ON_DUTY_STATUS.getType()));
                    predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            return new Result<List<WorkEntity>>().setSuccess(page.getContent());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
