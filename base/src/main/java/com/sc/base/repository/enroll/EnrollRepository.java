package com.sc.base.repository.enroll;

import com.sc.base.entity.enroll.EnrollEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollRepository extends JpaRepository<EnrollEntity,String> {

    EnrollEntity findEnrollEntityById(String id);
    List<EnrollEntity> findEnrollEntitiesByActivityIdOrderByCreateDateDesc(String activityId );
    List<EnrollEntity> findEnrollEntitiesByResidentUserIdAndAuditStatus(String residentUserId,String auditStatus );
    List<EnrollEntity> findEnrollEntitiesByActivityIdAndAuditStatusOrderByVoteNumberDesc(String activityId,String auditStatus );
    Page<EnrollEntity> findAll(Specification specification, Pageable pageable);

}
