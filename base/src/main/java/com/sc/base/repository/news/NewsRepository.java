package com.sc.base.repository.news;

import com.sc.base.entity.news.NewsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity,String> {
    NewsEntity findNewsEntityById(String id);
    Page<NewsEntity> findAll(Specification specification, Pageable pageable);
}
