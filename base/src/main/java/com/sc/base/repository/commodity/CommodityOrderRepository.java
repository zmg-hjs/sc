package com.sc.base.repository.commodity;

import com.sc.base.entity.commodity.CommodityOrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommodityOrderRepository extends JpaRepository<CommodityOrderEntity,String> {

    CommodityOrderEntity findCommodityOrderEntityById(String id);
    Page<CommodityOrderEntity> findAll(Specification specification, Pageable pageable);
}
