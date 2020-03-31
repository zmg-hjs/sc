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
        , url: '/view/v2/report/view_report_index_data?serviceNoStr=view_report_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'releaseNickname', title: '发布人昵称', minWidth: 150,fixed: 'left', align: 'center'}
            , {field: 'preferentialType', title: '优惠类型', fixed: 'left', width: 150, align: 'center'}
            , {field: 'title', title: '优惠信息标题', width: 200, align: 'center'}
            , {field: 'reporterName', title: '举报人', width: 150, align: 'center'}
            , {field: 'createDate', title: '举报时间', width: 150, align: 'center'}
            , {field: 'reportType', title: '举报类型', minWidth: 100, align: 'center'}
            , {field: 'reportStatus', title: '状态', minWidth: 100, align: 'center'}
            , {field: 'dealResult', title: '处理结果', minWidth: 100, align: 'center'}
            , {field: 'operate', title: '处理操作', minWidth: 100, align: 'center'}
            , {fixed: 'right',field : 'tool',title : '操作',minWidth : 200,align : 'center',toolbar : '#barDemo'}
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
        //var checkStatus = table.checkStatus(obj.config.id);
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
            case 'unaudited':
                /*var data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');*/
                table.reload('order-table-toolbar', {
                    where: {
                        platform:11
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
        if (obj.event === 'delete') {
            /*var searchObj = {}
            searchObj.id = data.id;
            $.simpleAjax('/business', 'DELETE', JSON.stringify(searchObj), "application/json;charset-UTF-8",returnFunction_dalete);*/
        }

        if (obj.event === 'update'){
            var width = document.documentElement.scrollWidth * 0.5 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '举报信息修改',
                content: "/view/v2/report/view_report_update_page?reportId="+data.reportId
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'detail'){
            var width = document.documentElement.scrollWidth * 0.5 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '举报信息详情',
                content: "/view/v2/report/view_report_detail_page?reportId="+data.reportId
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }

    });


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

