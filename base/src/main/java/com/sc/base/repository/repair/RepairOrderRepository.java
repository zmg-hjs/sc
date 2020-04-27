package com.sc.base.repository.repair;

import com.sc.base.entity.repair.RepairOrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairOrderRepository extends JpaRepository<RepairOrderEntity,String>, JpaSpecificationExecutor<RepairOrderEntity> {
    RepairOrderEntity findRepairOrderEntityById(String id);
    Page<RepairOrderEntity> findAll(Specification specification, Pageable pageable);
}
