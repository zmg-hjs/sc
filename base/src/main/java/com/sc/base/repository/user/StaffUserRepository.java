package com.sc.base.repository.user;


import com.sc.base.entity.user.StaffUserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffUserRepository extends JpaRepository<StaffUserEntity,String>, JpaSpecificationExecutor<StaffUserEntity> {

    StaffUserEntity findStaffUserEntityById(String id);
    StaffUserEntity findStaffUserEntityByUsernameAndPasswordAndPositionAndWhetherValid(String username,String password,String position,String whetherValid);
    StaffUserEntity findStaffUserEntityByPhoneNumberAndPasswordAndPositionAndWhetherValid(String phoneNumber,String password,String position,String whetherValid);

    StaffUserEntity findStaffUserEntityByOpenId(String openId);
    StaffUserEntity findStaffUserEntityByPhoneNumber(String phoneNumber);
    List<StaffUserEntity> findStaffUserEntitiesByPositionAndWhetherValid(String position,String whetherValid);

    //分页查询
    Page<StaffUserEntity> findAll(Specification specification, Pageable pageable);

    //测试可行，注意：like 需要加通配符%或_
    Page<StaffUserEntity> findStaffUserEntityByUsernameLikeOrActualNameLike(String username,String actualName,Pageable pageable);
}
