package com.sc.resident.service.car;

import com.sc.base.dto.car.CarDto;
import com.sc.base.entity.car.CarEntity;
import com.sc.base.entity.car.CarpoolEntity;
import com.sc.base.entity.user.ResidentUserEntity;
import com.sc.base.enums.CarpoolStatusEnum;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.car.CarRepository;
import com.sc.base.repository.car.CarpoolRepository;
import com.sc.base.repository.user.ResidentUserRepository;
import myString.MyStringUtils;
import mydate.MyDateUtil;
import myspringbean.MyBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vo.Result;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;
    @Autowired
    private ResidentUserRepository residentUserRepository;
    @Autowired
    private CarpoolRepository carpoolRepository;

    /**
     * 添加拼车信息
     * @param carDto
     * @return
     */
    public Result addCarAndCarpool(CarDto carDto){
        try {
            Date date = new Date();
            CarEntity carEntity = new CarEntity();
            carEntity.setId(MyStringUtils.getIdDateStr("residentCar"));
            carEntity.setUserId(carDto.getUserId());
            carEntity.setTelephone(carDto.getTelephone());
            carEntity.setCarNum(carDto.getCarNum());
            carEntity.setStartPosition(carDto.getStartPosition());
            carEntity.setDestination(carDto.getDestination());
            carEntity.setStartTime(MyDateUtil.dateString3Date(carDto.getStartTimeStr()));
            carEntity.setPeopleNum(carDto.getPeopleNum());
            carEntity.setPeopleNow(carDto.getPeopleNum());
            carEntity.setCarpoolStatus(CarpoolStatusEnum.IN_PROGRESS.getType());
            carEntity.setCreateDate(date);
            carEntity.setUpdateDate(date);
            carEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
            ResidentUserEntity residentUserEntity = residentUserRepository.findResidentUserEntityById(carDto.getUserId());
            carEntity.setUserActualName(residentUserEntity.getActualName());
            carRepository.save(carEntity);
            //carpool
            CarpoolEntity carpoolEntity = new CarpoolEntity();
            carpoolEntity.setId(MyStringUtils.getIdDateStr("carpool"));
            carpoolEntity.setCreateDate(date);
            carpoolEntity.setUpdateDate(date);
            carpoolEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
            carpoolEntity.setCarpoolStatus(CarpoolStatusEnum.IN_PROGRESS.getType());
            carpoolEntity.setResidentCarId(carEntity.getId());
            carpoolEntity.setResidentUserId(carEntity.getUserId());
            carpoolEntity.setResidentUserActualName(carEntity.getUserActualName());
            carpoolEntity.setCarpoolUserId(carEntity.getUserId());
            carpoolEntity.setCarpoolUserActualName(carEntity.getUserActualName());
            carpoolRepository.save(carpoolEntity);
            return  new Result().setSuccess(carEntity);
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 查找拼车信息页面
     * 无传入参数
     * @param carDto
     * @return
     */
    public Result<List<CarDto>> findCarEntitiesByCarpoolStatus(CarDto carDto){
        try {
            List<CarEntity> carEntityList = carRepository.findCarEntitiesByCarpoolStatus(CarpoolStatusEnum.IN_PROGRESS.getType());
            if (carEntityList!=null&&carEntityList.size()>0){
                List<CarDto> carDtoList = carEntityList.stream().map(e -> {
                    return MyBeanUtils.copyPropertiesAndResTarget(e, CarDto::new, d -> {
                        d.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                        d.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                        d.setStartTimeStr(MyDateUtil.getDateAndTime(e.getStartTime()));
                        d.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                        d.setCarpoolStatusStr(CarpoolStatusEnum.getTypesName(e.getCarpoolStatus()));
                    });
                }).collect(Collectors.toList());
                return new Result<List<CarDto>>().setSuccess(carDtoList);
            }
            else return Result.createSimpleSuccessResult().setCustomMessage("数据为空");

        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 我的拼车信息
     * 1.传入参数userId，carpoolStatus
     * @param carDto
     * @return
     */
    public Result<List<CarDto>> findAllByCarpoolStatus(CarDto carDto){
        try {
            List<CarpoolEntity> carpoolEntityList = carpoolRepository.findCarpoolEntitiesByCarpoolUserIdAndCarpoolStatus(carDto.getUserId(), carDto.getCarpoolStatus());
            List<String> ResidentCarIdList = carpoolEntityList.stream().map(e -> {
                return e.getResidentCarId();
            }).collect(Collectors.toList());
            List<CarEntity> carEntityList = carRepository.findCarEntitiesByIdIn(ResidentCarIdList);
            if (carEntityList!=null&&carEntityList.size()>0){
                List<CarDto> carDtoList = carEntityList.stream().map(e -> {
                    return MyBeanUtils.copyPropertiesAndResTarget(e, CarDto::new, d -> {
                        d.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                        d.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                        d.setStartTimeStr(MyDateUtil.getDateAndTime(e.getStartTime()));
                        d.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                        d.setCarpoolStatusStr(CarpoolStatusEnum.getTypesName(e.getCarpoolStatus()));
                    });
                }).collect(Collectors.toList());
                return new Result<List<CarDto>>().setSuccess(carDtoList);
            }else return Result.createSimpleSuccessResult().setCustomMessage("数据为空");
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }


    /**
     * 报名参与拼车
     * 1.carId,userId,carpoolNumber
     * @param carDto
     * @return
     */
    public Result addCarpoolEntity(CarDto carDto){
        try {
            CarEntity carEntity = carRepository.findCarEntityById(carDto.getId());
            ResidentUserEntity residentUserEntity = residentUserRepository.findResidentUserEntityById(carDto.getUserId());
            //carpool
            Date date = new Date();
            CarpoolEntity carpoolEntity = new CarpoolEntity();
            carpoolEntity.setId(MyStringUtils.getIdDateStr("carpool"));
            carpoolEntity.setCreateDate(date);
            carpoolEntity.setUpdateDate(date);
            carpoolEntity.setWhetherValid(WhetherValidEnum.VALID.getType());
            carpoolEntity.setCarpoolStatus(CarpoolStatusEnum.IN_PROGRESS.getType());
            carpoolEntity.setResidentCarId(carEntity.getId());
            carpoolEntity.setResidentUserId(carEntity.getUserId());
            carpoolEntity.setResidentUserActualName(carEntity.getUserActualName());
            carpoolEntity.setCarpoolUserId(residentUserEntity.getId());
            carpoolEntity.setCarpoolUserActualName(residentUserEntity.getActualName());
            carpoolEntity.setCarpoolNumber(carDto.getCarpoolNumber());
            carpoolRepository.save(carpoolEntity);
            //现有人数加一
            carEntity.setPeopleNow(carEntity.getPeopleNow()-carDto.getCarpoolNumber());
            carRepository.save(carEntity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    /**
     * 取消参与拼车
     * 1.carId,userId
     * @param carDto
     * @return
     */
    public Result cancel(CarDto carDto){
        try {
            CarEntity carEntity = carRepository.findCarEntityById(carDto.getId());
            if (carEntity!=null){
                if (carEntity.getUserId().equals(carDto.getUserId())){
                    carEntity.setCarpoolStatus(CarpoolStatusEnum.CANCEL.getType());
                    carRepository.save(carEntity);
                    List<CarpoolEntity> carpoolEntityList = carpoolRepository.findCarpoolEntitiesByResidentCarId(carDto.getId());
                    carpoolEntityList.stream().forEach(e->{
                        e.setCarpoolStatus(CarpoolStatusEnum.CANCEL.getType());
                        carpoolRepository.save(e);
                    });
                }else {
                    List<CarpoolEntity> carpoolEntityList = carpoolRepository.findCarpoolEntitiesByResidentCarIdAndResidentUserId(carDto.getId(), carDto.getUserId());
                    carpoolEntityList.stream().filter(e->{
                        return CarpoolStatusEnum.IN_PROGRESS.getType().equals(e.getCarpoolStatus());
                    }).forEach(e->{
                        e.setCarpoolStatus(CarpoolStatusEnum.CANCEL.getType());
                        carpoolRepository.save(e);
                        carEntity.setPeopleNow(carEntity.getPeopleNow()+e.getCarpoolNumber());
                        carRepository.save(carEntity);
                    });
                }
            }
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
