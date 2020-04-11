package com.sc.base.repository.user;


import com.sc.base.entity.user.ResidentUserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentUserRepository extends JpaRepository<ResidentUserEntity,String>, JpaSpecificationExecutor<ResidentUserEntity> {

    ResidentUserEntity findResidentUserEntityById(String id);
    ResidentUserEntity findResidentUserEntityByPhoneNumber(String phoneNumber);
    ResidentUserEntity findResidentUserEntityByOpenId(String openId);
    Page<ResidentUserEntity> findAll(Specification specification, Pageable pageable);
}
