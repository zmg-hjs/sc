//模糊查询方法
function searchFrom(searchFormId,url){
	var table= $("#dataTable").dataTable();
	//清除表格数据
	table.fnClearTable();
	//重新请求数据（不写参数代表请求初始化时的默认接口数据）
	//带有搜索条件
	var pageNum = 1;
	var searchObj = null;
	if(null != searchFormId || searchFormId != undefined){
		globalSearchFormId = searchFormId;
		searchObj = $("#"+searchFormId).serialize();
		searchObj = searchObj + "&pageNum="+pageNum;
	}else{ //无搜索条件
		searchObj=new Object();
		searchObj.pageNum = pageNum;
	}
	table.fnReloadAjax(url+"?"+searchObj);
}

function showTableDataNew(url,data,allcolumns,addessNodes,showNm){
	var resultDataTable=$('#dataTable').dataTable();
	if(resultDataTable){
		resultDataTable.fnClearTable();
		resultDataTable.fnDestroy();
	}
	
  //初始化dataTable插件
    $('#dataTable').dataTable({
    	"bPaginate": true, //翻页功能 
    	"bSort": true,  //排序功能 
    	"bInfo": true, //页脚信息 
    	"bAutoWidth": true, //自动宽度,
    	"bProcessing": true,
//    	"aLengthMenu":[1,20,30,50], //设置显示多少条记录
    	"ajax": {
    		url: url,
    		data:data,
    		datatype : "json",
    		type : "post",
    	   	beforeSend:function(xhr){
	    		tindex = layer.load(1, {shade: 0.1}); //0-2
	    	},
    	    dataSrc: function ( json ){
    	    	//关闭加载
	    		layer.close(tindex);
    	    	if(json.data.list){
    	    		return json.data.list;
    	    	}else if(json.data){
    	    		return json.data;
    	    	}
	    	}
    	  },
    	  "columns" : allcolumns,
    	  "fnDrawCallback": function(){
    		  if(showNm){
    			  //设置序号
    			  var api = this.api();
    			  var startIndex= api.context[0]._iDisplayStart;//获取到本页开始的条数
    			  api.column(0).nodes().each(function(cell, i) {
    				  cell.innerHTML = startIndex + i + 1;
    			  });
    		  }
    		  //跳转到指定页
    		  if(!$(".dataTables_length")[0].childNodes[5]){
    			  $(".dataTables_length").append("<span style='margin-right:5px;'></span>"+"跳转到第 <input type='text' id='changePage' class='input-text' style='width:40px;height:27px;margin-left:3px;'/> 页" +
    			  " <button class='btn btn-default shiny'  id='changePageBtn'>GO</button>");    
    			  var oTable = $("#dataTable").dataTable();
    			  $('#changePageBtn').click(function(e) { 
    				  if($("#changePage").val() && $("#changePage").val() > 0) {
    					  var redirectpage = $("#changePage").val() - 1;    
    				  } else {
    					  var redirectpage = 0;    
    				  }    
    				  oTable.fnPageChange(redirectpage);    
    			  });    
    		  }
    		},
    		"sPaginationType" : "full_numbers",
            "oLanguage" : {
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "共 _TOTAL_ 条记录,当前页: _START_ - _END_ 条",
                "sInfoEmpty": "没有检索到数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sZeroRecords": "没有检索到数据",
                "sSearch": "名称:",
                "sProcessing": " 数据加载中...",
                "oPaginate": {
	                "sFirst": "<<",
	                "sPrevious": "<",
	                "sNext": ">",
	                "sLast": ">>"
	            }
            },
            //根据传入的下标拼接显示的字符串
           "fnCreatedRow": function( nRow, aData, iDataIndex){
        	   //拼接地址，addessNodes为显示值的下标位置
        	   if(aData.address2 && addessNodes){
        		   $('td:eq('+addessNodes+')', nRow).html(aData.address+'<br>'+aData.address2); 
        	   }
           },
          "dom": 't<"page_bottom"lip>'
    });
    
    $("#dataTable").colResizable(); //表格宽度可拖动控件
}