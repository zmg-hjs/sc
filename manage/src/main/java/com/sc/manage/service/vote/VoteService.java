package com.sc.manage.service.vote;

import com.sc.base.dto.vote.VoteDto;
import com.sc.base.entity.vote.VoteEntity;
import com.sc.base.enums.WhetherValidEnum;
import com.sc.base.repository.vote.VoteRepository;
import mydate.MyDateUtil;
import myspringbean.MyBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vo.Result;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public Result<List<VoteDto>> findAll(String enrollId){
        try {
            List<VoteEntity> voteEntityList = voteRepository.findVoteEntitiesByEnrollId(enrollId);
            if (voteEntityList!=null){
                List<VoteDto> voteDtoList = voteEntityList.stream().map(e -> {
                    VoteDto voteDto = MyBeanUtils.copyPropertiesAndResTarget(e, VoteDto::new, d -> {
                        d.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                        d.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                        d.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                    });
                    return voteDto;
                }).collect(Collectors.toList());
                return new Result<List<VoteDto>>().setSuccess(voteDtoList);
            }else  return Result.createSimpleFailResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }

    }

}
