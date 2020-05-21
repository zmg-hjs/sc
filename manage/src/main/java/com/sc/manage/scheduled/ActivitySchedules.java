package com.sc.manage.scheduled;

import com.sc.base.entity.activity.ActivityEntity;
import com.sc.base.enums.ActivityStatusEnum;
import com.sc.base.repository.activity.ActivityRepository;
import mydate.MyDateUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import vo.Result;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;

@Component
public class ActivitySchedules {

    @Autowired
    private ActivityRepository activityRepository;

    @Scheduled(cron = "20 0 8 * * ?")
    public Result unpublishedScheduled(){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            String dateStr = MyDateUtil.getDateString(new Date())+" 23:59:59";
            Page<ActivityEntity> page = activityRepository.findAll(new Specification<ActivityEntity>() {
                @Override
                public Predicate toPredicate(Root<ActivityEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(dateStr)){
                        predicateList.add(criteriaBuilder.lessThanOrEqualTo(root.get("activityStartTime"),MyDateUtil.dateString3Date(dateStr)));
                        predicateList.add(criteriaBuilder.equal(root.get("activityStatus"), ActivityStatusEnum.UNPUBLISHED.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            page.getContent().stream().forEach(e->{
                ActivityEntity entity = activityRepository.findActivityEntityById(e.getActivityStatus());
                entity.setActivityStatus(ActivityStatusEnum.ENROLMENT.getType());
                activityRepository.save(entity);
            });
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }
    @Scheduled(cron = "20 0 18 * * ?")
    public Result enrolmentScheduled(){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            String dateStr = MyDateUtil.getDateString(new Date())+" 23:59:59";
            Page<ActivityEntity> page = activityRepository.findAll(new Specification<ActivityEntity>() {
                @Override
                public Predicate toPredicate(Root<ActivityEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(dateStr)){
                        predicateList.add(criteriaBuilder.lessThanOrEqualTo(root.get("activityEndTime"),MyDateUtil.dateString3Date(dateStr)));
                        predicateList.add(criteriaBuilder.equal(root.get("activityStatus"), ActivityStatusEnum.ENROLMENT.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            page.getContent().stream().forEach(e->{
                ActivityEntity entity = activityRepository.findActivityEntityById(e.getActivityStatus());
                entity.setActivityStatus(ActivityStatusEnum.IN_AUDIT.getType());
                activityRepository.save(entity);
            });
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    @Scheduled(cron = "30 0 8 * * ?")
    public Result inAuditScheduled(){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            String dateStr = MyDateUtil.getDateString(new Date())+" 23:59:59";
            Page<ActivityEntity> page = activityRepository.findAll(new Specification<ActivityEntity>() {
                @Override
                public Predicate toPredicate(Root<ActivityEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(dateStr)){
                        predicateList.add(criteriaBuilder.lessThanOrEqualTo(root.get("votingStartTimeStr"),MyDateUtil.dateString3Date(dateStr)));
                        predicateList.add(criteriaBuilder.equal(root.get("activityStatus"), ActivityStatusEnum.IN_AUDIT.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            page.getContent().stream().forEach(e->{
                ActivityEntity entity = activityRepository.findActivityEntityById(e.getActivityStatus());
                entity.setActivityStatus(ActivityStatusEnum.VOTING.getType());
                activityRepository.save(entity);
            });
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

    @Scheduled(cron = "20 0 18 * * ?")
    public Result votingScheduled(){
        try {
            //根据时间倒序
            Sort sort = Sort.by(Sort.Direction.DESC,"createDate");
            //页数与每页大小
            Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE,sort);
            //条件
            String dateStr = MyDateUtil.getDateString(new Date())+" 23:59:59";
            Page<ActivityEntity> page = activityRepository.findAll(new Specification<ActivityEntity>() {
                @Override
                public Predicate toPredicate(Root<ActivityEntity> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                    ArrayList<Predicate> predicateList = new ArrayList<>();
                    if (StringUtils.isNotBlank(dateStr)){
                        predicateList.add(criteriaBuilder.lessThanOrEqualTo(root.get("activityEndTimeStr"),MyDateUtil.dateString3Date(dateStr)));
                        predicateList.add(criteriaBuilder.equal(root.get("activityStatus"), ActivityStatusEnum.VOTING.getType()));
                    }
                    return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
                }
            }, pageable);
            page.getContent().stream().forEach(e->{
                ActivityEntity entity = activityRepository.findActivityEntityById(e.getActivityStatus());
                entity.setActivityStatus(ActivityStatusEnum.END.getType());
                activityRepository.save(entity);
            });
            return Result.createSimpleSuccessResult();
        }catch (Exception e){
            e.printStackTrace();
            return Result.createSystemErrorResult();
        }
    }

}
