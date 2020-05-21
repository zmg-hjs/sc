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
        elem: '#test1'
        ,type: 'month'
    });

    //表格渲染
    table.render({
        elem: '#order-table-toolbar'
        , url: '/sc/manage/payment/manage_payment_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'residentUserActualName', title: '居民姓名',  width: 200, align: 'center'}
            , {field: 'residentUserPhoneNumber', title: '联系方式', width: 200, align: 'center'}
            , {field: 'residentUserAddress', title: '居民地址', width: 200, align: 'center'}
            , {field: 'propertyCost', title: '物业费用', width: 200, align: 'center'}
            , {field: 'paymentStatusStr', title: '状态', width: 200, align: 'center'}
            , {field: 'timeFrame', title: '物业费时间', width: 200, align: 'center'}
            , {field: 'createDateStr', title: '创建时间', width: 200, align: 'center'}
            ,{fixed: 'right',field : 'tool',title : '操作',minWidth : 350,align : 'center',toolbar : '#barDemo'}
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
        if (obj.event === 'find'){
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '缴费信息详情',
                content: "/sc/manage/payment/manage_payment_find_page?id="+data.id
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'examine'){
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '物业缴费信息审核',
                content: "/sc/manage/payment/manage_payment_examine_page?id="+data.id
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
        if (obj.event === 'update1'){
            console.log(data.id)
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '修改缴费信息',
                content: "/sc/manage/payment/manage_payment_update_page?id="+data.id
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });

        }
        if (obj.event === 'update2'){
            console.log(data.id)
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '发送缴费信息',
                content: "/sc/manage/payment/manage_payment_send_page?id="+data.id
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
            case 'all':
                //获取查询表单数据
                d.paymentStatus='';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djA").css("background-color", "#b1b0b0");
                $("#djB").css("background-color", "#ffffff");
                $("#djC").css("background-color", "#ffffff");
                $("#djD").css("background-color", "#ffffff");
                break;
            case 'to_be_sent':
                d.paymentStatus='to_be_sent';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djB").css("background-color", "#b1b0b0");
                $("#djA").css("background-color", "#ffffff");
                $("#djC").css("background-color", "#ffffff");
                $("#djD").css("background-color", "#ffffff");
                break;
            case 'paid':
                d.paymentStatus='paid';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djC").css("background-color", "#b1b0b0");
                $("#djB").css("background-color", "#ffffff");
                $("#djA").css("background-color", "#ffffff");
                $("#djD").css("background-color", "#ffffff");
                break;
            case 'unpaid':
                d.paymentStatus='unpaid';
                table.reload('order-table-toolbar', {
                    where: d,
                    page: {
                        curr: 1
                    }
                });
                $("#djD").css("background-color", "#b1b0b0");
                $("#djB").css("background-color", "#ffffff");
                $("#djC").css("background-color", "#ffffff");
                $("#djA").css("background-color", "#ffffff");
                break;
            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
            case 'addList':
                var width = document.documentElement.scrollWidth * 0.9 + "px";
                var height = document.documentElement.scrollHeight * 0.9 + "px";
                layer.open({
                    type: 2,
                    skin: 'open-class',
                    area: [width, height],
                    title: '生成缴费信息（全部）',
                    content: "/sc/manage/payment/manage_payment_add_list_page"
                    ,maxmin: true
                    ,zIndex: layer.zIndex //重点1
                });
                break;
        };
    });


    form.on('select(selectType-filter)', function (obj) {
        $("input[name='selectValue']").val(null);

    })

    function returnFunction(data) {
        if (data.code == '1') {
            layer.open({
                icon:1,
                title: advice
                ,content: data.msg
                ,yes: function(index, layero){
                    var index = parent.layer.getFrameIndex(window.name);
                    // parent.layui.table.reload('items');//重载父页表格，参数为表格ID
                    parent.layer.close(index);
                    window.parent.location.reload();
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

