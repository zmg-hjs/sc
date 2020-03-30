package com.sc.resident.repository.user;



import com.sc.entity.ResidentRegistrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentRegistrationRepository extends JpaRepository<ResidentRegistrationEntity,String> {

    ResidentRegistrationEntity findResidentRegistrationEntityByIdNumber(String idNumber);
}
