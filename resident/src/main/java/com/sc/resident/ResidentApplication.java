package com.sc.resident;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.sc.base.entity"})
@EnableJpaRepositories(basePackages = {"com.sc.base.repository"})
public class ResidentApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ResidentApplication.class, args);
    }

}
