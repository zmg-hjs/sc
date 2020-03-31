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
        , url: '/downRecord'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'id', title: '文件编号', fixed: 'left', minWidth: 300, align: 'center'}
            , {field: 'process', title: '进度', width: 100, align: 'center'}
            , {field: 'createDate', title: '创建日期', width: 200, align: 'center'}
            ,{fixed: 'right',field : 'tool',title : '操作',width : 200,align : 'center',toolbar : '#barDemo'}
        ]]
        , page: true
        //回调函数查询不同状态数据总数
    });

    //监听搜索
    form.on('submit(LAY-user-front-search)', function (data) {
        var field = data.field;
        var createDateRange=   field.createDateRange;
        var releaseDateRange=   field.releaseDateRange;
        if(createDateRange!=null&&createDateRange.length>0){
            var createDateRangeArray =createDateRange.split("~");
            field.startCreateDate= createDateRangeArray[0];
            field.endCreateDate= createDateRangeArray[1]+" 23:59:59";
        }

        if(releaseDateRange!=null&&releaseDateRange.length>0){
            var releaseDateRangeArray =releaseDateRange.split("~");
            field.startReleaseDate= releaseDateRangeArray[0];
            field.endReleaseDate= releaseDateRangeArray[1]+" 23:59:59";
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
        if (obj.event === 'down') {
            var downAddress = url + data.downAddress
            window.location.href = downAddress
        }

    });
    function returnFunction(data) {
        if (data.code == '1') {
            layer.msg('删除成功',{
                icon:6,
                time:2000
            });
            //刷新页面
            table.reload('order-table-toolbar', {
            });
        } else {
            layer.msg(data.message, {
                icon: 5,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });

        }
    }
    //头工具栏事件
    table.on('toolbar(order-table-toolbar)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var idList = getCheckboxId(checkStatus);
        var number = idList.length;
        switch (obj.event) {
            case 'taskeffect':
                if (number > 0) {
                    layer.confirm(confirmationOfvalidSelectedRecords + "?",
                        {
                            icon: 3,
                            title: info,
                            btn: [yes, no]
                        },
                        function (index) {
                            var searchObj = $("#searchFormId").serializeObject();
                            searchObj.checkBoxIdList = idList;
                            var dataObject = JSON.stringify(searchObj);
                            onclickStatusButton(dataObject, 1);
                        });
                } else {
                    layer.open({
                        icon: 0,
                        title: advice
                        , content: choose_product
                    });
                    return;
                }
                break;
            case 'invalid':
                if (number > 0) {
                    layer.confirm(confirmationFailureCheckRecord + "?",
                        {
                            icon: 3,
                            title: info,
                            btn: [yes, no]
                        },
                        function (index) {
                            var searchObj = $("#searchFormId").serializeObject();
                            searchObj.checkBoxIdList = idList;
                            var dataObject = JSON.stringify(searchObj);
                            onclickStatusButton(dataObject, 0);
                        });
                } else {
                    layer.open({
                        icon: 0,
                        title: advice
                        , content: choose_product
                    });
                    return;
                }
                break;
            case 'export':
                if (number > 0) {
                    layer.confirm(confirmExportCheckedRecord + "?",
                        {
                            icon: 3,
                            title: info,
                            btn: [yes, no]
                        },
                        function (index) {
                            $('#checkBoxIdList').val(idList);
                            $('#searchFormId').attr("target", "export_iframe");
                            $('#searchFormId').attr("action", "/product/exportProduct");
                            $('#searchFormId').submit();
                            layer.close(index);
                        });
                } else {
                    layer.confirm(verifyThatAllRecordsAreExported + "?",
                        {
                            icon: 3,
                            title: info,
                            btn: [yes, no]
                        },
                        function (index) {
                            $('#checkBoxIdList').val(idList);
                            $('#searchFormId').attr("target", "export_iframe");
                            $('#searchFormId').attr("action", "/product/exportProduct");
                            $('#searchFormId').submit();
                            layer.close(index);
                        });
                    return;
                }
                break;
            case 'synchronize':
                if (number <= 0) {
                    layer.open({
                        icon: 0,
                        title: advice,
                        content: choose_product
                    });
                    return;
                }
                layer.confirm(synchronize_confirm,
                    {
                        icon: 3,
                        title: info,
                        btn: [yes, no]
                    }, function () {
                        var queryData = {};
                        queryData['checkBoxIdList'] = idList;
                        $.ajax({
                            url: '/product/synchronize',
                            dataType: 'JSON',
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(queryData),
                            success: function (data) {
                                if (data.code == '0') {
                                    successMsg(data.msg);
                                } else {
                                    errorMsg(data.msg);
                                }
                            }
                        })
                    })
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
        if (data.code == '0') {
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
    var url =""
    function initData() {
        $.simpleAjax('/url', 'GET', null, "application/json;charset-UTF-8",returnFunction_url);
        loadOwner($("select[name='owner']"));
    }
    function returnFunction_url(data) {
        url = data
    }
    // 初始化控件数据
    $(document).ready(function () {
        initData();
    });

});

