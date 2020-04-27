package com.sc.base.repository.work;

import com.sc.base.entity.work.WorkEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<WorkEntity,String>, JpaSpecificationExecutor<WorkEntity> {
    WorkEntity findWorkEntityById(String id);
    Page<WorkEntity> findAll(Specification specification, Pageable pageable);
}
