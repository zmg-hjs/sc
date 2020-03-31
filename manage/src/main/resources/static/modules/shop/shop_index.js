layui.config({
    base: '../../static/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
    , formSelects: '../lib/formSelects/formSelects-v4'
}).use(['index', 'table', 'form', 'laydate', 'formSelects', 'upload'], function () {
    layui.form.config.verify.required[1] = requiredNotNull;
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
    var fileIndex = 1;
    //多图片上传
    upload.render({
        elem: '#upload_item_add'
        , url: '/product/fileUpload'
        , multiple: true
        , field: 'file'
        , before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                var imgHtml = '<div style="display: none" class="upload-img-item" >\n' +
                    '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                    '                <img data-key="filePreview_' + fileIndex + '" src="' + result + '" style="border: 1px solid #c0c0c0;" />\n' +
                    '          </div>';
                $('#upload_item_add').before(imgHtml);
                fileIndex++;
            });
        }, done: function (data) {
            if (data.code == '0') {
                var url = data.data;
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("src_url", url);
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").parent().css("display", 'inline-block');
            } else {
                layer.msg(data.msg, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        }
    });




    //监听提交
    form.on('submit(component-form)', function (data) {
        var blankStr = "   ";
        var checkResult = true;
        var errArrayInfo = new Array();
        var searchObj = $("#searchFormId").serializeObject();
        var content = searchObj.content;
        var number = searchObj.number;
        var myJson = new Array();
        if (number == null || number == '' || number.length < 10) {
            errArrayInfo.push("编号没有填写");
            checkResult = false;
        }

        var arrayList = content.split(/[\n]/);
        for (var i = 0; i < arrayList.length; i++) {
            var arrayOther = arrayList[i].trim().split(" ")
            var array = arrayOther.filter(function (s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
            });
            if (array.length != 4) {
                errArrayInfo.push("第" + (i + 1) + "行，格式错误");
                checkResult = false;
            }
            var shopEntityJson = {};
            shopEntityJson.phone = array[0];
            shopEntityJson.fullName = array[1];
            shopEntityJson.shopName = array[2];
            shopEntityJson.situation = array[3];
            shopEntityJson.number = searchObj.number;
            myJson.push(shopEntityJson);

        }
        var text = "";
        if (errArrayInfo != null && errArrayInfo.length > 0) {
            text += "Error info show：\n"
        }
        for (var i = 0; i < errArrayInfo.length; i++) {
            text += errArrayInfo[i] + "\n\n";

        }
        text += "数据显示：\n"
        for (var i = 0; i < myJson.length; i++) {
            var jsonObject = myJson[i];
            text += "第" + (i + 1) + "行" + blankStr + "电话：" + jsonObject.phone + blankStr + "姓名：" + jsonObject.fullName + blankStr + "店名：" + jsonObject.shopName + blankStr + "情况：" + blankStr + jsonObject.situation
                + "  \n "
        }

        var searchObj = $("#checkContentid").text(text);
        if (checkResult) {
            layer.confirm("校验通过，是否提交", {
                icon: 3,
                btn: ["确定提交", "取消"] //按钮
            }, function () {
                $.simpleAjax('/shop', 'POST', JSON.stringify(myJson), "application/json", returnFunction);

            })
        } else {

        }
        return false;//这一行代码必须加，不然会自动刷新页面，这个和layui的封装有关，且returnFunction 也不会调用
    });









    function returnFunction(data) {
        if (data.code == '1') {
            layer.open({
                title: "消息提示"
                , content: data.message
                , yes: function (index, layero) {
                    window.location.reload();
                }
            });
            return;

            /*   layer.msg(data.msg, {
                   icon: 1,
                   time: 2000 //2秒关闭（如果不配置，默认是3秒）
               }, function () {
                   window.location.reload();
               });*/
        } else {
            layer.msg(data.message, {
                icon: 5,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
        }
    }

    function initData() {
        var blankStr = "   ";
        loadOwner($("select[name='owner']"));
        var content = "默认格式数据\n15673903693" + blankStr + "刘小鹿" + blankStr + "炸鸡汉堡店铺" + blankStr + "这个店铺的情况很糟糕\n" +
            "15673903639" + blankStr + "刘大鹿" + blankStr + "炸鸡披萨店铺" + blankStr + "这个店铺的情况很不错"

        $('#content').attr('placeholder', content);
    }

    // 初始化控件数据
    $(document).ready(function () {
        initData();
    });

})
;