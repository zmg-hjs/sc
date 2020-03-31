layui.config({
    base: '../../../static/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
    , formSelects: '../lib/formSelects/formSelects-v4'
    , common: '../modules/common'
}).use(['index', 'table', 'form', 'laydate', 'formSelects', 'common'], function () {
    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table,
        formSelects = layui.formSelects;
    element = layui.element;

    //日期插件渲染
    laydate.render({
        elem: '#time'
        , type: 'date'
        , range: '~'
        , format: 'yyyy-MM-dd'
    });
    laydate.render({
        elem: '#time1'
        , type: 'date'
        , range: '~'
        , format: 'yyyy-MM-dd'
    });
    $(document).on('click','#reset',function(){
        $("#searchFormId")[0].reset();
    });
    //表格渲染
    table.render({
        elem: '#order-table-toolbar'
        , url: '/view/v2/overbearfood/view_review_index_data?serviceNoStr=view_review_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'shopName', title: '店铺名', width: 100, align: 'center', fixed: 'left'}
            , {field: 'id', title: '审核编号', width: 100,height:100, align: 'center'}
            , {field: 'phoneNumber', title: '电话', width: 100,height:100, align: 'center'}
            , {field: 'nickName', title: '用户名称', width: 100,height:100, align: 'center'}
            , {field: 'buyOverbearFoodCreateDateStr', title: '霸王餐发布日期', width: 100, align: 'center'}
            , {field: 'reviewCreateDateStr', title: '审核提交时间', width: 100, align: 'center'}
          //  , {field: 'foodNameListStr', title: '菜名', width: 100, align: 'center'}
            , {field: 'picOrderStatus', title: '订单状态', width: 100, align: 'center'}
            , {field: 'picPayMoney', title: '支付金额', width: 100, align: 'center'}
            , {field: 'picConsignee', title: '收货人信息', minWidth: 130, align: 'center'}
            , {field: 'picOrderNumber', title: '订单编号', minWidth: 130, align: 'center'}
            , {field: 'picOrderDate', title: '下单时间', width:100, align: 'center'}
            , {
                field: 'orderPictureList',
                title: '订单截图',
                width: 240,
                align: 'center',
                templet: function(item) {
                    var list = item.orderPictureList;
                    var result = '';
                    if(list!= undefined){
                        for(var i = 0; i < list.length ; i++){
                            result += '<a href="'+  list[i] + '" target="_blank " title="点击查看">' +
                                '<img src="'+  list[i] + '" style="height:100%;" />' +
                                '</a>'+'&nbsp&nbsp&nbsp&nbsp';
                        }
                    }


                    return result;
                }
            }
            , {
                field: 'commentPictureList',
                title: '评价截图',
                width: 240,
                align: 'center',
                templet: function(item) {
                    var list = item.commentPictureList;
                    var result = '';
                    if(list!= undefined){
                        for(var i = 0; i < list.length ; i++){
                            result += '<a href="' + list[i] + '" target="_blank " title="点击查看">' +
                                '<img src="' + list[i] + '" style="height:100%;" />' +
                                '</a>'+'&nbsp&nbsp&nbsp&nbsp';
                        }
                    }
                    return result;
                }
            }
            , {
                field: 'actualPayment', title: '实付金额', minWidth: 180, align: 'left',
                templet: function (item) {
                    return  '<input type="text" id="actualPayment'+item.id+'" name="actualPayment"  value="'+item.picPayMoney+'" />';
                }
            }
            , {field: 'statusStr',fixed: 'right', title: '状态', width:100, align: 'center'}
            ,{fixed: 'right',field : 'tool',title : '操作',width : 200,align : 'center',toolbar : '#barDemo'}
            // , {field: 'orderPictureAddress', title: '用户上传图片', templet:'<div><img src="/businesse/pic/2019/11/20/20191120183002-2a5ebd2a36.jpg"></div>',minWidth: 300, align: 'center'}
        ]]
        , page: true
        //回调函数查询不同状态数据总数
    });


    //监听搜索
    form.on('submit(LAY-user-front-search)', function (data) {
        var field = data.field;
        var buyOverbearfoodCreateDateRange=   field.buyOverbearfoodCreateDateRange;
        var reviewCreateDateRange=   field.reviewCreateDateRange;

        if(buyOverbearfoodCreateDateRange!=null&&buyOverbearfoodCreateDateRange.length>0){
            var buyOverbearCreateDateRangeArray =buyOverbearfoodCreateDateRange.split("~");
            field.buyOverbearfoodStartCreateDateStr= buyOverbearCreateDateRangeArray[0];
            field.buyOverbearfoodEndCreateDateStr= buyOverbearCreateDateRangeArray[1]+" 23:59:59";
        }

        if(reviewCreateDateRange!=null&&reviewCreateDateRange.length>0){
            var releaseDateRangeArray =reviewCreateDateRange.split("~");
            field.startCreateDateStr= releaseDateRangeArray[0];
            field.endCreateDateStr= releaseDateRangeArray[1]+" 23:59:59";
        }

        field['checkBoxIdList'] = null;
        //执行重载
        table.reload('order-table-toolbar', {
            where: field,
            page: {
                curr: 1
            }
        });
        return false;
    });

    //状态切换
    element.on('tab(component-tabs-hash)', function (obj) {
        var parms = $("#searchForm").serializeObject();
        table.reload('order-table-toolbar', {
            where: parms
        });
        layer.msg(this.innerHTML);
    });

    //监听行工具事件
    table.on('tool(order-table-toolbar)', function (obj) {
        var data = obj.data;

        if (obj.event === 'payment') {
            var actualPayment = null
            //输入框的值改变时触发
            //如果没在支付状态，可以执行支付
            if(payStatus == false){
                payStatus = true;  //将状态设置为正在支付
                var searchObj = {};
                //判断金额是否大于0小于50
                var actualPayment = $("#actualPayment"+data.id).val();
                if (actualPayment=="" || actualPayment == null){
                    layer.msg("请输入正确金额....",{icon:6});
                    payStatus = false;
                    return
                }
                if (isNaN(actualPayment)||actualPayment>50||actualPayment<0.3){
                    layer.msg("请输入正确金额....",{icon:6})
                    payStatus = false;
                    return
                }
                layer.msg("开始访问后台",{icon:6})
                searchObj.actualPayment = $("#actualPayment"+data.id).val();
                searchObj.status=data.status;
                searchObj.openid = data.openid;
                searchObj.reviewId = data.id;
                searchObj.userId = data.userId;
                searchObj.buyOverbearfoodId=data.buyOverbearfoodId;
                searchObj.serviceNoStr='view_overbearfood_return_money';
                layer.open({
                    title: '提示'
                    ,content: '是否确认支付'
                    ,btn:['确定','取消']
                    ,yes:function(index, layero){
                        //调用支付接口，返回执行结果
                        $.simpleAjax('/view/v2/overbearfood/view_overbearfood_return_money', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
                        // $.simpleAjax('http://localhost:9046/payMoney/v1/api/payMoneyToUser', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
                        layer.close(index);
                    }
                    ,btn2:function (index) {
                        payStatus = false;
                        layer.close(index);
                    }
                    ,cancel: function(index, layero){
                        //return false 开启该代码可禁止点击该按钮关闭
                        payStatus = false;
                    }
                });

            }else{
                //提示正在支付
                layer.msg("正在支付中....",{icon:1})
            }
        }else if(obj.event === 'review'){
            layer.open({
                type: 2,
                skin: 'open-class',
                area: ['930px', '400px'],
                title: '审核页面',
                content: "/view/v2/overbearfood/view_review_review_page?reviewId=" + data.id + "&openid=" + data.openid+"&buyOverbearfoodId="+data.buyOverbearfoodId
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
    });
    function returnFunction(data) {
        if (data.code == '1') {
            layer.msg('返款成功',{
                icon:6,
                time:2000
            });

        } else {
            layer.msg(data.message, {
                icon: 5,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
        }
        //支付完成
        payStatus = false
    }

    function returnExportFunction(data) {
        if (data.code == '1') {
            layer.msg('下载编号'+data.data,{
                icon:6,
                time:2000
            });

        } else {
            layer.msg(data.message, {
                icon: 5,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
        }
        //支付完成
        payStatus = false
    }
    //头工具栏事件
    table.on('toolbar(order-table-toolbar)', function (obj) {
        var searchObj = $("#searchFormId").serializeObject();
        var buyOverbearfoodCreateDateRange=   searchObj.buyOverbearfoodCreateDateRange;
        var reviewCreateDateRange=   searchObj.reviewCreateDateRange;

        if(buyOverbearfoodCreateDateRange!=null&&buyOverbearfoodCreateDateRange.length>0){
            var buyOverbearCreateDateRangeArray =buyOverbearfoodCreateDateRange.split("~");
            searchObj.buyOverbearfoodStartCreateDateStr= buyOverbearCreateDateRangeArray[0];
            searchObj.buyOverbearfoodEndCreateDateStr= buyOverbearCreateDateRangeArray[1]+" 23:59:59";
        }

        if(reviewCreateDateRange!=null&&reviewCreateDateRange.length>0){
            var releaseDateRangeArray =reviewCreateDateRange.split("~");
            searchObj.startCreateDateStr= releaseDateRangeArray[0];
            searchObj.endCreateDateStr= releaseDateRangeArray[1]+" 23:59:59";
        }
        switch (obj.event) {
            case 'export':
                    layer.confirm('确认导出审核数据？',
                        {
                            icon:3,
                            title:info,
                            btn: ['yes', 'no']
                        },
                        function (index) {
                            $.simpleAjax('/review/excel', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnExportFunction);
                            layer.close(index);
                    });
                break;
        }
    });

    /*点击生效失效按钮-------start--------*/

    function getCheckboxId(checkStatus) {
        var arr = new Array();
        var data = checkStatus.data;
        data.forEach(function (item) {
            arr.push(item.id);
        });
        return arr;
    }

    function onclickStatusButton(productDto, status) {

        $.simpleAjax('/product/updateProductStatus?status=' + status, 'post', productDto, "application/json", changeStatusReturn);
    }

    function changeStatusReturn(data) {

        if (data.code == '1') {
            layer.msg(data.msg, {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
        } else {
            layer.msg(data.msg, {
                icon: 5,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            })
        }
        $("#search").click();
    }

    /*点击生效失效按钮-------end--------*/


    form.on('select(selectType-filter)', function (obj) {
        $("input[name='selectValue']").val(null);

    })
    var url = ""
    function initData() {
        $.simpleAjax('/url', 'GET', null, "application/json;charset-UTF-8",returnFunction_url);
        loadOwner($("select[name='owner']"));
    }
    function returnFunction_url(data) {
        url = data
    }
    // 初始化控件数据
    $(document).ready(function(){
	    initData();
    });

});

