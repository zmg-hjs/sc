package com.sc.base.repository.user;


import com.sc.base.entity.StaffUserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffUserRepository extends JpaRepository<StaffUserEntity,String>, JpaSpecificationExecutor<StaffUserEntity> {

    StaffUserEntity findStaffUserEntityById(String id);
    StaffUserEntity findStaffUserEntityByOpenId(String openId);

    Page<StaffUserEntity> findAll(Pageable pageable);
}
