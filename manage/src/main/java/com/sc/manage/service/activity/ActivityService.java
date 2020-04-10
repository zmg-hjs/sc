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



}
