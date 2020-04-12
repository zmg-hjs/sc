package com.sc.resident.controller.car;

import com.sc.base.dto.car.CarDto;
import com.sc.resident.service.car.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vo.Result;


@Controller
@RequestMapping("sc/resident/car")
public class CarController {
    @Autowired
    CarService carService;

    @RequestMapping(value ="/add",method = RequestMethod.POST)
    @ResponseBody
    public Result addCarAndCarpool(@RequestBody CarDto carDto){
        try {
            Result result = carService.addCarAndCarpool(carDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
    @RequestMapping(value ="/find",method = RequestMethod.POST)
    @ResponseBody
    public Result findCarEntitiesByCarpoolStatus(@RequestBody CarDto carDto){
        try {
            Result result = carService.findCarEntitiesByCarpoolStatus(carDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
    @RequestMapping(value ="/my",method = RequestMethod.POST)
    @ResponseBody
    public Result findAllByCarpoolStatus(@RequestBody CarDto carDto){
        try {
            Result result = carService.findAllByCarpoolStatus(carDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
    @RequestMapping(value ="/addCarpool",method = RequestMethod.POST)
    @ResponseBody
    public Result addCarpoolEntity(@RequestBody CarDto carDto){
        try {
            Result result = carService.addCarpoolEntity(carDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
    @RequestMapping(value ="/cancel",method = RequestMethod.POST)
    @ResponseBody
    public Result cancel(@RequestBody CarDto carDto){
        try {
            Result result = carService.cancel(carDto);
            return result;
        }catch (Exception e){
            return Result.createSystemErrorResult();
        }
    }
}
