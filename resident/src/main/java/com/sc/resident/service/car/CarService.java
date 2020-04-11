package com.sc.resident.service.car;

import com.sc.base.dto.car.ManageCarIndexIntoDto;
import com.sc.base.entity.car.CarEntity;
import com.sc.base.repository.car.CarRepository;
import myString.MyStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vo.Result;

/**
 * Package: com.sc.resident.service.car
 * <p>
 * Description： TODO
 * <p>
 * Author: hjscode
 * <p>
 * Date: Created in 2020/4/2 13:20
 */
@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    /**
     * 查询拼车信息(通过拼车id)
     * @param id
     * @return
     */
    public CarEntity findCarEnityById(String id){
        return carRepository.findCarEntityById(id);
    }

    /**
     * 添加拼车信息
     * @param manageCarIndexIntoDto
     * @return
     */
    public Result addCarEntity(ManageCarIndexIntoDto manageCarIndexIntoDto){

        CarEntity carEntity = new CarEntity();
        carEntity.setId(MyStringUtils.getIdDateStr("residentCar"));
        carEntity.setCarNum(manageCarIndexIntoDto.getCarNum());
        carEntity.setDestination(manageCarIndexIntoDto.getDestination());
        carEntity.setTime(manageCarIndexIntoDto.getTime());
        carEntity.setStarting(manageCarIndexIntoDto.getStarting());
        carEntity.setTelephone(manageCarIndexIntoDto.getTelephone());
        carEntity.setPeopleNum(manageCarIndexIntoDto.getPeopleNum());
        carEntity.setUserId(manageCarIndexIntoDto.getUserId());
        System.out.print(carEntity);
        carRepository.saveAndFlush(carEntity);;
        return  new Result().setSuccess(carEntity);
    }
}
