layui.config({
    base: '../../static/' //静态资源所在路径
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
        , url: '/user/invitationRecord'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'inviterId', title: '邀请人', minWidth: 200,fixed: 'left', align: 'center'}
            , {field: 'invitedPersonId', title: '被邀请人', minWidth: 200, align: 'center'}
            , {field: 'invitedPersonPhoneNumber', title: '邀请人电话号码', minWidth: 200, align: 'center'}
            , {field: 'createDate', title: '创建时间', minWidth: 200, align: 'center'}
            //,{fixed: 'right',field : 'tool',title : '操作',minWidth : 200,align : 'center',toolbar : '#barDemo'}
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
        if (obj.event === 'delete') {
            var searchObj = {}
            searchObj.id = data.id;
            $.simpleAjax('/business', 'DELETE', JSON.stringify(searchObj), "application/json;charset-UTF-8",returnFunction_dalete);
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
    /*点击生效失效按钮-------end--------*/
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

