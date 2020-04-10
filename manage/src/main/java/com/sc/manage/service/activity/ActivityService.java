package com.sc.manage.service.activity;

import com.sc.base.repository.activity.ActivityRepository;
import com.sc.base.repository.enroll.EnrollRepository;
import com.sc.base.repository.vote.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private EnrollRepository enrollRepository;
    @Autowired
    private VoteRepository voteRepository;

    /**
     * 分页条件查询
     * @param indexIntoDto
     * @return
     */
    /*public Result<List<ManageNewsIndexOutDto>> ManageNewsIndex(ManageNewsIndexIntoDto indexIntoDto){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(indexIntoDto.getPage()-1, indexIntoDto.getLimit(),sort);
            //条件
            Page<NewsEntity> page = newsRepository.findAll(new Specification<NewsEntity>() {
                @Override
                public Predicate toPredicate(Root<NewsEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(indexIntoDto.getTitle())){
                        predicateList.add(criteriaBuilder.like(root.get("title"),"%"+indexIntoDto.getTitle()+"%"));
                    }
                    if (StringUtils.isNotBlank(indexIntoDto.getStaffUserActualName())){
                        predicateList.add(criteriaBuilder.like(root.get("staffUserActualName"),"%"+indexIntoDto.getStaffUserActualName()+"%"));
                    }
                    getBaseIntoDtoPredicate(predicateList,(BaseIntoDto) indexIntoDto,root,criteriaQuery,criteriaBuilder);
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            List<ManageNewsIndexOutDto> manageNewsIndexOutDtoList = page.getContent().stream().map(e -> {
                ManageNewsIndexOutDto outDto = MyBeanUtils.copyPropertiesAndResTarget(e, ManageNewsIndexOutDto::new);
                outDto.setCreateDateStr(MyDateUtil.getDateAndTime(e.getCreateDate()));
                outDto.setUpdateDateStr(MyDateUtil.getDateAndTime(e.getUpdateDate()));
                outDto.setWhetherValidStr(WhetherValidEnum.getTypesName(e.getWhetherValid()));
                return outDto;
            }).collect(Collectors.toList());
            return new Result<List<ManageNewsIndexOutDto>>().setSuccess(manageNewsIndexOutDtoList).setCount(page.getTotalElements());
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }
*/

}
