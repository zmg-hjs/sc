package com.sc.resident.service.repair;

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
     * 添加报修信息
     * @param repairDto
     * @return
     */
    public Result addRepairEntity(RepairDto repairDto){
        try {
            Date date = new Date();
            RepairEntity repairEntity = new RepairEntity();
            repairEntity.setId(MyStringUtils.getIdDateStr("repair"));
            repairEntity.setCreateDate(new Date());
            repairEntity.setUpdateDate(new Date());
            repairEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
            repairEntity.setResidentUserId(repairDto.getResidentUserId());
            repairEntity.setResidentUserActualName(repairDto.getResidentUserActualName());
            repairEntity.setResidentUserPhoneNumber(repairDto.getResidentUserPhoneNumber());
            repairEntity.setMaintenanceAddress(repairDto.getMaintenanceAddress());
            repairEntity.setMaintenanceContent(repairDto.getMaintenanceContent());
            List<WorkEntity> workEntityList = findStaffUserList().getData();
            if (workEntityList!=null&&workEntityList.size()>0){
                repairEntity.setStaffUserId(workEntityList.get(0).getStaffUserId());
                repairEntity.setStaffUserActualName(workEntityList.get(0).getStaffUserActualName());
                repairEntity.setStaffUserPhoneNumber(workEntityList.get(0).getStaffUserPhoneNumber());
                repairEntity.setMaintenanceStatus(RepairStatusEnum.SUCCESSFUL_DISPATCH.getType());
                repairRepository.save(repairEntity);
            }else {
                repairEntity.setMaintenanceStatus(RepairStatusEnum.DISPATCH.getType());
                repairRepository.save(repairEntity);
            }
            return Result.createSimpleSuccessResult();
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
    public Result<RepairDto> findRepairEntityById(RepairDto repairDto){
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
     * 查询列表
     * @return
     */
    public Result<List<RepairDto>> findRepairEntityList(RepairDto repairDto){
        try {
            //多条件排序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            Page<RepairEntity> page = repairRepository.findAll(new Specification<RepairEntity>() {
                @Override
                public Predicate toPredicate(Root<RepairEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(repairDto.getResidentUserId())){
                        predicateList.add(criteriaBuilder.equal(root.get("residentUserId"),repairDto.getResidentUserId()));
                    }
                    predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
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
     * 取消报修
     * @param repairDto
     * @return
     */
    public Result cacelRepair(RepairDto repairDto){
        try {
            Date date = new Date();
            RepairEntity repairEntity = repairRepository.findRepairEntityById(repairDto.getId());
            repairEntity.setMaintenanceStatus(RepairStatusEnum.CANCEL.getType());
            repairEntity.setUpdateDate(date);
            repairRepository.save(repairEntity);
            //派遣状态下
            if (RepairStatusEnum.DISPATCH.getType().equals(repairEntity.getMaintenanceStatus())){
                return Result.createSimpleSuccessResult();
            }
            //修改订单表
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            Page<RepairOrderEntity> page = repairOrderRepository.findAll(new Specification<RepairOrderEntity>() {
                @Override
                public Predicate toPredicate(Root<RepairOrderEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(repairDto.getId())){
                        predicateList.add(criteriaBuilder.equal(root.get("repairId"),repairDto.getId()));
                    }
                    predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            page.getContent().stream().filter(e->{
                return !RepairOrderStatusEnum.CANCEL.getType().equals(e.getRepairmanStatus());
            }).forEach(e->{
                e.setRepairmanStatus(RepairStatusEnum.CANCEL.getType());
                e.setUpdateDate(date);
                repairOrderRepository.save(e);
            });
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 报修反馈
     * @param repairDto
     * @return
     */
    public Result repairFeedback(RepairDto repairDto){
        try {
            Date date = new Date();
            RepairEntity repairEntity = repairRepository.findRepairEntityById(repairDto.getId());
            repairEntity.setMaintenanceFeedback(repairDto.getMaintenanceFeedback());
            repairEntity.setMaintenanceStatus(RepairStatusEnum.FEEDBACK.getType());
            repairEntity.setUpdateDate(date);
            repairRepository.save(repairEntity);
            //修改工作表
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            Page<WorkEntity> page = workRepository.findAll(new Specification<WorkEntity>() {
                @Override
                public Predicate toPredicate(Root<WorkEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    predicateList.add(criteriaBuilder.equal(root.get("staffUserId"), repairEntity.getStaffUserId()));
                    predicateList.add(criteriaBuilder.equal(root.get("whetherValid"), WhetherValidEnum.VALID.getType()));
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            page.getContent().stream().forEach(e->{
                e.setWeight(e.getWeight()-3+repairDto.getScore());
                e.setUpdateDate(date);
                workRepository.save(e);
            });
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


    /**
     * 查询上班状态维修员工
     * 根据维修任务，优先级排序
     * @return
     */
    public Result<List<WorkEntity>> findStaffUserList(){
        try {
            //多条件排序
            List<Sort.Order> orderList = new ArrayList<>();
            orderList.add(new Sort.Order(Sort.Direction.ASC,"repairNumber"));
            orderList.add(new Sort.Order(Sort.Direction.ASC,"weight"));
            Sort sort =Sort.by(orderList);
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            Page<WorkEntity> page = workRepository.findAll(new Specification<WorkEntity>() {
                @Override
                public Predicate toPredicate(Root<WorkEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    predicateList.add(criteriaBuilder.like(root.get("staffUserPosition"), "%"+PositionEnum.REPAIRMAN.getType()+"%"));
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
