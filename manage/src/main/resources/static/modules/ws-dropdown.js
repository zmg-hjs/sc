layui.config({
	base: '../../static/' //静态资源所在路径
}).use(['jquery'], function() {
	var $ = layui.$;

	$(function (){
		$('body').on('mouseover','.ws-dropdown-trigger', function(){
			var top = $(this).offset().top-$(document).scrollTop();
			var left = $(this).offset().left-$(document).scrollLeft();
			var ht = $(this).height();
			var wd = $(this).width();
			var wsd = $(this).parent().find('.ws-dropdown');
			if(wsd==null || wsd.length==0){
				return;
			}
			wsd = wsd.eq(0);
			wsd.css({"top": top+ht+'px',"left": left+'px'});
			wsd.data('row',$(this).data('row'));
			wsd.show();
		}).on('mouseout','.ws-dropdown-trigger', function(){
			var wsd = $(this).parent().find('.ws-dropdown');
			if(wsd==null || wsd.length==0){
				return;
			}
	        setTimeout(function () {  
	            if (!wsd.is(':hover')){  
	                wsd.hide();
	            }  
	        },200);  
		}).on('mouseout','.ws-dropdown', function(){
		 	var _this = $(this);  
	        setTimeout(function () {  
	            if (!_this.is(':hover')){  
	            	_this.hide();
	            }  
	        },200);
		}).on('click','.ws-dropdown-menu-item', function(){
			var _this = $(this);
			var operation = _this.data('operation');
			var row = _this.parents('.ws-dropdown').data('row');
			_this.parents('.ws-dropdown').hide();
			// eval(operation+'('+row+')');
		});
	});
	
});