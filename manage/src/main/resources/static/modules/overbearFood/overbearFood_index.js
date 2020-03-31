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
        , url: '/view/v2/overbearfood/view_overbearfood_index_data?serviceNoStr=view_overbearfood_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'shopName', title: '商家名称', fixed: 'left', width: 150, align: 'center'}
            , {field: 'releaseNumber', title: '发布数量', width: 100, align: 'center'}
            , {field: 'surplusNumber', title: '剩余数量', width: 100, align: 'center'}
            , {field: 'specifiedInstruction', title: '指定商品说明', width: 100, align: 'center'}
            , {field: 'registrationFeeStr', title: '报名费', width: 100, align: 'center'}
            , {field: 'maxReturnMoney', title: '最高返利金额', width: 100, align: 'center'}
            , {field: 'foodTypeStr', title: '产品类型', width: 100, align: 'center'}
            , {field: 'brandStr', title: '品牌', width: 100, align: 'center'}
            , {field: 'returnAmount', title: '返利折扣', minWidth: 100, align: 'center'}
            , {field: 'orderingExplain', title: '点餐说明', minWidth: 100, align: 'center'}
            , {field: 'orderingMethod', title: '点餐方式', minWidth: 100, align: 'center'}
            , {field: 'orderingRules', title: '点餐规则', minWidth: 100, align: 'center'}
            , {field: 'example', title: '举例', minWidth: 100, align: 'center'}
            , {field: 'specifiedInstruction', title: '指定说明', minWidth: 100, align: 'center'}
            , {
                field: 'foodAddressList',
                title: '霸王餐图片',
                minWidth: 200,
                align: 'center',
                templet: function (item) {
                    var list = item.foodAddressList;
                    var result = '';
                    if (list != null) {
                        for (var i = 0; i < list.length; i++) {
                            result += '<a href="' +  list[i] + '" target="_blank " title="点击查看">' +
                                '<img src="' +  list[i] + '" style="height:100%;" />' +
                                '</a>' + '&nbsp&nbsp&nbsp&nbsp';
                        }
                    }

                    return result;
                }
            }
            , {field: 'lastEndDateStr', title: '截至失效日期', minWidth: 200, align: 'center'}
            , {field: 'orderingTime', title: '点餐时间', minWidth: 200, align: 'center'}
            , {field: 'releaseDateStr', title: '发布日期', width: 200, align: 'center'}
            , {field: 'createDateStr', title: '创建时间', minWidth: 200, align: 'center'}
            , {fixed: 'right', field: 'tool', title: '操作', minWidth: 250, align: 'center', toolbar: '#barDemo'}
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
        var data = obj.data
            , layEvent = obj.event;
        if (layEvent === 'delete') {
            var searchObj = {}
            searchObj.id = data.id;
            $.simpleAjax('/overbearFood', 'DELETE', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
        }
        var width = document.documentElement.scrollWidth * 0.9 + "px";
        var height = document.documentElement.scrollHeight * 0.9 + "px";
        if (layEvent === 'update') {
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '霸王餐修改页面',
                content: "/view/v2/overbearfood/view_overbearfood_update_page?id=" + data.id+"&serviceNoStr=view_overbearfood_detail_data"
                , maxmin: true
                , zIndex: layer.zIndex //重点1
            });
        }
        if (layEvent === 'copy') {
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '霸王餐复制页面',
                content: "/view/v2/overbearfood/view_overbearfood_copy_page?id=" + data.id+"&serviceNoStr=view_overbearfood_detail_data"
                , maxmin: true
                , zIndex: layer.zIndex //重点1
            });
        }
    });

    function returnFunction(data) {
        if (data.code == '1') {
            layer.msg('删除成功', {
                icon: 6,
                time: 2000
            });
            //刷新页面
            table.reload('order-table-toolbar', {});
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

    var url;

    function initData() {
        $.simpleAjax('/url', 'GET', null, "application/json;charset-UTF-8", returnFunction_url);
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

