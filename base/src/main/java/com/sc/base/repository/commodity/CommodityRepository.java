package com.sc.base.repository.commodity;

import com.sc.base.entity.commodity.CommodityEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommodityRepository extends JpaRepository<CommodityEntity,String> {

    CommodityEntity findCommodityEntityById(String id);
    Page<CommodityEntity> findAll(Specification specification, Pageable pageable);
}
