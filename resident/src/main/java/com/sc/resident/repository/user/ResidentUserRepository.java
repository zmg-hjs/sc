package com.sc.resident.repository.user;


import com.sc.entity.ResidentUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentUserRepository extends JpaRepository<ResidentUserEntity,String> {

    ResidentUserEntity findResidentUserEntityById(String id);
    ResidentUserEntity findResidentUserEntityByOpenId(String openId);

}
