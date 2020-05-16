package com.sc.base.repository.payment;

import com.sc.base.entity.payment.PaymentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity,String>, JpaSpecificationExecutor<PaymentEntity> {
    PaymentEntity findPaymentEntityById(String id);
    Page<PaymentEntity> findAll(Specification specification, Pageable pageable);
}
