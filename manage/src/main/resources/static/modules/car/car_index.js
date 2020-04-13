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
        , url: '/sc/manage/car/manage_car_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'userActualName', title: '发起拼车人名',  width: 200, align: 'center'}
            , {field: 'telephone', title: '发起拼车人手机号',  width: 200, align: 'center'}
            , {field: 'carNum', title: '车牌号',  width: 200, align: 'center'}
            , {field: 'startPosition', title: '起始地', width: 200, align: 'center'}
            , {field: 'destination', title: '目的地', width: 200, align: 'center'}
            , {field: 'startTimeStr', title: '出发时间', width: 200, align: 'center'}
            , {field: 'peopleNum', title: '拼车人数', width: 200, align: 'center'}
            , {field: 'peopleNow', title: '现有人数', width: 200, align: 'center'}
            , {field: 'createDateStr', title: '创建时间', width: 200, align: 'center'}
            , {field : 'tool',fixed: 'right',title : '操作',minWidth : 260,align : 'center',toolbar : '#barDemo'}
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
                title: '拼车信息',
                content: "/sc/manage/car/manage_car_find_page?id="+data.id
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
            //自定义头工具栏右侧图标 - 提示
            case 'in_progress':
                //获取查询表单数据
                d.carpoolStatus='in_progress';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djB").css("background-color", "#ffffff");
                $("#djA").css("background-color", "#b1b0b0");
                $("#djC").css("background-color", "#ffffff");
                break;
            case 'complete':
                //获取查询表单数据
                d.carpoolStatus='complete';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djA").css("background-color", "#ffffff");
                $("#djC").css("background-color", "#ffffff");
                $("#djB").css("background-color", "#b1b0b0");
                break;
            case 'cancel':
                //获取查询表单数据
                d.carpoolStatus='cancel';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djA").css("background-color", "#ffffff");
                $("#djB").css("background-color", "#ffffff");
                $("#djC").css("background-color", "#b1b0b0");
                break;
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        };
    });


    form.on('select(selectType-filter)', function (obj) {
        $("input[name='selectValue']").val(null);

    })




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

