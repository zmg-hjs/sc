package com.sc.property;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EntityScan(basePackages = {"com.sc.base.entity"})
@EnableJpaRepositories(basePackages = {"com.sc.base.repository"})
@EnableScheduling
public class PropertyApplication {

    public static void main(String[] args) {
        SpringApplication.run(PropertyApplication.class, args);
    }

}
