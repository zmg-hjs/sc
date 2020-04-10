package com.sc.base.repository.enroll;

import com.sc.base.entity.enroll.EnrollEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollRepository extends JpaRepository<EnrollEntity,String> {

}
