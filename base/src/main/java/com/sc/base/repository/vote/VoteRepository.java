package com.sc.base.repository.vote;

import com.sc.base.entity.vote.VoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<VoteEntity,String> {

}
