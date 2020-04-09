package com.sc.base.repository.car;

import com.sc.base.entity.car.CarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<CarEntity,String> {

    CarEntity findCarEntityById(String id);

}
