/*
 *   WingSing CONFIDENTIAL
 *   _____________________
 *
 *   [2014] - [2015] WingSing Supply Chain Management Co. (Shenzhen) Ltd.
 *   All Rights Reserved.
 *
 *   NOTICE: All information contained herein is, and remains the property of
 *   WingSing Supply Chain Management Co. (Shenzhen) Ltd. and its suppliers, if
 *   any. The intellectual and technical concepts contained herein are proprietary
 *   to WingSing Supply Chain Management Co. (Shenzhen) Ltd. and its suppliers and
 *   may be covered by China and Foreign Patents, patents in process, and are
 *   protected by trade secret or copyright law. Dissemination of this information
 *   or reproduction of this material is strictly forbidden unless prior written
 *   permission is obtained from WingSing Supply Chain Management Co. (Shenzhen)
 *   Ltd.
 */

layui.config({
    base: '../../../static/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
    , formSelects: '../lib/formSelects/formSelects-v4'
}).use(['index', 'table', 'form', 'laydate', 'upload', 'formSelects'], function () {
    layui.form.config.verify.required[1]=requiredNotNull;
    var $ = layui.$,
        form = layui.form,
        laydate = layui.laydate,
        table = layui.table,
        upload = layui.upload,
        formSelects = layui.formSelects;
    laydate.render({
        elem: '#test1'
        , type: 'datetime'
        , format: 'yyyy-MM-dd HH:mm'
    });
    //事件
    var active = {
        addRow: function () {
            var tableBody = $(this).closest('.layui-form').find('.layui-table tbody');
            var no = tableBody.find('tr').length;
            var trStr = $('#order-edit-row-temp').html();
            var trNode = $(trStr);
            trNode.find('td').eq(0).html(no + 1);
            tableBody.append(trNode);
        },
        deleteRow: function () {
            var tbody = $(this).closest('.layui-form').find('.layui-table tbody');
            $(this).parent().parent().remove();
            //tr序号重新排序
            var trList = tbody.find('tr');
            $.each(trList, function (i, item) {
                $(item).find('td').eq(0).html(i + 1);
            });
        }
    };

    $(document).on('click', '.layui-btn.event-btn', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call($(this)) : '';
    }).on('click', '.upload-img-item .layui-icon', function () {
        var url = $(this).parent().find('img').prop('src');
        console.log(url);
        var type = $(this).parent().remove()
    });
    //监听提交
    form.on('submit(component-form_success)', function (data) {
        var searchObj = $("#searchFormId").serializeObject();
        searchObj.status='BUY_AUDITED'
        searchObj.serviceNoStr='view_review_review_submission';
        $.ajax({
            url: '/view/v2/overbearfood/view_review_review_submission',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(searchObj),
            success: function (data) {
                if (data.code == '1') {
                    layer.msg(data.msg, {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        window.location.reload();
                    });
                } else {
                    layer.msg(data.msg, {
                        icon: 5,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
            }
        });
        return false;
    });
    //监听提交
    form.on('submit(component-form_fail)', function (data) {
        var searchObj = $("#searchFormId").serializeObject();
        searchObj.status='BUY_AUDITFAILED';
        searchObj.serviceNoStr='view_review_review_submission';
        $.ajax({
            url: '/view/v2/overbearfood/view_review_review_submission',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(searchObj),
            success: function (data) {
                if (data.code == '1') {
                    layer.msg(data.msg, {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        window.location.reload();
                    });
                } else {
                    layer.msg(data.msg, {
                        icon: 5,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
            }
        });
        return false;
    });
    function initData() {
        loadOwner($("select[name='owner']"));
    }
    // 初始化控件数据
    $(document).ready(function(){
	    initData();
    });

});