package com.sc.property.repository.user;


import com.sc.entity.StaffRegistrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRegistrationRepository extends JpaRepository<StaffRegistrationEntity,String> {

    StaffRegistrationEntity findUserEntityByIdNumber(String id);
}
