package com.sc.base.repository.repair;

import com.sc.base.entity.repair.RepairEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RepairRepository extends JpaRepository<RepairEntity,String>, JpaSpecificationExecutor<RepairEntity> {
    RepairEntity findRepairEntityById(String id);
    Page<RepairEntity> findAll(Specification specification, Pageable pageable);
}
