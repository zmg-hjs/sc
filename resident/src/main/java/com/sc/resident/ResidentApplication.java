package com.sc.resident;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.sc.entity"})
public class ResidentApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ResidentApplication.class, args);
    }

}
