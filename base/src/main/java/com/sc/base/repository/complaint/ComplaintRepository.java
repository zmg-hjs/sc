package com.sc.base.repository.complaint;

import com.sc.base.entity.complaint.ComplaintEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends JpaRepository<ComplaintEntity,String> {

    ComplaintEntity findComplaintEntityById(String id);
    Page<ComplaintEntity> findAll(Specification specification, Pageable pageable);
}
