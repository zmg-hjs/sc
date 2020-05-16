package com.sc.manage.service.user;

import com.sc.base.dto.common.BaseIntoDto;
import com.sc.base.dto.user.*;
import com.sc.base.entity.user.ResidentRegistrationEntity;
import com.sc.base.entity.user.ResidentUserEntity;
import com.sc.base.enums.HouseMembersStatusEnum;
import com.sc.base.enums.RoleEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.user.ResidentRegistrationRepository;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResidentService {

    @Autowired
    private ResidentUserRepository residentUserRepository;
    @Autowired
    private ResidentRegistrationRepository residentRegistrationRepository;

    /**
     * 获取居民用户信息，分页条件查询
     * @param indexIntoDto
     * @return
     */
    /**
     * @param indexIntoDto
     * @return
     */
    public Result<List<ManageResidentUserIndexOutDto>> ManageResidentUserIndex(ManageResidentUserIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(indexIntoDto.getPage()-1, indexIntoDto.getLimit(),sort);
            //条件
            Page<ResidentUserEntity> page = residentUserRepository.findAll(new Specification<ResidentUserEntity>() {
                @Override
                public Predicate toPredicate(Root<ResidentUserEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
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
                        predicateList.add(criteriaBuilder.like(root.get("address"),"%"+indexIntoDto.getAddress()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getRole())){
                        predicateList.add(criteriaBuilder.equal(root.get("role"),indexIntoDto.getRole()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getHouseMembers())){
                        predicateList.add(criteriaBuilder.equal(root.get("houseMembers"),indexIntoDto.getHouseMembers()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getPhoneNumber())){
                        predicateList.add(criteriaBuilder.equal(root.get("phoneNumber"),indexIntoDto.getPhoneNumber()));
                    }
                    getBaseIntoDtoPredicate(predicateList,(BaseIntoDto) indexIntoDto,root,criteriaQuery,criteriaBuilder);
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ManageResidentUserIndexOutDto> manageResidentUserIndexOutDtoList = page.getContent().stream().map(e -> {
                ManageResidentUserIndexOutDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageResidentUserIndexOutDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setRoleStr(RoleEnum.getTypesName(e.getRole()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                outDto.setHouseMembersStr(HouseMembersStatusEnum.getTypesName(e.getHouseMembers()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageResidentUserIndexOutDto>>().setSuccess(manageResidentUserIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 根据id修改residentUser信息，使其失效或生效
     * @param residentUserDto
     * @return
     */
    public Result updateResidentUserWhetherValid(ResidentUserDto residentUserDto){
        try {
            //修改ResidentUserEntity的whetherValid
            Date date = new Date();
            ResidentUserEntity userEntity = residentUserRepository.findResidentUserEntityById(residentUserDto.getId());
            //修改ResidentRegistrationEntity的whetherValid
            ResidentRegistrationEntity residentRegistrationEntity = residentRegistrationRepository.findResidentRegistrationEntityById(userEntity.getUserAuditId());
            if (userEntity!=null&&residentRegistrationEntity!=null){
                userEntity.setWhetherValid(residentUserDto.getWhetherValid());
                userEntity.setUpdateDate(date);
                userEntity.setRole(residentUserDto.getRole());

                residentRegistrationEntity.setWhetherValid(userEntity.getWhetherValid());
                residentRegistrationEntity.setUpdateDate(date);

                residentUserRepository.save(userEntity);
                residentRegistrationRepository.save(residentRegistrationEntity);
                return Result.createSimpleSuccessResult();
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询居民登记信息，条件分页查询
     * @param indexIntoDto
     * @return
     */
    public Result<List<ManageResidentRegistrationIndexOutDto>> ManageResidentRegistrationIndex(ManageResidentRegistrationIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(indexIntoDto.getPage()-1, indexIntoDto.getLimit(),sort);
            //条件
            Page<ResidentRegistrationEntity> page = residentRegistrationRepository.findAll(new Specification() {
                @Override
                public Predicate toPredicate(Root root, CriteriaQuery criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(indexIntoDto.getActualName())){
                        predicateList.add(criteriaBuilder.equal(root.get("actualName"),indexIntoDto.getActualName()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getIdNumber())){
                        predicateList.add(criteriaBuilder.equal(root.get("idNumber"),indexIntoDto.getIdNumber()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getAddress())){
                        predicateList.add(criteriaBuilder.like(root.get("address"),"%"+indexIntoDto.getAddress()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getPhoneNumber())){
                        predicateList.add(criteriaBuilder.equal(root.get("phoneNumber"),indexIntoDto.getPhoneNumber()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getHouseMembers())){
                        predicateList.add(criteriaBuilder.equal(root.get("houseMembers"),indexIntoDto.getHouseMembers()));
                    }
                    getBaseIntoDtoPredicate(predicateList,(BaseIntoDto) indexIntoDto,root,criteriaQuery,criteriaBuilder);
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ResidentRegistrationEntity> residentRegistrationEntityList = page.getContent();
            List<ManageResidentRegistrationIndexOutDto> manageResidentRegistrationIndexOutDtoList = residentRegistrationEntityList.stream().map(e -> {
                ManageResidentRegistrationIndexOutDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageResidentRegistrationIndexOutDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                outDto.setHouseMembersStr(HouseMembersStatusEnum.getTypesName(e.getHouseMembers()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageResidentRegistrationIndexOutDto>>().setSuccess(manageResidentRegistrationIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 居民用户信息详细显示
     * @param residentUserDto
     * @return
     */
    public Result findResidentUserById(ResidentUserDto residentUserDto){
        try {
            ResidentUserEntity userEntity = residentUserRepository.findResidentUserEntityById(residentUserDto.getId());
            if (userEntity!=null){
                ResidentUserDto dto = MyBeanUtils.copyPropertiesAndResTarget(userEntity, ResidentUserDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(userEntity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(userEntity.getUpdateDate()));
                    d.setRoleStr(RoleEnum.getTypesName(userEntity.getRole()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(userEntity.getWhetherValid()));
                    d.setHouseMembersStr(HouseMembersStatusEnum.getTypesName(userEntity.getHouseMembers()));
                });
                return new Result().setSuccess(dto);
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 登记居民信息
     * @param dto
     * @return
     */
    public Result addResidentRegistrationEntity(ResidentRegistrationDto dto){
        try {
            ResidentRegistrationEntity entity = new ResidentRegistrationEntity();
            entity.setId(MyStringUtils.getIdDateStr("resident_registration"));
            entity.setActualName(dto.getActualName());
            entity.setIdNumber(dto.getIdNumber());
            entity.setCommunity(dto.getCommunity());
            entity.setUnit(dto.getUnit());
            entity.setFloor(dto.getFloor());
            entity.setDoor(dto.getDoor());
            entity.setAddress(dto.getCommunity()+dto.getUnit()+dto.getFloor()+dto.getDoor());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setHouseMembers(dto.getHouseMembers());
            entity.setCreateDate(new Date());
            entity.setUpdateDate(new Date());
            entity.setWhetherValid(WhetherValidEnum.VALID.getType());
            ResidentRegistrationEntity save = residentRegistrationRepository.save(entity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 根据id修改ResidentRegistration信息
     * @param dto
     * @return
     */
    public Result updateResidentRegistrationEntity(ResidentRegistrationDto dto){
        try {
            ResidentRegistrationEntity entity = residentRegistrationRepository.findResidentRegistrationEntityById(dto.getId());
            if (entity!=null){
                entity.setActualName(dto.getActualName());
                entity.setIdNumber(dto.getIdNumber());
                entity.setAddress(dto.getAddress());
                entity.setPhoneNumber(dto.getPhoneNumber());
                entity.setCommunity(dto.getCommunity());
                entity.setUnit(dto.getUnit());
                entity.setFloor(dto.getFloor());
                entity.setDoor(dto.getDoor());
                entity.setAddress(dto.getCommunity()+dto.getUnit()+dto.getFloor()+dto.getDoor());
                entity.setHouseMembers(dto.getHouseMembers());
                entity.setUpdateDate(new Date());
                residentRegistrationRepository.save(entity);
                return Result.createSimpleSuccessResult();
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 根据id修改ResidentRegistration信息,使其失效或生效
     * @param residentRegistrationDto
     * @return
     */
    public Result updateResidentRegistrationWhetherValid(ResidentRegistrationDto residentRegistrationDto){
        try {
            Date date = new Date();
            //修改ResidentRegistrationEntity的whetherValid
            ResidentRegistrationEntity entity = residentRegistrationRepository.findResidentRegistrationEntityById(residentRegistrationDto.getId());
            //修改ResidentUserEntity的whetherValid
            ResidentUserEntity residentUserEntity = residentUserRepository.findResidentUserEntityByPhoneNumber(entity.getPhoneNumber());

            if (entity!=null){
                entity.setWhetherValid(residentRegistrationDto.getWhetherValid());
                entity.setUpdateDate(date);
                residentRegistrationRepository.save(entity);
                if (residentUserEntity!=null){
                    residentUserEntity.setWhetherValid(entity.getWhetherValid());
                    residentUserEntity.setUpdateDate(date);
                    residentUserRepository.save(residentUserEntity);
                }
                return Result.createSimpleSuccessResult();
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 根据id查询详情
     * @param dto
     * @return
     */
    public Result<ResidentRegistrationDto> findResidentRegistrationEntityById(ResidentRegistrationDto dto){
        try {
            ResidentRegistrationEntity entity = residentRegistrationRepository.findResidentRegistrationEntityById(dto.getId());
            if (entity!=null){
                ResidentRegistrationDto ResidentRegistrationDto = MyBeanUtils.copyPropertiesAndResTarget(entity, ResidentRegistrationDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(entity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(entity.getUpdateDate()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(entity.getWhetherValid()));
                    d.setHouseMembersStr(HouseMembersStatusEnum.getTypesName(entity.getHouseMembers()));

                });
                return new Result<ResidentRegistrationDto>().setSuccess(ResidentRegistrationDto) ;
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    private void getBaseIntoDtoPredicate(List<Predicate> predicateList, BaseIntoDto intoDto,Root<ResidentUserEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder){
        if (StringUtils.isNotBlank(intoDto.getWhetherValid())){
            predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),intoDto.getWhetherValid()));
        }else {
            predicateList.add(criteriaBuilder.equal(root.get("whetherValid"),WhetherValidEnum.VALID.getType()));
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
