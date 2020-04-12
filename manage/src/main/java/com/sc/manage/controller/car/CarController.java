package com.sc.manage.controller.car;

import com.sc.base.dto.car.CarDto;
import com.sc.base.dto.car.ManageCarIndexIntoDto;
import com.sc.manage.service.car.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import vo.Result;

@Controller
@RequestMapping("/sc/manage/car")
public class CarController {

    @Autowired
    private CarService carService;

    @RequestMapping(value = "/manage_car_index_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageCarIndexPage(ModelAndView modelAndView){
        modelAndView.setViewName("car/car_index");
        return modelAndView;
    }
    @RequestMapping(value = "/manage_car_index_data",method = RequestMethod.GET)
    @ResponseBody
    public Result ManageCarIndexData(ManageCarIndexIntoDto manageCarIndexIntoDto){
        return carService.ManageCarIndex(manageCarIndexIntoDto);
    }

    @RequestMapping(value = "/manage_car_find_page",method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView ManageCarFindPage(ModelAndView modelAndView, CarDto carDto){
        modelAndView.setViewName("car/car_find");
        modelAndView.addObject("carDto",carService.findCarEntityById(carDto).getData());
        modelAndView.addObject("carpoolDtoList",carService.findCarpoolEntitiesById(carDto).getData());
        return modelAndView;
    }

}
