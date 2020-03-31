package com.sc.base.repository.user;


import com.sc.base.entity.user.StaffRegistrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRegistrationRepository extends JpaRepository<StaffRegistrationEntity,String> {

    StaffRegistrationEntity findStaffRegistrationEntityByIdNumber(String idNumber);
}
