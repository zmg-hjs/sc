package com.sc.base.repository.car;

import com.sc.base.entity.car.CarEntity;
import com.sc.base.entity.car.CarpoolEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarpoolRepository extends JpaRepository<CarpoolEntity,String> {

    CarpoolEntity findCarpoolEntityById(String id);
    List<CarpoolEntity> findCarpoolEntitiesByResidentCarId(String residentCarId);
    List<CarpoolEntity> findCarpoolEntitiesByResidentCarIdAndCarpoolStatus(String residentCarId,String carpoolStatus);
    List<CarpoolEntity> findCarpoolEntitiesByResidentCarIdAndCarpoolUserId(String carId,String residentUserId);
    List<CarpoolEntity> findCarpoolEntitiesByResidentCarIdAndResidentUserId(String residentCarId,String residentUserId);
    CarpoolEntity findCarpoolEntityByIdIn(List<String> idList);
    List<CarpoolEntity> findCarpoolEntitiesByResidentUserIdAndCarpoolStatus(String id,String carpoolStatus);
    List<CarpoolEntity> findCarpoolEntitiesByCarpoolUserIdAndCarpoolStatus(String id,String carpoolStatus);

    List<CarpoolEntity> findAll();
}
