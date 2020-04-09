package com.sc.resident.service.car;

import com.sc.base.entity.car.CarEntity;
import com.sc.base.repository.car.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public CarEntity findCarEnityById(String id){
        return carRepository.findCarEntityById(id);
    }
}
