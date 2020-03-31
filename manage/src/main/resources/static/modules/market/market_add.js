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


    /**
     * 获取所有图片路经
     */
    function getImgSrc() {
        var urlArr = [];
        $("img[data-key^='filePreview_']").each(function (index, item) {
            urlArr.push($(item).attr("src_url"));
        });
        $("input[name='pictureAddress']").val(urlArr.join(","));
    }

    //监听提交
    form.on('submit(component-form)', function (data) {
        getImgSrc();
        var searchObj = $("#searchFormId").serializeObject();
        $.simpleAjax('/product/addProduct', 'POST', JSON.stringify(searchObj), "application/json", returnFunction);
        return false;//这一行代码必须加，不然会自动刷新页面，这个和layui的封装有关，且returnFunction 也不会调用
    });

    /*只支持字母、数字、中横线、下横线，4位<=长度<=20位*/
    $(document).on('blur', '#sku', function (data) {
        var reg = /^[A-Za-z0-9-_]{4,20}$/;
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value == '' ){
            layui.$(this).after('<span class="error-tip">'+ productRequiredRule +'</span>');
            layui.$(this).css('border-color','red');
            return;
        }

        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productSkuRule +'</span>');
            layui.$(this).css('border-color','red');
            return;
            // layer.msg(productSkuRule, {
            //     icon: 5,
            //     time: 2000 //2秒关闭（如果不配置，默认是3秒）
            // });
        }
        var sku = $(this).val();
        var owner = $("#owner").val();
        if (owner != "") {
            if (sku != "") {
                var productVo = checkSkuByOwner(owner,sku);
                if (productVo != null) {
                    layui.$(this).after('<span class="error-tip">'+ prompt_check_sku +'</span>');
                    layui.$(this).css('border-color','red');
                }
            }
        } else {
            layui.$(this).after('<span class="error-tip">'+ prompt_owner +'</span>');
            layui.$(this).css('border-color','red');
            return;
        }






    }).on('focus', '#sku', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });
    /*只支持字母、数字、中横线、下横线，4位<=长度<=20位*/
    $(document).on('blur', '#ean', function (data) {
        var reg = /^[A-Za-z0-9-_]{4,20}$/;
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value == '' ){
            layui.$(this).after('<span class="error-tip">'+ productRequiredRule +'</span>');
            layui.$(this).css('border-color','red');
            return;
        }
        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productEanRule +'</span>');
            layui.$(this).css('border-color','red');
            return;
        }
        var ean = $(this).val();
        var owner = $("#owner").val();
        if (owner != "") {
            if (ean != "") {
                var productVo = checkEanByOwner(owner,ean);
                if (productVo != null) {
                    layui.$(this).after('<span class="error-tip">'+ prompt_check_ean +'</span>');
                    layui.$(this).css('border-color','red');
                }
            }
        } else {
            layui.$(this).after('<span class="error-tip">'+ prompt_owner +'</span>');
            layui.$(this).css('border-color','red');
            return;
        }


    }).on('focus', '#ean', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });

    /*英文名称不能写中文*/
    $(document).on('blur', '#enName', function (data) {
        var reg =  /^[^\u4e00-\u9fa5]+$/;
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value == '' ){
            layui.$(this).after('<span class="error-tip">'+ productRequiredRule +'</span>');
            layui.$(this).css('border-color','red');
        }
        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productEnRule +'</span>');
            layui.$(this).css('border-color','red');
        }
    }).on('focus', '#enName', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });

    /*英文名称不能写中文*/
    $(document).on('blur', '#declareEnname', function (data) {
        var reg =  /^[^\u4e00-\u9fa5]+$/;
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productEnRule +'</span>');
            layui.$(this).css('border-color','red');
        }
    }).on('focus', '#declareEnname', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });


    /*只支持字母、数字、中横线、下横线，4位<=长度<=20位*/
    $(document).on('blur', '#materielCode', function (data) {
        var reg = /^[A-Za-z0-9-_]{4,20}$/;
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productMaterielCodeRule +'</span>');
            layui.$(this).css('border-color','red');

        }
    }).on('focus', '#materielCode', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });
    /*0.001<=重量<=9999.999*/
    $(document).on('blur', '#weight', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        var reg = /^([1-9][0-9]{0,3}|0)(\.[0-9]{1,3})?$/;
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value == '' ){
            layui.$(this).after('<span class="error-tip">'+ productRequiredRule +'</span>');
            layui.$(this).css('border-color','red');
        }
        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productWeightRule +'</span>');
            layui.$(this).css('border-color','red');
        }
    }).on('focus', '#weight', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });


    /*0.01<=长<=9999.99*/
    $(document).on('blur', '#length', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        var reg = /^([1-9][0-9]{0,3}|0)(\.[0-9]{1,2})?$/;
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value == '' ){
            layui.$(this).after('<span class="error-tip">'+ productRequiredRule +'</span>');
            layui.$(this).css('border-color','red');
        }
        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productLengthRule +'</span>');
            layui.$(this).css('border-color','red');
        }

    }).on('focus', '#length', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });
    /*0.01<=宽度<=9999.99*/
    $(document).on('blur', '#width', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        var reg = /^([1-9][0-9]{0,3}|0)(\.[0-9]{1,2})?$/;
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value == '' ){
            layui.$(this).after('<span class="error-tip">'+ productRequiredRule +'</span>');
            layui.$(this).css('border-color','red');
        }
        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productWidthRule +'</span>');
            layui.$(this).css('border-color','red');
        }
    }).on('focus', '#width', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });


    /*0.01<=高<=9999.99*/
    $(document).on('blur', '#height', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        var reg = /^([1-9][0-9]{0,3}|0)(\.[0-9]{1,2})?$/;
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
        if (this.value == '' ){
            layui.$(this).after('<span class="error-tip">'+ productRequiredRule +'</span>');
            layui.$(this).css('border-color','red');
        }
        if (this.value != '' && !reg.test(this.value)) {
            layui.$(this).after('<span class="error-tip">'+ productHeightRule +'</span>');
            layui.$(this).css('border-color','red');
        }
    }).on('focus', '#height', function (data) {
        layui.$(this).css('border-color','#b6e4f1');
        layui.$(this).closest('.layui-form-item').find('.error-tip').remove();
    });


    function returnFunction(data) {
        if (data.code == '0') {
            layer.open({
                icon:1,
                title: advice
                ,content: data.msg
                ,yes: function(index, layero){
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
            layer.msg(data.msg, {
                icon: 5,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
        }
    }

    function initData() {
        loadOwner($("select[name='owner']"));
    }

    // 初始化控件数据
    $(document).ready(function () {
        initData();
    });

})
;