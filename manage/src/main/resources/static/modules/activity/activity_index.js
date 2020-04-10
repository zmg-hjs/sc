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
        elem: '#time'
        , type: 'date'
        , range: '~'
        , format: 'yyyy-MM-dd'
    });

    //表格渲染
    table.render({
        elem: '#order-table-toolbar'
        , url: '/sc/manage/activity/manage_activity_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'title', title: '标题',  width: 200, align: 'center'}
            , {field: 'hostParty', title: '举办方',  width: 200, align: 'center'}
            , {field: 'activityStatusStr', title: '活动状态',  width: 200, align: 'center'}
            , {field: 'committeesNumber', title: '最终结果人数',  width: 200, align: 'center'}
            , {field: 'activityStartTimeStr', title: '活动开始时间',  width: 200, align: 'center'}
            , {field: 'votingEndTimeStr', title: '活动结束时间', width: 200, align: 'center'}
            , {field : 'tool',fixed: 'right',title : '操作',minWidth : 500,align : 'center',toolbar : '#barDemo'}
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

    //监听行工具事件
    table.on('tool(order-table-toolbar)', function (obj) {
        var data = obj.data;
        console.log(data.id)
        if (obj.event === 'find'){
            console.log(data.id)
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '工作人员登记信息',
                content: "/sc/manage/activity/manage_activity_find_page?id="+data.id
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'examine'){
            console.log(data.id)
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '工作人员信息审核页面',
                content: "/sc/manage/activity/manage_activity_examine_page?id="+data.id
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'update'){
            console.log(data.id)
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '工作人员信息修改页面',
                content: "/sc/manage/activity/manage_activity_update_page?id="+data.id
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'findenroll'){
            console.log(data.id)
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '选举人员',
                content: "/sc/manage/enroll/manage_enroll_page?id="+data.id
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'activityResult'){
            console.log(data.id)
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '工作人员信息修改页面',
                content: "/sc/manage/activity/manage_activity_result_page?id="+data.id
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
    });

    //头工具栏事件
    table.on('toolbar(order-table-toolbar)', function(obj){
        var d = {};
        var t = $('#searchFormId').serializeArray();
        $.each(t, function() {
            d[this.name] = this.value;
        });
        switch(obj.event){
            case 'invalid':
                //获取查询表单数据
                d.whetherValid='invalid';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djA").css("background-color", "#ffffff");
                $("#djB").css("background-color", "#b1b0b0");
                break;
            case 'valid':
                d.whetherValid='valid';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djA").css("background-color", "#b1b0b0");
                $("#djB").css("background-color", "#ffffff");
                break;
            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
            case 'add':
                var width = document.documentElement.scrollWidth * 0.9 + "px";
                var height = document.documentElement.scrollHeight * 0.9 + "px";
                var width = document.documentElement.scrollWidth * 0.9 + "px";
                var height = document.documentElement.scrollHeight * 0.9 + "px";
                layer.open({
                    type: 2,
                    skin: 'open-class',
                    area: [width, height],
                    title: '工作人员信息添加页面',
                    content: "/sc/manage/activity/manage_activity_add_page"
                    ,maxmin: true
                    ,zIndex: layer.zIndex //重点1
                });
                break;
        };
    });


    form.on('select(selectType-filter)', function (obj) {
        $("input[name='selectValue']").val(null);

    })

    // function djA(dom){
    //     var colloction=$(".djsA")
    //     $.each(colloction, function() {
    //         $(this).removeClass("end");
    //         $(this).addClass("start")
    //     });
    //     $(this).removeClass("start");
    //     $(this).addClass("end")
    // }
    // function djB(dom){
    //     console.log("11111111111111")
    //     var colloction=$(".djsB")
    //     $.each(colloction, function() {
    //         $(this).removeClass("end");
    //         $(this).addClass("start")
    //     });
    //     $(this).removeClass("start");
    //     $(this).addClass("end")
    // }



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

