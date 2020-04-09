package com.sc.base.repository.user;


import com.sc.base.entity.user.StaffRegistrationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRegistrationRepository extends JpaRepository<StaffRegistrationEntity,String>, JpaSpecificationExecutor<StaffRegistrationEntity> {

    StaffRegistrationEntity findStaffRegistrationEntityByIdNumber(String idNumber);
    StaffRegistrationEntity findStaffRegistrationEntityById(String id);
    StaffRegistrationEntity findStaffRegistrationEntityByPhoneNumber(String phoneNumber);

    //分页查询
    Page<StaffRegistrationEntity> findAll(Specification specification, Pageable pageable);
}
