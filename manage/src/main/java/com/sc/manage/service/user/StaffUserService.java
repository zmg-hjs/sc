package com.sc.manage.service.user;

import com.sc.base.entity.StaffUserEntity;
import com.sc.base.repository.user.StaffUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffUserService {

    @Autowired
    private StaffUserRepository staffUserRepository;

    public List findAll(){
        Pageable pageable = PageRequest.of(0, 1);
        Page<StaffUserEntity> page = staffUserRepository.findAll(pageable);
        System.out.println(page.getTotalPages());
        System.out.println(page.getTotalElements());
        List<StaffUserEntity> content = page.getContent();
        System.out.println(content.toString());
        return null;
    }

}
