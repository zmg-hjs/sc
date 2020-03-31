package com.sc.base.repository.user;


import com.sc.base.entity.user.StaffUserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffUserRepository extends JpaRepository<StaffUserEntity,String>, JpaSpecificationExecutor<StaffUserEntity> {

    StaffUserEntity findStaffUserEntityById(String id);
    StaffUserEntity findStaffUserEntityByOpenId(String openId);

    //分页查询
    Page<StaffUserEntity> findAll(Specification specification, Pageable pageable);

    //测试可行，注意：like 需要加通配符%或_
    Page<StaffUserEntity> findStaffUserEntityByUsernameLikeOrActualNameLike(String username,String actualName,Pageable pageable);
}
