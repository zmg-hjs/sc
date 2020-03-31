/**
 @Name：layuiAdmin 公共业务
 */
layui.define(function(exports){
    var $ = layui.$
    admin = layui.admin;

    $(document).on('blur', '[ws-verify="required"]', function () {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value == '' ){
            $(this).after('<span class="error-tip">'+ productRequiredRule +'</span>');
            layui.$(this).css('border-color','red');
        }
    }).on('focus', '[ws-verify="required"]', function () {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });


    //查询条件更多显示或隐藏
  	admin.events.moreToggle = function(){
  	  	$(this).closest('.screen-input-content').find('.more-item').toggleClass('show');
  	  	$(this).find('.layui-icon').toggleClass('layui-icon-up');
  	  	if($(this).find('.layui-icon').hasClass('layui-icon-up')){
  	  		$(this).find('span').text(v_packup);
  	  	}else{
  	  		$(this).find('span').text(v_more);
  	  	}
    	};
	//表单序列化对象
   $.fn.serializeObject = function () {
       var o = {};
       var a = this.serializeArray();
       $.each(a, function () {
           if (o[this.name] !== undefined) {
               if (!o[this.name].push) {
                   o[this.name] = [o[this.name]];
               }
               o[this.name].push(this.value.trim() || '');
           } else {
               o[this.name] = this.value.trim() || '';
           }
       });
       return o;
   };
   $.ajaxSetup({
	    //设置ajax请求结束后的执行动作
	    complete : function(xhr, textStatus) {
	    		if (xhr.responseJSON != null && xhr.responseJSON.code === "ajaxLoginError") {
	    			var win = window;
	            while (win != win.top){  
	                win = win.top;  
	            }
	            //将后端重定向的地址取出来,使用win.location.href去实现重定向的要求  
				win.location.href= xhr.responseJSON.data;
	    		}
	    },
	    type:'POST'
	});
   $.extend(
       {
           simpleAjax:function (url,type,data,contentType,func) {
               $.ajax({
                   url: url,
                   type: type,
                   data: data,
                   contentType: contentType,
                   success: function (data) {
                       func(data);
                   }
               })
           }
       }
       
   );
   $.ajaxSetup({
	     //设置ajax请求结束后的执行动作
	     complete : function(xhr, textStatus) {
	       if (xhr.responseJSON != null && xhr.responseJSON.code === "ajaxLoginError") {
	        var win = window;
	         while (win != win.top){  
	             win = win.top;  
	         }
             //将后端重定向的地址取出来,使用win.location.href去实现重定向的要求  
             win.location.href= xhr.responseJSON.data;
	       }
	     },
	     type:'POST'
	 });
        /*.simpleAjax =  function (url,type,data,func) {
        $.ajax({
            url: url,
            type: type,
            data: JSON.stringify(data),
            success: function (data) {
                func(data);
            }
        })
    };*/
    /** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
         可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
         Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
      * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
      * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
      * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
      * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
      */
    Date.prototype.pattern=function(fmt) {
        var o = {
            "M+" : this.getMonth()+1, //月份         
            "d+" : this.getDate(), //日         
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
            "H+" : this.getHours(), //小时         
            "m+" : this.getMinutes(), //分         
            "s+" : this.getSeconds(), //秒         
            "q+" : Math.floor((this.getMonth()+3)/3), //季度         
            "S" : this.getMilliseconds() //毫秒         
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };
    $(window).keyup(function(e){
        if(e.keyCode==27){
            parent.layer.closeAll();
            layer.closeAll();
        }
    });

  //对外暴露的接口
  exports('common', {});
});

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */        
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}

/**
 * 获取URL地址中的请求参数，支持多参数
 * 用例：var Request = new Object();
 * 		Request = getRequest();
 * 		var 参数1 = Request['参数1'];
 * 		var 参数2 = Request['参数2'];
 */
function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 * 加载枚举数据
 * @param {} enumName 枚举名称
 * @param {} item 控件对象
 * @param {} isData 是否取data值
 * @param {} excludes 排除值
 */
function loadEnumValues(enumName, item, isData, excludes) {
	layui.use('form', function(){
		var $ = layui.$;
 		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.post("/common/enum/" + enumName, '', function(res) {
	        if (res.code == '0') {
	        		if (res.data == null || res.data.length == 0) {
	        			return;
	        		}
	        		var selectValue = $(item).attr("value");
	        		for(var i = 0; i < res.data.length; i++){
	        		    var value = isData != null && isData ? res.data[i].data : res.data[i].value;
	        		    if (excludes != null && $.inArray(value, excludes) != -1) {
	        				continue;
	        			}
	        			$(item).append("<option value='" + value + "' " + (selectValue != null && selectValue === value ? 'selected' : '') + ">" + res.data[i].name + "</option>")
	        		}
	        		form.render();// 重新渲染表单
	        } else {
	            layer.msg(res.msg);
	        }
	    });
    });
}

/**
 * 返回枚举List,仅仅是利用变量去接收枚举的内容而已
 * @param {} enumName 枚举名称
 * @param {} boolean isData 
 */
function getEnumList(enumName) {
	var enumList = [];
	layui.use('form', function(){
		var $ = layui.$;
 		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
 		$.ajaxSettings.async = false;
 		$.post("/common/enum/" + enumName, '', function(res) {
 	        if (res.code == '0') {
 	        	enumList = res.data;	
 	        } else {
 	            layer.msg(res.msg);
 	        }
 	    });
    });
	
	return enumList;
}

/**
 * 加载货主数据
 * @param {} item 控件对象
 */
function loadOwner(item) {
	layui.use('form', function(){
		var $ = layui.$;
 		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.post("/common/customer", '', function(res) {
	        if (res.code == '0') {
	        		if (res.data == null || res.data.length == 0) {
	        			return;
	        		}
	        		var selectValue = $(item).attr("value");
	        		for(var i = 0; i < res.data.length; i++){
	        			$(item).append("<option value='" + res.data[i].code + "' " + (selectValue != null && selectValue === res.data[i].code ? 'selected' : '') + ">" + res.data[i].name + "</option>")
	        		}
	        		form.render();// 重新渲染表单
	        } else {
	            layer.msg(res.msg);
	        }
	    });
    });
}

/**
 * 加载登录用户权限可用的仓库数据
 * @param {} item 控件对象
 */
function loadWarehouse(item) {
	layui.use('form', function(){
		var $ = layui.$;
 		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.post("/common/warehouse", '', function(res) {
	        if (res.code == '0') {
	        		if (res.data == null || res.data.length == 0) {
	        			return;
	        		}
	        		var selectValue = $(item).attr("value");
	        		for(var i = 0; i < res.data.length; i++){
	        			var name = systemIsChinese ? res.data[i].cnName : res.data[i].enName;
	        			$(item).append("<option value='" + res.data[i].code + "' " + (selectValue != null && selectValue === res.data[i].code ? 'selected' : '') + ">" + name + "</option>")
	        		}
	        		form.render();// 重新渲染表单
	        } else {
	            layer.msg(res.msg);
	        }
	    });
    });
}

/**
 * 加载所有可用的仓库数据
 * @param {} item 控件对象
 */
function loadAllWarehouse(item) {
	layui.use('form', function(){
		var $ = layui.$;
 		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.post("/common/getAllWarehouse", '', function(res) {
	        if (res.code == '0') {
	        		if (res.data == null || res.data.length == 0) {
	        			return;
	        		}
	        		var selectValue = $(item).attr("value");
	        		for(var i = 0; i < res.data.length; i++){
	        			var name = systemIsChinese ? res.data[i].cnName : res.data[i].enName;
	        			$(item).append("<option value='" + res.data[i].code + "' " + (selectValue != null && selectValue === res.data[i].code ? 'selected' : '') + ">" + name + "</option>")
	        		}
	        		form.render();// 重新渲染表单
	        } else {
	            layer.msg(res.msg);
	        }
	    });
    });
}

/**
 * 加载渠道数据
 * @param {} item 控件对象
 */
function loadChannel(item) {
	layui.use('form', function(){
		var $ = layui.$;
 		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.post("/common/channel", '', function(res) {
	        if (res.code == '0') {
        		if (res.data == null || res.data.length == 0) {
        			return;
        		}
        		var selectValue = $(item).attr("value");
        		for(var i = 0; i < res.data.length; i++){
        			$(item).append("<option value='" + res.data[i].channelCode + "' " + (selectValue != null && selectValue === res.data[i].channelCode ? 'selected' : '') + ">" + res.data[i].channelCode + "</option>")
        		}
        		form.render();// 重新渲染表单
	        } else {
	            layer.msg(res.msg);
	        }
	    });
    });
}

/**
 * 加载生效状态的基础渠道数据
 * @param {} item 控件对象
 */
function loadBaseChannel(item) {
	layui.use('form', function(){
		var $ = layui.$;
 		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.post("/common/baseChannel", '', function(res) {
	        if (res.code == '0') {
        		if (res.data == null || res.data.length == 0) {
        			return;
        		}
        		var selectValue = $(item).attr("value");
        		for(var i = 0; i < res.data.length; i++){
        			$(item).append("<option value='" + res.data[i].channelCode + "' " + (selectValue != null && selectValue === res.data[i].channelCode ? 'selected' : '') + ">" + res.data[i].channelCode + "</option>")
        		}
        		form.render();// 重新渲染表单
	        } else {
	            layer.msg(res.msg);
	        }
	    });
    });
}


/**
 * 加载发货条款数据
 * @param {} item 控件对象
 */
function loadIncoterm(item) {
	layui.use('form', function(){
		var $ = layui.$;
 		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.post("/common/incoterm", '', function(res) {
	        if (res.code == '0') {
	        		if (res.data == null || res.data.length == 0) {
	        			return;
	        		}
	        		var selectValue = $(item).attr("value");
	        		for(var i = 0; i < res.data.length; i++){
	        			$(item).append("<option value='" + res.data[i].enIncoterm + "' " + (selectValue != null && selectValue === res.data[i].enIncoterm ? 'selected' : '') + ">" + res.data[i].enIncoterm + "</option>")
	        		}
	        		form.render();// 重新渲染表单
	        } else {
	            layer.msg(res.msg);
	        }
	    });
    });
}

/**
 * 加载国家二字码数据
 * @param {} item 控件对象
 */
function loadCountryCode(item) {
	layui.use('form', function(){
		var $ = layui.$;
		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.post("/common/country", '', function(res) {
			if (res.code == '0') {
				if (res.data == null || res.data.length == 0) {
					return;
				}
				var selectValue = $(item).attr("value");
				for(var i = 0; i < res.data.length; i++){
					$(item).append("<option value='" + res.data[i].countryCode + "' " + (selectValue != null && selectValue === res.data[i].countryCode ? 'selected' : '') + ">" + res.data[i].countryCode +"(" + res.data[i].countryEname + ")" + "</option>")
				}
				form.render();// 重新渲染表单
			} else {
				layer.msg(res.msg);
			}
		});
	});
}

/**
 * 根据仓库编码加载可用承运商数据
 * @param {} item 控件对象
 * @param {} warehouseCode 仓库编码
 */
function loadExpressByWarehouseCode(item,warehouseCode) {
	layui.use('form', function(){
		var $ = layui.$;
		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.ajaxSettings.async = false;
		$.post("/common/queryExpressByWarehouseCode", {"warehouseCode":warehouseCode}, function(res) {
			if (res.code == '0') {
				if (res.data == null || res.data.length == 0) {
					form.render();// 重新渲染表单
					return;
				}
				var selectValue = $(item).attr("value");
				for(var i = 0; i < res.data.length; i++){
					$(item).append("<option value='" + res.data[i].channelCode + "' " + (selectValue != null && selectValue === res.data[i].channelCode ? 'selected' : '') + ">" + res.data[i].channelCode + "</option>")
				}
				form.render();// 重新渲染表单
			} else {
				layer.msg(res.msg);
			}
		});
	});
}

/**
 * 根据货主和仓库编码加载可用承运商数据
 * @param {} item 控件对象
 * @param {} owner 货主编码
 * @param {} warehouseCode 仓库编码
 */
function loadChannelByOwnerWarehouse(item,owner,warehouseCode) {
	if(owner == null || owner == "" || warehouseCode == null || warehouseCode == ""){
		return;
	}
	layui.use('form', function(){
		var $ = layui.$;
		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.ajaxSettings.async = false;
		$.post("/common/getChannelByOwnerWarehouse", {"owner":owner, "warehouseCode":warehouseCode}, function(res) {
			if (res.code == '0') {
				if (res.data == null || res.data.length == 0) {
					form.render();// 重新渲染表单
					return;
				}
				var selectValue = $(item).attr("value");
				for(var i = 0; i < res.data.length; i++){
					$(item).append("<option value='" + res.data[i].channelCode + "' " + (selectValue != null && selectValue === res.data[i].channelCode ? 'selected' : '') + ">" + res.data[i].channelCode + "</option>")
				}
				form.render();// 重新渲染表单
			} else {
				layer.msg(res.msg);
			}
		});
	});
}

/**
 * 根据货主加载可用仓库数据
 * @param {} item 控件对象
 * @param {} owner 货主编码
 */
function loadWarehouseByOwner(item,owner) {
	layui.use('form', function(){
		var $ = layui.$;
		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		if(owner!=""){
            // 后台数据请求
            $.ajaxSettings.async = false;
            $.post("/channelConfig/getWarehouseByOwner", {"owner":owner}, function(res) {
            	if (res.code == '0') {
    				if (res.data == null || res.data.length == 0) {
    					form.render();// 重新渲染表单
    					return;
    				}
    				var selectValue = $(item).attr("value");
    				for(var i = 0; i < res.data.length; i++){
                        var name = systemIsChinese ? res.data[i].warehouseCname : res.data[i].warehouseEname;
                        $(item).append("<option value='" + res.data[i].warehouseCode + "' " + (selectValue != null && selectValue === res.data[i].warehouseCode ? 'selected' : '') + ">" + name + "</option>")
                    }
    				form.render();// 重新渲染表单
    			} else {
    				layer.msg(res.msg);
    			}
    		});
        }
	});
}

/**
 * 根据国家二字码加载国家数据
 * @param {} item 控件对象
 * @param {} countryCode 国家二字码
 */
function loadCountryByCountryCode(item,countryCode) {
	layui.use('form', function(){
		var $ = layui.$;
		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.ajaxSettings.async = false;
		$.post("/common/queryCountryByCountryCode", {"countryCode": countryCode}, function(res) {
			if (res.code == '0') {
				if (res.data == null) {
					form.render();// 重新渲染表单
					return;
				}
				$(item).val(res.data.countryEname);
				form.render();// 重新渲染表单
			} else {
				layer.msg(res.msg);
			}
		});
	});
}

/**
 * 根据货主和SKU查询产品信息
 * @param {} item 控件对象
 */
function loadProductByOwnerSku(owner,sku) {
	var productVo = null;
	layui.use('form', function(){
		var $ = layui.$;
		var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
		// 后台数据请求
		$.ajaxSettings.async = false;
		$.get("/common/queryProductByOwnerSku",{"sku": sku, "owner": owner} , function(res) {
			if (res.code == '0') {
				productVo = res.data;
			} else {
				layer.msg(res.msg);
			}
		});
	});
	return productVo;
}

/**
 * 根据货主和订单 校验客户工单号是否存在并查出明細
 *
 * @param {} item 控件对象
 */
function loadDetailByOwnerNumber(owner,orderNumber) {
    var productVo = null;
    var errmsg = null;
    layui.use('form', function(){
        var $ = layui.$;
        var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
        // 后台数据请求
        $.ajaxSettings.async = false;
        $.get("/common/queryProductByOwnerNumber",{"owner": owner, "orderNumber": orderNumber} , function(res) {
            if (res.code == '0') {
                productVo = res.data;
            } else {
            	if(res.msg != null){
                layui.$('#orderNumber').after('<span class="error-tip">'+ res.msg +'</span>');}
                layui.$('#orderNumber').css('border-color','red');
            }
        });
    });
    return productVo;
}




/**
 * 根据货主和订单 校验客户工单号是否存在
 * @param {} item 控件对象
 */
function checkSkuByOwner(owner,sku) {
    var productVo = null;
    layui.use('form', function(){
        var $ = layui.$;
        var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
        // 后台数据请求
        $.ajaxSettings.async = false;
        $.get("/common/querySkuByOwner",{"owner": owner, "sku": sku} , function(res) {
            if (res.code == '0') {
                productVo = res.data;
            }
        });
    });
    return productVo;
}

/**
 * 根据货主和订单 校验客户工单号是否存在
 * @param {} item 控件对象
 */
function checkEanByOwner(owner,ean,checkBoxId) {
    var productVo = null;
    layui.use('form', function(){
        var $ = layui.$;
        var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
        // 后台数据请求
        $.ajaxSettings.async = false;
        $.get("/common/querySkuByOwner",{"owner": owner, "ean": ean, "checkBoxId": checkBoxId} , function(res) {
            if (res.code == '0') {
                productVo = res.data;
            }
        });
    });
    return productVo;
}

/**
 * 根据货主和订单 校验客户工单号是否存在
 * @param {} item 控件对象
 */
function checkRefNumberByOwner(owner,orderNumber,id) {
    var productVo = null;
    layui.use('form', function(){
        var $ = layui.$;
        var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
        // 后台数据请求
        $.ajaxSettings.async = false;
        $.get("/common/queryOrderNumberByOwner",{"owner": owner, "orderNumber": orderNumber,"id": id} , function(res) {
            if (res.code == '0') {
                productVo = res.data;
            }
        });
    });
    return productVo;
}


/**
 * 根据货主和订单 校验客户工单号是否存在
 * @param {} item 控件对象
 */
function checkRmaNumberByOwner(owner,number) {
    var productVo = null;
    layui.use('form', function(){
        var $ = layui.$;
        var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
        // 后台数据请求
        $.ajaxSettings.async = false;
        $.get("/common/queryRmaOrderByOwner",{"owner": owner, "number": number} , function(res) {
            if (res.code == '0') {
                productVo = res.data;
            }
        });
    });
    return productVo;
}



/**
 * 根据货主和订单 校验入庫工单号是否存在
 * @param {} item 控件对象
 */
function checkInstockByOwner(owner,number) {
    var productVo = null;
    layui.use('form', function(){
        var $ = layui.$;
        var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
        // 后台数据请求
        $.ajaxSettings.async = false;
        $.get("/common/queryInstockOrderByOwner",{"owner": owner, "number": number} , function(res) {
            if (res.code == '0') {
                productVo = res.data;
            }
        });
    });
    return productVo;
}




/**
 * 根据国家二字码和省州查询二字码信息信息
 * @param {} countryCode 国家二字码
 * @param {} provinceEname 省州
 */
function getProvinceCodeByProvince(countryCode, provinceEname) {
	var province = null;
	if(countryCode != "" && (countryCode == "US" || countryCode == "CA") && provinceEname != ""){
		layui.use('form', function(){
			var $ = layui.$;
			var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
			// 后台数据请求
			$.ajaxSettings.async = false;
			$.get("/common/queryProvinceCodeByProvince",{"countryCode": countryCode, "provinceEname": provinceEname} , function(res) {
				if (res.code == '0') {
					province = res.data;
				}
			});
		});
    }
	return province == null ? "" : province.provinceCode;
}


/**
 * 获取当前语言
 */
function isChinese() {
	var systemLanguage = '';
	var $ = layui.$;
	$.ajax({
         type : "post",
          url : "/language/now",
          async : false,
          success : function(res){
            if (res.code == '0') {
	        		systemLanguage = res.data;
	        } else {
	            layer.msg(res.msg);
	        }
          }
     });
     return "zh_CN" === systemLanguage;// 默认中文
}

/**
 * 成功消息弹框
 * @param {} msg 消息内容
 * @param {} time 显示时间毫秒,默认2秒
 * @param {} fn 回调函数
 */
function successMsg(msg, fn, time) {
	layer.msg(msg, {
        icon: 1,
        time: time && time != null ? time : 2000 //2秒关闭（如果不配置，默认是3秒）
    }, function () {
    		if (fn) {
    			fn();
    		} else {
       		window.location.reload();
    		}
    });
}

/**
 * 错误信息弹框
 * @param {} msg 错误消息
 * @param {} time 显示时间毫秒,默认2秒
 * @param {} fn 回调函数
 */
function errorMsg(msg, fn, time) {
    layer.alert(msg, {
        icon: 5
        // time: time && time != null ? time : 2000 //2秒关闭（如果不配置，默认是3秒）
    }, function (index) {
        if (fn) {
            fn();
        }
        layer.close(index);
    });
}
// 是否为中文
var systemIsChinese = isChinese();