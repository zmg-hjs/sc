package com.sc.property.repository;


import com.sc.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,String> {

    UserEntity findUserEntityById(String id);
    UserEntity findUserEntityByOpenId(String openId);

}
