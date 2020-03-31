$(function(){
	//时间的初始化
	$(".form_datetime").datetimepicker({
	    format: "yyyy-mm-dd",
	    showMeridian: true,
	    autoclose: true,
	    language: 'zh-CN',
	    minView: "month" //设置只显示到月份
	});
	//时间清空input输入的数据
	$(".cleanVale").off("click").on("click",function(){
		$(this).parent(".input-group").children("input").val("");
	});
});