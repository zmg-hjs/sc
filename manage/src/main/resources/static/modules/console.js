layui.define(function(exports){
  
  layui.use(['admin', 'echarts'], function(){
    var $ = layui.$
    ,admin = layui.admin
    ,echarts = layui.echarts;
    
   
    
    var echartsApp = [], options = [
      //新增的用户量
      {
        title: {
        	show:false
        },
        tooltip : { //提示框
          trigger: 'axis',
          formatter: "{b}<br>order：{c}"
        },
        xAxis : [{ //X轴
          type : 'category',
          data : ['11-07', '11-08', '11-09', '11-10', '11-11', '11-12', '11-15']
        }],
        yAxis : [{  //Y轴
          type : 'value'
        }],
        grid:[{
        	left: '1',
        	right: '0',
        	top: '1px',
        	height: '280px'
        }],
        series : [{ //内容
          type: 'line',
          data:[0, 0, 0, 0, 0, 0, 0],
        }]
      }
    ]
    ,elemDataView = $('#LAY-index-dataview')[0]
    ,renderDataView = function(){
      echartsApp = echarts.init(elemDataView, layui.echartsTheme);
      echartsApp.setOption(options[0]);
      //window.onresize = echartsApp.resize;
      admin.resize(function(){
        echartsApp
        .resize();
      });
    };
    
    
    //没找到DOM，终止执行
    if(!elemDataView) return;
    /***
	 * 查询通知信息 
	 */
     $.ajax({
        url: '/home/queryNotificationRecords',
        dataType: 'json',
        type: 'GET',
        success: function (data1) {
            if (data1.code == "0") {
            	var notificationRecords = data1.data;
            	 //昨天的时间
                var day1 = new Date();
                day1.setTime(day1.getTime()-24*60*60*1000);
                var yesterDay = new Date(day1).pattern("yyyy-MM-dd");
                //今天的时间
                var day2 = new Date();
                day2.setTime(day2.getTime());
                var  toDay = new Date(day2).pattern("yyyy-MM-dd");
                if(notificationRecords != null) {
                	for (var i = 0; i < notificationRecords.length; i++) {
                		var operatorType = notificationRecords[i].operatorType;//通知类型
                		var content = notificationRecords[i].content;//通知内容
                		var createDate = notificationRecords[i].createDate;//操作时间
                		var operatorDate = new Date(createDate).pattern("yyyy-MM-dd");//订单的操作时间
                		if(operatorDate == toDay){
                			var html = '<div class="notice-item">'
                				+'<div class="notice-item-top">'
                				+'<span class="notice-key">'+operatorType+'</span>'
                				+'<span class="notice-date">'+new Date(createDate).pattern("yyyy-MM-dd HH/mm/ss")+'</span></div>'
                				+'<p class="notice-text">'+content+'</p>'
                				+'</div>';
                			$(".today").eq(0).append(html);
                		}else if(operatorDate == yesterDay){
                			var html = '<div class="notice-item">'
                				+'<div class="notice-item-top">'
                				+'<span class="notice-key">'+operatorType+'</span>'
                				+'<span class="notice-date">'+new Date(createDate).pattern("yyyy-MM-dd HH/mm/ss")+'</span></div>'
                				+'<p class="notice-text">'+content+'</p>'
                				+'</div>';
                			$(".yesterday").eq(0).append(html);
                		}else{
                			var html = '<div class="notice-item">'
                				+'<div class="notice-item-top">'
                				+'<span class="notice-key">'+operatorType+'</span>'
                				+'<span class="notice-date">'+new Date(createDate).pattern("yyyy-MM-dd HH/mm/ss")+'</span></div>'
                				+'<p class="notice-text">'+content+'</p>'
                				+'</div>';
                			$(".earlier").eq(0).append(html);
                		}
                	}
                }
            } else {
                layer.msg(data1.msg);
            }
        }
    });
    
    // 查询最近7天每天出库统计数量
    $.ajax({
        url: '/home/queryWeekCount',
        dataType: 'json',
        type: 'GET',
        success: function (data1) {
            if (data1.code == "0") {
            	//最近一周每天出库的订单数 最近七天的日期
            	var weekOutCounts = data1.data;
            	var dayOutCount =new Array();
            	var weekDay =new Array();
            	if(weekOutCounts != null) {
            		for(var i = 0; i<weekOutCounts.length;i++){
            			dayOutCount.push(weekOutCounts[i].outCount);
            			weekDay.push(weekOutCounts[i].outDate);
            		}
            		//最近一周每天的订单量
            		options[0].series[0].data= dayOutCount;
            		options[0].xAxis[0].data= weekDay;
            		renderDataView();
            	}
            } else {
                layer.msg(data1.msg);
            }
        }
    })
    
    /***
	 * 查询待审核退货数量    
	 */
     $.ajax({
        url: '/home/queryTobeAuditedCount',
        dataType: 'json',
        type: 'GET',
        success: function (data1) {
            if (data1.code == "0") {
            	var pendReturnReviewCount = data1.data;
            	$("#pendreturn").text(pendReturnReviewCount);
            } else {
                layer.msg(data1.msg);
            }
        }
    })
    
    /***
	 * 查询待收货入库单数量
	 */
     $.ajax({
        url: '/home/queryPendInstockCount',
        dataType: 'json',
        type: 'GET',
        success: function (data1) {
            if (data1.code == "0") {
            	//待收货入库单数量
            	var pendInstockCount = data1.data;
            	$("#pendingreceipt").text(pendInstockCount);
            } else {
                layer.msg(data1.msg);
            }
        }
    })
    
     //查询待预报的数量
     $.ajax({
        url: '/home/queryPendforecastCount',
        dataType: 'json',
        type: 'GET',
        success: function (data1) {
            if (data1.code == "0") {
            	//待预报订单数量
            	var pendforecastCount = data1.data;
            	$("#forecasted").text(pendforecastCount);
            } else {
                layer.msg(data1.msg);
            }
        }
    })
    
    //监听侧边伸缩
    layui.admin.on('side', function(){
      setTimeout(function(){
        renderDataView();
      }, 300);
    });
    
    //监听路由
    layui.admin.on('hash(tab)', function(){
      layui.router().path.join('') || renderDataView();
    });
    
    //通知展开
    $(document).on('click','.notice-text',function(){
    	$(this).toggleClass('open');
    });
    
  });

  exports('console', {})
});