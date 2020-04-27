package com.sc.property.service.work;

import com.sc.base.dto.work.WorkDto;
import com.sc.base.entity.work.WorkEntity;
import com.sc.base.repository.work.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vo.Result;

import java.util.Date;

@Service
public class WorkService {
    @Autowired
    private WorkRepository workRepository;

    public Result updateWorkStatusById(WorkDto workDto){
        try {
            WorkEntity entity = workRepository.findWorkEntityById(workDto.getId());
            entity.setWorkStatus(workDto.getWorkStatus());
            entity.setUpdateDate(new Date());
            workRepository.save(entity);
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }
}
