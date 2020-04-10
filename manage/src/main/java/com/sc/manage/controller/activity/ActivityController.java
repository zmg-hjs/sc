package com.sc.manage.controller.activity;

import com.sc.manage.service.activity.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sc/manage")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

}
