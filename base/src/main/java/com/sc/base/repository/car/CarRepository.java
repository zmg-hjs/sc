package com.sc.base.repository.car;

import com.sc.base.entity.car.CarEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<CarEntity,String> {

    CarEntity findCarEntityById(String id);
    List<CarEntity> findCarEntitiesByCarpoolStatusOrderByCreateDateDesc(String carpoolStatus);
    List<CarEntity> findCarEntitiesByIdInOrderByCreateDateDesc(List<String> idList);
    Page<CarEntity> findAll(Specification specification, Pageable pageable);
}
