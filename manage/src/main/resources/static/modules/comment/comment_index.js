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
    //表格渲染
    table.render({
        elem: '#order-table-toolbar'
        , url: '/view/v2/comment/view_comment_index_data?serviceNoStr=view_comment_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'pushTitle', title: '优惠信息标题', minWidth: 150,fixed: 'left', align: 'center'}
            , {field: 'commentContent', title: '评论内容', fixed: 'left', width: 150, align: 'center'}
            , {field: 'userLike', title: '用户点赞', width: 100, align: 'center'}
            , {field: 'operatorLike', title: '运营点赞', minWidth: 100, align: 'center'}
            , {field: 'commenterNickname', title: '评论发布人昵称', width: 150, align: 'center'}
            , {field: 'commenterId', title: '评论发布人帐号', width: 150, align: 'center'}
            , {field: 'createDate', title: '评论时间', minWidth: 200, align: 'center'}
            , {field: 'status', title: '状态', minWidth: 200, align: 'center'}
            , {field: 'reviewResult', title: '审核结果', minWidth: 200, align: 'center'}
            , {field: 'whetherVisible', title: '展示', width: 200, align: 'center'}
            ,{fixed: 'right',field : 'tool',title : '操作',minWidth : 200,align : 'center',toolbar : '#barDemo'}
        ]]
        , page: true
        //回调函数查询不同状态数据总数
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
        var data = table.checkStatus(obj.config.id).data;
        var ids = [];
         data.forEach(function(n,i){
             ids.push(n.commentId);
         });
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

                table.reload('order-table-toolbar', {
                    where: {
                        platform:null
                    },
                    page: {
                        curr: 1
                    }
                });
                break;
            case 'visible':
                var searchObj = {};
                searchObj.serviceNoStr="view_comment_update_submission";
                searchObj.whetherVisible = "visible";
                searchObj.commentId = ids.join(",");
                layer.open({
                    title: '提示'
                    ,content: '是否确认'
                    ,btn:['确定','取消']
                    ,yes:function(index, layero){
                        console.info("yes");
                        searchObj.serviceNoStr="view_comment_update_submission";
                        $.simpleAjax('/view/v2/comment/view_comment_update_submission', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
                        layer.close(index);
                    }
                    ,btn2:function (index) {
                        console.info("btn2");
                        layer.close(index);
                    }
                    ,cancel: function(index, layero){
                        console.info("cancel");
                    }
                });
                table.reload('order-table-toolbar', {
                    where: {
                        platform:11
                    },
                    page: {
                        curr: 1
                    }
                });
                break;
            case 'invisible':
                var searchObj = {};
                searchObj.serviceNoStr="view_comment_update_submission";
                searchObj.whetherVisible = "not_visible";
                searchObj.commentId = ids.join(",");
                layer.open({
                    title: '提示'
                    ,content: '是否确认'
                    ,btn:['确定','取消']
                    ,yes:function(index, layero){
                        console.info("yes");
                        searchObj.serviceNoStr="view_comment_update_submission";
                        $.simpleAjax('/view/v2/comment/view_comment_update_submission', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
                        layer.close(index);
                    }
                    ,btn2:function (index) {
                        console.info("btn2");
                        layer.close(index);
                    }
                    ,cancel: function(index, layero){
                        console.info("cancel");
                    }
                });
                table.reload('order-table-toolbar', {
                    where: {
                        platform:17
                    },
                    page: {
                        curr: 1
                    }
                });
                break;
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
        console.dir(data);
        if (obj.event === 'update'){
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '评论审核',
                content: "/view/v2/comment/view_comment_update_page?commentId="+data.commentId
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }

        if (obj.event === 'manage'){
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '评论管理',
                content: "/view/v2/comment/view_comment_manage_page?commentId="+data.commentId
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }

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

