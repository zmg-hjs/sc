/**
 * @param url:请求数据地址
 * @param fnSetData:拼装表格数据回调函数
 * @param nodeId:把数据存放到那个节点
 * @param searchFormId:搜索数据对象
 * @param paginatorNodeId:分页码插入的标签
 * @returns
 */
var globalSearchFormId = null;
function showTableData(url,fnSetData,nodeId,searchFormId,paginatorNodeId,call){
	 	 var pageNum = 1;
	 	 var pageSize = 10;//默认每页显示10条数据（另外这行代码跟 searchObj= searchObj+"&pageNum="+ pageNum+"&pageSize="+ pageSize; 这行代码有关系，是否还在其他地方用到不确定。）
		 var searchObj = null;
		 //带有搜索条件
	     if(null != searchFormId || searchFormId != undefined){
	    	 globalSearchFormId = searchFormId;
	    	 searchObj = $("#"+searchFormId).serialize();
	    	 searchObj= searchObj+"&pageNum="+ pageNum+"&pageSize="+ pageSize;
	    	 searchObj = searchObj;
	     }else{ //无搜索条件
	    	 searchObj=new Object();
	    	 searchObj.pageNum = pageNum;
	     }
		 $.ajax({
			  url: url,
			  datatype: 'json',
			  type: "POST",
			  data: searchObj,
			  success: function (respData) {
	  		     if (respData != null) {
		            if(respData.ret == "0"){
		            	$("#"+nodeId).children("tr").remove();
		            	var data = respData.data;
		            	if(!_.isEmpty(data.list)){
							   $.each(data.list, function (index, item) { //遍历返回的json
								   fnSetData(nodeId,index,item);
								});
						    }
		            	if (call) {
						    call();
						}
				   		var pageCount = data.pages; //取到pageCount的值(把返回数据转成object类型)
				   		var currentPage = data.pageNum; //得到currentPage
						
						if(pageCount == 0 ){
							pageCount = 1;
						}
						if(currentPage == 0){
							currentPage = 1;
						}
			   			var options = {
							   bootstrapMajorVersion: 1, //版本
							   currentPage: currentPage, //当前页数
							   totalPages: pageCount, //总页数
							   alignment: "center",
							   itemTexts: function (type, page, current) {
							   switch (type) {
							     case "first":
							       return "首页";
							     case "prev":
							       return "上一页";
							     case "next":
							       return "下一页";
							     case "last":
							       return "末页";
							     case "page":
							       return page;
			    			}
			   			},//点击事件，用于通过Ajax来刷新整个list列表
			   			onPageClicked: function (event, originalEvent, type, page) {
			                    if (call) {
			                        call();
			                    }
								var searchKeyObj = null;
								//带有搜索条件
								if(globalSearchFormId != null || globalSearchFormId != undefined){
									searchKeyObj = $("#"+globalSearchFormId).serialize();
									searchKeyObj= searchKeyObj+"&pageNum="+ page;
								}else{ //没有搜索条件分页查询
									searchKeyObj = new Object();
									searchKeyObj.pageNum = page;
								}
						    	$.ajax({
								    url: url,
									datatype: 'json',
								    type: "POST",
								    data: searchKeyObj,
					    			success: function (respData1) {
					     				if (respData1 != null) {
						                      if(respData1.ret == "0"){
						                    	  var data1 = respData1.data;
						                    	  $("#"+nodeId).children("tr").remove();
						                    	  if(!_.isEmpty(data1.list)){
						                    		  currentPage = data1.pageNum;
						                    		  $("#totalSizeId").html(data1.total);
						                    		  $("#currentPageNumId").val(data1.pageNum);
						      						  $("#recordSizeId").html((data1.pageNum-1)*data1.pageSize+1+"-"+data1.pageNum*data1.pageSize);
													  $.each(data1.list, function (index, item) { //遍历返回的json
														  fnSetData("list",index,item);
									     			  });
												  }
						                    	  if (call) {
													   call();
												   }
						                      }
					     			}
					    		}
					    	});
			   			}
		   			};
						if(data.total > 0){
							var paginatorNodeHtml = "<div class='row page' id='paginatorNodeHtmlId'> <div class='col-sm-4 text-left'>"
							     +"每页显示 <select style='width:75px; display:inline-block;' class='form-control input-sm' name='sumnum' id='sumnumId'>"
						         		+"<option value='10' selected='selected'>10条</option>"
	                                    +"<option value='20'>20条</option>"
	                                    +"<option value='50'>50条</option>"
	                                    +"<option value='100'>100条</option>"
	                                    +"<option value='500'>500条</option>"
	                                    +"</select>"
	                                +"&nbsp;&nbsp;跳转到第 <input style='width:50px;height:30px;display:inline-block;'  class='form-control' id='currentPageNumId' value='1' type='text'/> 页 " 
	                                +"<a href='javascript:void(0)' id='goPageNumId'>GO>></a>"
	                             +"</div>"
	                            +"<div style='float:left;width:520px;'>"
	                            +"<div style='display: inline-block;padding-left:0;margin:0; ' id='nav-page-id'></div> "
	                                +"</div>"
	                            +"<div class='text-right' style='float:right; margin-right:15px;width:220px;'>"
	                            +"共<span id='totalSizeId'></span>条记录,当前页：<span id='recordSizeId'></span>条</div>"
	                            +"</div>";
							
							//检查页码是否有没有显示多少条的input标签
							if(!_.isEmpty(searchFormId)){
								if($('#'+searchFormId).length > 0){console.log($("#"+searchFormId+":input[name='pageSize']"));
									if($("#"+searchFormId+" :input[name='pageSize']").length <= 0){
										$("#"+searchFormId).append("<input type='hidden' name='pageSize' id='pageSizeId' value='10' />");
									}
								}
							}
							
						
						    //默认分页节点Id
							if(_.isEmpty(paginatorNodeId)){
								if($("#paginatorNodeHtmlId").length <= 0){
									//使用括号内的内容替换所选择的内容
									$("#nav-page-id").replaceWith(paginatorNodeHtml); 
								}
								$('#nav-page-id').bootstrapPaginator(options);
							}else{
								if($("#paginatorNodeHtmlId").length <= 0){
									//使用括号内的内容替换所选择的内容。  
									$("#"+paginatorNodeId).replaceWith(paginatorNodeHtml);
								}
								$('#'+paginatorNodeId).bootstrapPaginator(options);
							}
							
							$("#totalSizeId").html(data.total);
							$("#currentPageNumId").val(data.pageNum);
							$("#recordSizeId").html(((data.pageNum-1)*data.pageSize+1)+"-"+data.pageNum*data.pageSize);
							
							//每页显示多少条记录切换
							$("#sumnumId").off("click").on("click",function(){
								var defaultPageSize = $("#pageSizeId").val();
								var pageSize = $("#sumnumId").find("option:selected").val();
								$("#pageSizeId").val(pageSize);
								//选择分页显示的条数和备选之前不同则进行数据查询
								if(defaultPageSize != pageSize){ ;
									//查询预报单数据
									showTableData(url,fnSetData,nodeId,searchFormId,null,call);
								}
							});
							//点击调到输入页码
							$("#goPageNumId").off("click").on("click",function(){
								var pageNum = $("#currentPageNumId").val();
								if(currentPage != pageNum){
						    		if(pageCount >= pageNum && pageNum >= 1 ){
						    			if(_.isEmpty(paginatorNodeId)){
						    				$("#nav-page-id").bootstrapPaginator(options.onPageClicked("page-clicked", "", "", pageNum));
								    		$("#nav-page-id").bootstrapPaginator("show",pageNum);
						    			}else{
						    				$('#'+paginatorNodeId).bootstrapPaginator(options.onPageClicked("page-clicked", "", "", pageNum));
								    		$('#'+paginatorNodeId).bootstrapPaginator("show",pageNum);
						    			}
							    	}else{
							    		layer.alert("输入的页码有误,请重新输入!")
							    	}
						    	}
							});
							//回车调到输入页码
							$('#currentPageNumId').bind('keydown',function(event){
							    if(event.keyCode == "13") {
							    	var pageNum = $("#currentPageNumId").val();
							    	if(currentPage != pageNum){
							    		if(pageCount >= pageNum && pageNum >= 1 ){
							    			if(_.isEmpty(paginatorNodeId)){
							    				$("#nav-page-id").bootstrapPaginator(options.onPageClicked("page-clicked", "", "", pageNum));
									    		$("#nav-page-id").bootstrapPaginator("show",pageNum);
							    			}else{
							    				$('#'+paginatorNodeId).bootstrapPaginator(options.onPageClicked("page-clicked", "", "", pageNum));
									    		$('#'+paginatorNodeId).bootstrapPaginator("show",pageNum);
							    			}
								    	}else{
								    		layer.alert("输入的页码有误,请重新输入!")
								    	}
							    	}
							    }
							});
						}else{ //没有数据
							$("#totalSizeId").html(0);
							$("#currentPageNumId").val(1);
							$("#recordSizeId").html("1-10");
						}
		      }else{
		    	  layer.alert(respData.msg);
		      }
	  	}else{
			layer.alert("请求网络异常,请稍后再试!");
		}
	  }
	});
}



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

function stopPropagation(event) {
	event = window.event || event;
	event.stopPropagation();
}

//$(document).ready(function() {
//	$("table").resizableColumns({
//	    store: window.store
//	});
//});