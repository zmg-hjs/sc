package com.sc.resident.scheduled;

import com.sc.base.entity.car.CarEntity;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import vo.Result;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CarScheduled {

    @Autowired
    private CarpoolRepository carpoolRepository;
    @Autowired
    private CarRepository carRepository;

    @Scheduled(cron = "0 7 14 * * ?")
    public Result carScheduled(){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            String dateStr = MyDateUtil.getDateString(new Date())+" 23:59:59";
            Page<CarEntity> page = carRepository.findAll(new Specification<CarEntity>() {
                @Override
                public Predicate toPredicate(Root<CarEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(dateStr)){
                        predicateList.add(criteriaBuilder.lessThanOrEqualTo(root.get("startTime"),MyDateUtil.dateString3Date(dateStr)));
                        predicateList.add(criteriaBuilder.equal(root.get("carpoolStatus"),CarpoolStatusEnum.IN_PROGRESS.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            page.getContent().stream().forEach(carEntity->{
                carEntity.setCarpoolStatus(CarpoolStatusEnum.COMPLETE.getType());
                carRepository.save(carEntity);
                carpoolRepository.findCarpoolEntitiesByResidentCarId(carEntity.getId()).stream().forEach(carpoolEntity->{
                    carpoolEntity.setCarpoolStatus(CarpoolStatusEnum.COMPLETE.getType());
                    carpoolRepository.save(carpoolEntity);
                });
            });
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
