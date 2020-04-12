package com.sc.manage.service.car;

import com.sc.base.dto.car.CarpoolDto;
import com.sc.base.dto.car.ManageCarIndexOutDto;
import com.sc.base.dto.common.BaseIntoDto;
import com.sc.base.dto.car.ManageCarIndexIntoDto;
import com.sc.base.dto.car.CarDto;
import com.sc.base.entity.car.CarEntity;
import com.sc.base.entity.car.CarpoolEntity;
import com.sc.base.enums.CarpoolStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.car.CarRepository;
import com.sc.base.repository.car.CarpoolRepository;
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
public class CarService {

    @Autowired
    private CarRepository carRepository;
    @Autowired
    private CarpoolRepository carpoolRepository;


    /**
     * 分页条件查询
     * @param indexIntoDto
     * @return
     */
    public Result<List<ManageCarIndexOutDto>> ManageCarIndex(ManageCarIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(indexIntoDto.getPage()-1, indexIntoDto.getLimit(),sort);
            //条件
            Page<CarEntity> page = carRepository.findAll(new Specification<CarEntity>() {
                @Override
                public Predicate toPredicate(Root<CarEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(indexIntoDto.getUserActualName())){
                        predicateList.add(criteriaBuilder.like(root.get("userActualName"),"%"+indexIntoDto.getUserActualName()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getStartPosition())){
                        predicateList.add(criteriaBuilder.like(root.get("starting"),"%"+indexIntoDto.getStartPosition()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getDestination())){
                        predicateList.add(criteriaBuilder.like(root.get("destination"),"%"+indexIntoDto.getDestination()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getCarNum())){
                        predicateList.add(criteriaBuilder.like(root.get("carNum"),"%"+indexIntoDto.getCarNum()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getTelephone())){
                        predicateList.add(criteriaBuilder.equal(root.get("telephone"),indexIntoDto.getTelephone()));
                    }
                    getBaseIntoDtoPredicate(predicateList,(BaseIntoDto) indexIntoDto,root,criteriaQuery,criteriaBuilder);
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ManageCarIndexOutDto> manageCarIndexOutDtoList = page.getContent().stream().map(e -> {
                ManageCarIndexOutDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageCarIndexOutDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                outDto.setCarpoolStatusStr(CarpoolStatusEnum.getTypesName(e.getCarpoolStatus()));
                outDto.setStartTimeStr(MyDateUtil.getDateAndTime(e.getStartTime()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageCarIndexOutDto>>().setSuccess(manageCarIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    public Result findCarEntityById(CarDto dto){
        try {
            CarEntity entity = carRepository.findCarEntityById(dto.getId());
            if (entity!=null){
                CarDto carDto = MyBeanUtils.copyPropertiesAndResTarget(entity, CarDto::new, d -> {
                    d.setCreateDateStr(MyDateUtil.getDateAndTime(entity.getCreateDate()));
                    d.setUpdateDateStr(MyDateUtil.getDateAndTime(entity.getUpdateDate()));
                    d.setStartTimeStr(MyDateUtil.getDateAndTime(entity.getStartTime()));
                    d.setCarpoolStatusStr(CarpoolStatusEnum.getTypesName(entity.getCarpoolStatus()));
                    d.setWhetherValidStr(WhetherValidEnum.getTypesName(entity.getWhetherValid()));
                });
                return new Result().setSuccess(carDto);
            }else {
                return Result.createSimpleFailResult();
            }
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    public Result findCarpoolEntitiesById(CarDto dto){
        try {
            List<CarpoolEntity> carpoolEntityList = carpoolRepository.findCarpoolEntitiesByResidentCarId(dto.getId());
            if (carpoolEntityList!=null&&carpoolEntityList.size()>0){
                List<CarpoolDto> carpoolDtoList = carpoolEntityList.stream().map(e -> {
                    CarpoolDto carpoolDto = MyBeanUtils.copyPropertiesAndResTarget(e, CarpoolDto::new);
                    carpoolDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                    carpoolDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                    carpoolDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                    carpoolDto.setCarpoolStatusStr(CarpoolStatusEnum.getTypesName(e.getCarpoolStatus()));
                    return carpoolDto;
                }).collect(Collectors.toList());
                return new Result().setSuccess(carpoolDtoList);
            }else {
                return Result.createSimpleFailResult();
            }
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }






    private void getBaseIntoDtoPredicate(List<Predicate> predicateList, BaseIntoDto intoDto, Root<CarEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder){
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


}
