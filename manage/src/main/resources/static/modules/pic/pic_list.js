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
        , url: '/pic'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'id', title: 'id', fixed: 'left', minWidth: 170, align: 'left'}
            , {
                field: 'picCategoryName', title: '图片类型', width: 120, align: 'left'
            }
            , {
                field: 'relativePath', title: '图片展示', width: 120, align: 'left',
                templet: function (item) {
                    // style:'height:48px;width:48px;line-height:48px!important;
                    return  "<div><img src="+item.relativePath+"></div>'";
                }
            }
            , {field: 'picName', title: '图片名称', width: 200, align: 'left'}
            , {field: 'picPrice', title: '图片价格', width: 180, align: 'left'}
            , {field: 'picInfo', title: '图片信息', width: 180, align: 'left'}
            , {field: 'createDate', title: '创建时间', width: 300, align: 'left'}
            , {field: 'founder', title: '创建人', width: 300, align: 'left'}
            // , {
            //     field: 'status', title: status, width: 120, align: 'left',
            //     templet: function (item) {
            //         return item.status == '1' ? taskEffect : invalid;
            //     }
            // }
            , {
                fixed: 'right',
                title: '操作',
                align: 'left',
                minWidth: 150,
                templet: "#oper"
            }
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
        if (obj.event === 'process') {
            //设置加功信息
            layer.open({
                type: 2,
                skin: 'open-class',
                area: ['650px', '250px'],
                title: 'SKU :' + data.sku,
                content: "process?sku=" + data.sku + "&owner=" + data.owner + "&id=" + data.id
            });
        } else if (obj.event === 'see') {
            layer.open({
                type: 2,
                skin: 'open-class',
                area: ['930px', '550px'],
                title: 'SKU :' + data.sku,
                content: "detail?sku=" + data.sku + "&owner=" + data.owner + "&checkBoxId=" + data.id
                //,shade: 0
                , maxmin: true
                , zIndex: layer.zIndex //重点1
            });
        } else if (obj.event === 'print') {
            window.location.href = "/productLabel/exportPDF?owner=" + data.owner + "&sku=" + data.sku + "&languageCode=" + (language == null ? "zh" : language);
        }

        if (obj.event === 'edit') {
            $("#toEditProduct").attr("lay-href", "/product/update?id=" + data.id);
            $("#toEditProduct").click();
        }
    });

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

    function initData() {
        loadOwner($("select[name='owner']"));
    }

    // 初始化控件数据
    $(document).ready(function () {
        initData();
    });

});

