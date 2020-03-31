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
        , url: '/sc/manage/user/manage_staff_user_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'username', title: '微信昵称', minWidth: 150,fixed: 'left', align: 'center'}
            , {
                field: 'headPictureUrl',
                title: '头像',
                width: 150,
                align: 'center',
                templet: function(item) {
                    // var headPictureUrl = item.headPictureUrl;
                    var headPictureUrl = "http://img2.imgtn.bdimg.com/it/u=3098178195,2642187561&fm=26&gp=0.jpg";
                    var result = '<a href="'+ headPictureUrl + '" target="_blank " title="点击查看">' +
                        '<img src="' + headPictureUrl + '" style="height:100%;" />' +
                        '</a>'+'&nbsp&nbsp&nbsp&nbsp';
                    return result;
                }
            }
            , {field: 'actualName', title: '姓名', fixed: 'left', width: 150, align: 'center'}
            , {field: 'idNumber', title: '身份证号', width: 100, align: 'center'}
            , {field: 'address', title: '家庭地址', width: 150, align: 'center'}
            , {field: 'position', title: '职位', width: 150, align: 'center'}
            , {field: 'createDateStr', title: '创建时间', width: 200, align: 'center'}
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

