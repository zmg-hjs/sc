package com.sc.base.repository.user;



import com.sc.base.entity.user.ResidentRegistrationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentRegistrationRepository extends JpaRepository<ResidentRegistrationEntity,String> {

    ResidentRegistrationEntity findResidentRegistrationEntityByPhoneNumber(String phoneNumber);
    ResidentRegistrationEntity findResidentRegistrationEntityById(String id);

    Page<ResidentRegistrationEntity> findAll(Specification specification, Pageable pageable);

}
