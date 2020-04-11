package com.sc.base.repository.activity;


import com.sc.base.entity.activity.ActivityEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<ActivityEntity,String>, JpaSpecificationExecutor<ActivityEntity> {

    ActivityEntity findActivityEntityById(String id);

    Page<ActivityEntity> findAll(Specification specification,Pageable pageable);
}
