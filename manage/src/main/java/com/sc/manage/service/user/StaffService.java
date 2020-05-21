package com.sc.manage.service.user;

import com.sc.base.dto.common.BaseIntoDto;
import com.sc.base.dto.user.*;
import com.sc.base.entity.user.StaffRegistrationEntity;
import com.sc.base.entity.user.StaffUserEntity;
import com.sc.base.enums.PositionEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.user.StaffRegistrationRepository;
import com.sc.base.repository.user.StaffUserRepository;
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
import org.springframework.util.DigestUtils;
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
public class StaffService {

    @Autowired
    private StaffUserRepository staffUserRepository;
    @Autowired
    private StaffRegistrationRepository staffRegistrationRepository;

    /**
     * 获取工作人员用户信息，分页条件查询
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
                        predicateList.add(criteriaBuilder.like(root.get("address"),"%"+indexIntoDto.getAddress()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getPosition())){
                        predicateList.add(criteriaBuilder.equal(root.get("position"),indexIntoDto.getPosition()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getPhoneNumber())){
                        predicateList.add(criteriaBuilder.equal(root.get("phoneNumber"),indexIntoDto.getPhoneNumber()));
                    }
                    getBaseIntoDtoPredicate(predicateList,(BaseIntoDto) indexIntoDto,root,criteriaQuery,criteriaBuilder);
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ManageStaffUserIndexOutDto> manageStaffUserIndexOutDtoList = page.getContent().stream().map(e -> {
                ManageStaffUserIndexOutDto manageStaffUserIndexOutDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageStaffUserIndexOutDto::new);
                manageStaffUserIndexOutDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                manageStaffUserIndexOutDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                manageStaffUserIndexOutDto.setPositionStr(PositionEnum.getTypesName(e.getPosition()));
                manageStaffUserIndexOutDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                return manageStaffUserIndexOutDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageStaffUserIndexOutDto>>().setSuccess(manageStaffUserIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 根据id修改staffUser信息，使其失效或生效
     * @param staffUserDto
     * @return
     */
    public Result updateStaffUserWhetherValid(StaffUserDto staffUserDto){
        try {
            Date date = new Date();
            //修改StaffUserEntity的whetherValid
            StaffUserEntity userEntity = staffUserRepository.findStaffUserEntityById(staffUserDto.getId());
            //修改StaffRegistrationEntity的whetherValid
            StaffRegistrationEntity staffRegistrationEntity = staffRegistrationRepository.findStaffRegistrationEntityById(userEntity.getUserAuditId());
            if (userEntity!=null&&staffRegistrationEntity!=null){

                userEntity.setWhetherValid(staffUserDto.getWhetherValid());
                userEntity.setUpdateDate(date);

                staffRegistrationEntity.setWhetherValid(userEntity.getWhetherValid());
                staffRegistrationEntity.setUpdateDate(date);

                staffUserRepository.save(userEntity);
                staffRegistrationRepository.save(staffRegistrationEntity);
                return Result.createSimpleSuccessResult();
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 工作人员用户信息详细显示
     * @param staffUserDto
     * @return
     */
    public Result findStaffUserById(StaffUserDto staffUserDto){
        try {
            StaffUserEntity userEntity = staffUserRepository.findStaffUserEntityById(staffUserDto.getId());
            if (userEntity!=null){
                StaffUserDto dto = MyBeanUtils.copyPropertiesAndResTarget(userEntity, StaffUserDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(userEntity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(userEntity.getUpdateDate()));
                    d.setPositionStr(PositionEnum.getTypesName(userEntity.getPosition()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(userEntity.getWhetherValid()));
                });
                return new Result().setSuccess(dto);
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查询工作人员登记信息，条件分页查询
     * @param indexIntoDto
     * @return
     */
    public Result<List<ManageStaffRegistrationIndexOutDto>> ManageStaffRegistrationIndex(ManageStaffRegistrationIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(indexIntoDto.getPage()-1, indexIntoDto.getLimit(),sort);
            //条件
            Page<StaffRegistrationEntity> page = staffRegistrationRepository.findAll(new Specification() {
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
                    if (StringUtils.isNotBlank(indexIntoDto.getPosition())){
                        predicateList.add(criteriaBuilder.equal(root.get("position"),indexIntoDto.getPosition()));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getPhoneNumber())){
                        predicateList.add(criteriaBuilder.equal(root.get("phoneNumber"),indexIntoDto.getPhoneNumber()));
                    }
                    getBaseIntoDtoPredicate(predicateList,(BaseIntoDto) indexIntoDto,root,criteriaQuery,criteriaBuilder);
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<StaffRegistrationEntity> staffRegistrationEntityList = page.getContent();
            List<ManageStaffRegistrationIndexOutDto> manageStaffRegistrationIndexOutDtoList = staffRegistrationEntityList.stream().map(e -> {
                ManageStaffRegistrationIndexOutDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageStaffRegistrationIndexOutDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setPositionStr(PositionEnum.getTypesName(e.getPosition()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageStaffRegistrationIndexOutDto>>().setSuccess(manageStaffRegistrationIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 登记工作人员信息
     * @param dto
     * @return
     */
    public Result addStaffRegistrationEntity(StaffRegistrationDto dto){
        try {
            StaffRegistrationEntity entity = new StaffRegistrationEntity();
            entity.setId(MyStringUtils.getIdDateStr("staff_registration"));
            entity.setActualName(dto.getActualName());
            entity.setIdNumber(dto.getIdNumber());
            entity.setPosition(dto.getPosition());
            entity.setAddress(dto.getAddress());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setCreateDate(new Date());
            entity.setUpdateDate(new Date());
            entity.setWhetherValid(WhetherValidEnum.VALID.getType());
            StaffRegistrationEntity save = staffRegistrationRepository.save(entity);
            System.out.println(save.toString());
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 根据id修改StaffRegistration信息
     * @param dto
     * @return
     */
    public Result updateStaffRegistrationEntity(StaffRegistrationDto dto){
        try {
            StaffRegistrationEntity entity = staffRegistrationRepository.findStaffRegistrationEntityById(dto.getId());
            if (entity!=null){
                entity.setActualName(dto.getActualName());
                entity.setIdNumber(dto.getIdNumber());
                entity.setPosition(dto.getPosition());
                entity.setAddress(dto.getAddress());
                entity.setPhoneNumber(dto.getPhoneNumber());
                entity.setUpdateDate(new Date());
                staffRegistrationRepository.save(entity);
                return Result.createSimpleSuccessResult();
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 根据id修改StaffRegistration信息,使其失效或生效
     * @param staffRegistrationDto
     * @return
     */
    public Result updateStaffRegistrationWhetherValid(StaffRegistrationDto staffRegistrationDto){
        try {
            Date date = new Date();
            //修改StaffRegistrationEntity的whetherValid
            StaffRegistrationEntity entity = staffRegistrationRepository.findStaffRegistrationEntityById(staffRegistrationDto.getId());
            //修改StaffUserEntity的whetherValid
            StaffUserEntity staffUserEntity = staffUserRepository.findStaffUserEntityByPhoneNumber(entity.getPhoneNumber());
            if (entity!=null){
                entity.setWhetherValid(staffRegistrationDto.getWhetherValid());
                entity.setUpdateDate(date);
                staffRegistrationRepository.save(entity);
                if (staffUserEntity!=null){
                    staffUserEntity.setWhetherValid(entity.getWhetherValid());
                    staffUserEntity.setUpdateDate(date);
                    staffUserRepository.save(staffUserEntity);
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
    public Result<StaffRegistrationDto> findStaffRegistrationEntityById(StaffRegistrationDto dto){
        try {
            StaffRegistrationEntity entity = staffRegistrationRepository.findStaffRegistrationEntityById(dto.getId());
            if (entity!=null){
                StaffRegistrationDto staffRegistrationDto = MyBeanUtils.copyPropertiesAndResTarget(entity, StaffRegistrationDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(entity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(entity.getUpdateDate()));
                    d.setPositionStr(PositionEnum.getTypesName(entity.getPosition()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(entity.getWhetherValid()));
                });
                return new Result<StaffRegistrationDto>().setSuccess(staffRegistrationDto) ;
            }else return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    private void getBaseIntoDtoPredicate(List<Predicate> predicateList, BaseIntoDto intoDto,Root<StaffUserEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder){
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
//--------------------------------------------------------------------
    public Result<List<StaffUserDto>> findStaffUserEntitiesByPosition(){
        try {
            List<StaffUserEntity> staffUserEntityList1 = staffUserRepository.findStaffUserEntitiesByPositionAndWhetherValid(PositionEnum.ADMINISTRATOR.getType(), WhetherValidEnum.VALID.getType());
            List<StaffUserEntity> staffUserEntityList2 = staffUserRepository.findStaffUserEntitiesByPositionAndWhetherValid(PositionEnum.GENERAL_STAFF.getType(), WhetherValidEnum.VALID.getType());
            staffUserEntityList1.addAll(staffUserEntityList2);
            List<StaffUserDto> staffUserDtoList = staffUserEntityList1.stream().map(e -> {
                StaffUserDto staffUserDto = MyBeanUtils.copyPropertiesAndResTarget(e, StaffUserDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                    d.setPositionStr(PositionEnum.getTypesName(e.getPosition()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                });
                return staffUserDto;
            }).collect(Collectors.toList());
            return new Result<List<StaffUserDto>>().setSuccess(staffUserDtoList);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }
    public Result<StaffUserDto> login(StaffUserDto staffUserDto){
        try {

            StaffUserEntity staffUserEntity = staffUserRepository.findStaffUserEntityByPhoneNumberAndPasswordAndPositionAndWhetherValid(staffUserDto.getPhoneNumber(),DigestUtils.md5DigestAsHex(staffUserDto.getPassword().getBytes()),PositionEnum.ADMINISTRATOR.getType(), WhetherValidEnum.VALID.getType());
            StaffUserDto dto = MyBeanUtils.copyPropertiesAndResTarget(staffUserEntity, StaffUserDto::new, d -> {
                d.setCreateDateStr(MyDateUtil.getDateAndTime(staffUserEntity.getCreateDate()));
                d.setUpdateDateStr(MyDateUtil.getDateAndTime(staffUserEntity.getUpdateDate()));
                d.setPositionStr(PositionEnum.getTypesName(staffUserEntity.getPosition()));
                d.setWhetherValidStr(WhetherValidEnum.getTypesName(staffUserEntity.getWhetherValid()));
            });
            return new Result<StaffUserDto>().setSuccess(dto);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }
}
