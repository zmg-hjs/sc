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

    var url = ""
    //日期插件渲染
    laydate.render({
        elem: '#beginDate'
        , type: 'datetime'
        , format: 'yyyy-MM-dd'
    });
    laydate.render({
        elem: '#endDate'
        , type: 'datetime'
        , format: 'yyyy-MM-dd'
    });
    $(document).on('click','#reset',function(){
        $("#searchFormId")[0].reset();
    });
    $(document).on('click','#notReviewNum',function(){
        //执行重载
        table.reload('order-table-toolbar', {
            where: {
                status: 'not_review'
            },
            page: {
                curr: 1
            }
        });
    });
    $(document).on('click','#reviewSucceedNum',function(){
        //执行重载
        table.reload('order-table-toolbar', {
            where: {
                status: 'review_succeed'
            },
            page: {
                curr: 1
            }
        });
    });
    $(document).on('click','#reviewFailNum',function(){
        //执行重载
        table.reload('order-table-toolbar', {
            where: {
                status: 'review_fail'
            },
            page: {
                curr: 1
            }
        });
    });
    //表格渲染
    table.render({
        elem: '#order-table-toolbar'
        , url: '/view/v2/push/view_push_index_data?serviceNoStr=view_push_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'pushId', title: '优惠id', width: 100, align: 'center', fixed: 'left'}
            , {field: 'pushType', title: '类型', width: 100,height:100, align: 'center'}
            , {field: 'status', title: '状态', width: 90,height:100, align: 'center'}
            , {field: 'title', title: '标题', width: 200,height:100, align: 'center'}
            , {field: 'publisherName', title: '发布账号', width: 150,height:100, align: 'center'}
            , {field: 'releaseDate', title: '发布时间', width: 170,height:100, align: 'center'}
            // , {field: 'pageView', title: '浏览量', width: 80,height:100, align: 'center'}
            // , {field: 'id10', title: '加优', width: 100,height:100, align: 'center'}
            , {field: 'whetherRecommend', title: '置顶', width: 80,height:100, align: 'center'}
            , {field: 'createDate', title: '创建时间', width: 170,height:100, align: 'center'}
            , {field: 'reviewDate', title: '审核时间', width: 170,height:100, align: 'center'}
            , {field: 'reviewResult', title: '审核意见', width: 100,height:100, align: 'center'}
            , {field: 'reviewer', title: '审核人', width: 100,height:100, align: 'center'}
            , {field: 'whetherOverdue', title: '是否过期', width: 100,height:100, align: 'center'}
            , {fixed: 'right',field : 'tool',title : '操作',width : 350,align : 'center',toolbar : '#barDemo'}
        ]]
        , page: true
    });

    //监听搜索
    form.on('submit(LAY-user-front-search)', function (data) {
        var field = data.field;
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

    //头工具栏事件
    table.on('toolbar(order-table-toolbar)', function(obj){
        var checkData = table.checkStatus(obj.config.id).data;
        var ids = [];
        checkData.forEach(function(n,i){
            ids.push(n.pushId);
        });
        if(ids.length == 0){
            layer.alert("请选择优惠信息！");
            return false;
        }
        var updatePushObj = {};
        switch(obj.event){
            case 'all':
                /*var data = checkStatus.data;
                layer.alert(JSON.stringify(data));*/
                //获取查询表单数据
                var d = {};
                var t = $('#searchFormId').serializeArray();
                $.each(t, function() {
                    d[this.name] = this.value;
                });
                console.log(d)

                table.reload('order-table-toolbar', {
                    where: {
                        platform:null
                    },
                    page: {
                        curr: 1
                    }
                });
                break;
            case 'recommend':
                updatePushObj.recommendStatus = 'recommend';
                updatePushObj.pushId = ids.join(",");
                updatePushObj.recommendSortNumber = 10;
                layer.open({
                    title: '提示'
                    ,content: '是否设置为置顶状态？'
                    ,btn:['确定','取消']
                    ,yes:function(index, layero){
                        updatePushObj.serviceNoStr="view_recommend_update_submission";
                        $.simpleAjax('/view/v2/recommend/view_recommend_update_submission', 'POST', JSON.stringify(updatePushObj), "application/json;charset-UTF-8", returnFunction);
                        layer.close(index);
                    }
                    ,cancel: function(index, layero){
                        console.info("cancel");
                    }
                });
                break;
            case 'not_recommend':
                updatePushObj.recommendStatus = 'not_recommend';
                updatePushObj.pushId = ids.join(",");
                // updatePushObj.recommendSortNumber = 1;
                updatePushObj.recommendSortNumber = 10000;
                layer.open({
                    title: '提示'
                    ,content: '是否设置为下沉状态？'
                    ,btn:['确定','取消']
                    ,yes:function(index, layero){
                        updatePushObj.serviceNoStr="view_recommend_update_submission";
                        $.simpleAjax('/view/v2/recommend/view_recommend_update_submission', 'POST', JSON.stringify(updatePushObj), "application/json;charset-UTF-8", returnFunction);
                        layer.close(index);
                    }
                    ,cancel: function(index, layero){
                        console.info("cancel");
                    }
                });
                break;
            case 'normal':
                updatePushObj.recommendStatus = 'normal';
                updatePushObj.pushId = ids.join(",");
                // updatePushObj.recommendSortNumber = 1;
                updatePushObj.recommendSortNumber = 100;
                layer.open({
                    title: '提示'
                    ,content: '是否设置为普通状态？'
                    ,btn:['确定','取消']
                    ,yes:function(index, layero){
                        updatePushObj.serviceNoStr="view_recommend_update_submission";
                        $.simpleAjax('/view/v2/recommend/view_recommend_update_submission', 'POST', JSON.stringify(updatePushObj), "application/json;charset-UTF-8", returnFunction);
                        layer.close(index);
                    }
                    ,cancel: function(index, layero){
                        console.info("cancel");
                    }
                });
                break;
            // case 'overdue':
            //     updatePushObj.pushId = ids.join(",");
            //     updatePushObj.whetherOverdue = 'overdue';
            //     layer.open({
            //         title: '提示'
            //         ,content: '是否设置为过期？'
            //         ,btn:['确定','取消']
            //         ,yes:function(index, layero){
            //             updatePushObj.serviceNoStr="view_push_update_submission";
            //             $.simpleAjax('/view/v2/push/view_push_update_submission', 'POST', JSON.stringify(updatePushObj), "application/json;charset-UTF-8", returnFunction);
            //                 layer.close(index);
            //             }
            //             ,cancel: function(index, layero){
            //                 console.info("cancel");
            //             }
            //         });
            //     break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选': '未全选');
                break;

            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        };
    });

    //监听行工具事件
    table.on('tool(order-table-toolbar)', function (obj) {
        var data = obj.data;
        if (obj.event === 'update'){
            var width = document.documentElement.scrollWidth * 0.8 + "px";
            // var height = document.documentElement.scrollHeight * 0.2 + "px";
            var height = 500 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '优惠信息修改页面',
                content: "/view/v2/push/view_push_update_page?pushId="+data.pushId
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'examine'){
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.7 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '优惠信息审核',
                content: "/view/v2/push/view_push_examine_page?pushId="+data.pushId
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'details'){
            var width = document.documentElement.scrollWidth * 0.6 + "px";
            var height = document.documentElement.scrollHeight * 0.7 + "px";

            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '查看原始内容',
                content: "/view/v2/push/view_push_details_page?pushId="+data.pushId
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'overdue'){
            var updatePushObj = {};
            updatePushObj.pushId = data.pushId;
            if(data.whetherOverdue == '过期'){
                updatePushObj.whetherOverdue = 'not_overdue';
            }else{
                updatePushObj.whetherOverdue = 'overdue';
            }

            layer.open({
                title: '提示'
                ,content: '是否设置为过期？'
                ,btn:['确定','取消']
                ,yes:function(index, layero){
                    updatePushObj.serviceNoStr="view_push_update_submission";
                    $.simpleAjax('/view/v2/push/view_push_update_submission', 'POST', JSON.stringify(updatePushObj), "application/json;charset-UTF-8", returnFunction);
                    layer.close(index);
                }
                ,cancel: function(index, layero){
                    console.info("cancel");
                }
            });
        }
        // if (obj.event === 'recommend'){
        //     var checkData = table.checkStatus(obj.config.pushId).data;
        //     var ids = [];
        //     checkData.forEach(function(n,i){
        //         ids.push(n.commentId);
        //     });
        //     var updatePushObj = {};
        //     updatePushObj.recommendStatus = 'recommend';
        //     updatePushObj.pushId = ids.join(",");
        //     // updatePushObj.recommendSortNumber = 1;
        //     layer.open({
        //         title: '提示'
        //         ,content: '是否设置为推荐状态？'
        //         ,btn:['确定','取消']
        //         ,yes:function(index, layero){
        //             updatePushObj.serviceNoStr="view_recommend_update_submission";
        //             $.simpleAjax('/view/v2/recommend/view_recommend_update_submission', 'POST', JSON.stringify(updatePushObj), "application/json;charset-UTF-8", returnFunction);
        //             layer.close(index);
        //         }
        //         ,cancel: function(index, layero){
        //             console.info("cancel");
        //         }
        //     });
        // }
        //
        // if (obj.event === 'not_recommend'){
        //     var checkData = table.checkStatus(obj.config.pushId).data;
        //     var ids = [];
        //     checkData.forEach(function(n,i){
        //         ids.push(n.commentId);
        //     });
        //     var updatePushObj = {};
        //     updatePushObj.pushId = ids.join(",");
        //     updatePushObj.recommendStatus = 'not_recommend';
        //     updatePushObj.recommendSortNumber = 10000;
        //     layer.open({
        //         title: '提示'
        //         ,content: '是否设置为推荐状态？'
        //         ,btn:['确定','取消']
        //         ,yes:function(index, layero){
        //             updatePushObj.serviceNoStr="view_recommend_update_submission";
        //             $.simpleAjax('/view/v2/recommend/view_recommend_update_submission', 'POST', JSON.stringify(updatePushObj), "application/json;charset-UTF-8", returnFunction);
        //             layer.close(index);
        //         }
        //         ,cancel: function(index, layero){
        //             console.info("cancel");
        //         }
        //     });
        // }
        //
        // if (obj.event === 'normal'){
        //     var checkData = table.checkStatus(obj.config.pushId).data;
        //     var ids = [];
        //     checkData.forEach(function(n,i){
        //         ids.push(n.commentId);
        //     });
        //     var updatePushObj = {};
        //     updatePushObj.pushId = ids.join(",");
        //     updatePushObj.recommendStatus = 'normal';
        //     updatePushObj.recommendSortNumber = 100;
        //     layer.open({
        //         title: '提示'
        //         ,content: '是否设置为推荐状态？'
        //         ,btn:['确定','取消']
        //         ,yes:function(index, layero){
        //             updatePushObj.serviceNoStr="view_recommend_update_submission";
        //             $.simpleAjax('/view/v2/recommend/view_recommend_update_submission', 'POST', JSON.stringify(updatePushObj), "application/json;charset-UTF-8", returnFunction);
        //             layer.close(index);
        //         }
        //         ,cancel: function(index, layero){
        //             console.info("cancel");
        //         }
        //     });
        // }
    });

    function returnFunction(data) {
        if (data.code == '1') {
            layer.open({
                icon:1,
                title: "修改成功"
                ,content: data.msg
                ,yes: function(index, layero){
                    window.location.reload();
                }
            });
            return;

        } else {
            layer.msg(data.msg, {
                icon: 5,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
        }
    }
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

