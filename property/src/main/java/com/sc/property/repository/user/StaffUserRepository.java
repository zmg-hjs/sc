package com.sc.property.repository.user;


import com.sc.entity.StaffUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffUserRepository extends JpaRepository<StaffUserEntity,String> {

    StaffUserEntity findUserEntityById(String id);
    StaffUserEntity findUserEntityByOpenId(String openId);

}
