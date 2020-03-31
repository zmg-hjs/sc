function UPLOAD_IMG_DEL(divs) {
    $("#"+divs).remove();
}
layui.config({
    base: '../../../static/' //静态资源所在路径
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
    isOrderPicNum = 0;
    isFoodPicListNum = 0;

    $(document).on('click', '#close', function () {
        parent.layui.admin.events.closeThisTabs();
    });




    laydate.render({
        elem: '#releaseDate'
        , type: 'datetime'
        , format: 'yyyy-MM-dd HH:mm:ss'
    });

    /*layui图片换位子-------------------------start----------------------------------------*/
    var upurl = "/pic/ossFileUpload";//上传图片地址
    var duotu = true;//是否为多图上传true false


    function getfileName(path){
        var filename=path.substring(path.lastIndexOf("/")+1,path.length);
        var id=filename.substring(0,filename.lastIndexOf("."));
        return id;
    }

    /**
     * 获取图片地址
     * @returns {string}
     */
    function getFoodPicListStr() {
        var foodlist= $("#upload_img_list").find("input");
        var list=new Array();
        for( i=0;i<foodlist.length;i++){
            var value=  foodlist[i].value;
            var obj={};
            obj.picUrl=value;
            obj.sort=i+1;
            if(i==0){
                obj.dispaly="true"
            }else {
                obj.dispaly="false";
            }
            list.push(obj);
        }

        return JSON.stringify(list);


    };

    /*
    上传图片
    */
    layui.use('upload', function() {
        upload = layui.upload;
        upload.render({
            elem: '#upload_img',
            url: upurl,
            multiple: duotu,
            before: function(obj) {
                layer.msg('图片上传中...', {
                    icon: 16,
                    shade: 0.01,
                    time: 0
                })
            },
            done: function(res) {
                layer.close(layer.msg());//关闭上传提示窗口
                if (duotu == true) {//调用多图上传方法,其中res.imgid为后台返回的一个随机数字
                    $('#upload_img_list').append('<dd class="item_img" id="' + res.data + '"><div class="operate"><i class="toleft layui-icon"></i><i class="toright layui-icon"></i><i onclick=UPLOAD_IMG_DEL("' + res.data + '") class="close layui-icon"></i></div><img src="' + res.data + '" class="img" ><input type="hidden" name="dzd_img[]" value="' + res.data + '" /></dd>');
                }else{//调用单图上传方法,其中res.imgid为后台返回的一个随机数字
                    $('#upload_img_list').append('<dd class="item_img" id="' + res.data + '"><div class="operate"><i onclick=UPLOAD_IMG_DEL("' + res.data + '") class="close layui-icon"></i></div><img src="' + res.data + '" class="img" ><input type="hidden" name="dzd_img" value="' + res.data + '" /></dd>');
                }
            }
        })
    });



    /*
    多图上传变换左右位置
    */
    $(document).on('click', '.toleft', function () {
        var item = $(this).parent().parent(".item_img");
        var item_left = item.prev(".item_img");
        if ($("#upload_img_list").children(".item_img").length >= 2) {
            if (item_left.length == 0) {
                item.insertAfter($("#upload_img_list").children(".item_img:last"))
            } else {
                item.insertBefore(item_left)
            }
        }
    });
    $(document).on('click', '.toright', function () {
        var item = $(this).parent().parent(".item_img");
        var item_right = item.next(".item_img");
        if ($("#upload_img_list").children(".item_img").length >= 2) {
            if (item_right.length == 0) {
                item.insertBefore($("#upload_img_list").children(".item_img:first"))
            } else {
                item.insertAfter(item_right)
            }
        }
    });



    /*layui图片换位子-------------------------end----------------------------------------*/


    var nowDate = new Date();
    nowDate.setDate(nowDate.getDate() + 1)
    nowDate.setHours(23);
    nowDate.setMinutes(59);
    nowDate.setSeconds(59);
    laydate.render({
        elem: '#lastEndDate'
        , type: 'datetime'
        , format: 'yyyy-MM-dd'
        , value: nowDate
        , ready: function (value) {

        }
        , done: function (value, date, endDate) {

        }
    });

    $(document).on('click', '.layui-btn.event-btn', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call($(this)) : '';
    }).on('click', '.upload-img-item .layui-icon', function () {

        var orderPicNum = --isOrderPicNum;
        if (orderPicNum < 1) {
            $('#upload_orderPic_add').css("display", 'inline-block');
        }
        var foodPicListNum = --isFoodPicListNum;
        if (foodPicListNum < 1) {
            $('#upload_foodPicList_add').css("display", 'inline-block');
        }
        var url = $(this).parent().find('img').prop('src');
        console.log(url);
        var type = $(this).parent().remove()
    });



    form.on('select(preferentialTypeFilter)', function (data) {
        if (data.value == 'ordinary') {
            $("#orderPriceDiv").show();
            $("#preferentialPriceDiv").hide();
            $("#combination_0").show();
            $("#combinationAdd").show();
            $("#preferentialCityDiv").hide();
            $("#busInfoDiv").show();
        }
        if (data.value == 'local') {
            $("#orderPriceDiv").show();
            $("#preferentialPriceDiv").hide();
            $("#combination_0").show();
            $("#combinationAdd").show();
            $("#preferentialCityDiv").show();
            $("#busInfoDiv").show();
        }
        if (data.value == 'nationwide') {
            $("#orderPriceDiv").hide();
            $("#preferentialPriceDiv").show();
            $("#combination_0").hide();
            $("#combinationAdd").hide();
            $("#preferentialCityDiv").hide();
            $("#busInfoDiv").hide();
        }
        form.render();
    });
    form.on('select(businessFilter)', function(data){
        $("#businessImg").remove();
        var imgHtml = ""
        if(data.value != null && data.value != undefined && data.value != ""){
            var url = data.value.split(',')[1];
            imgHtml = '<div class="upload-img-item" id="businessImg">\n' +
                // '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                '                <img src="' + url + '" style="border: 1px solid #c0c0c0;" />\n' +
                '          </div>';

        }else{
            imgHtml = '<div class="upload-img-item" id="businessImg"></div>';
        }
        $('#upload_bus_add').before(imgHtml);
    });
    form.on('select(provinceFilter)', function(data){
        var cities = city[data.value];
        $("#preferentialCity").empty();
        $("#preferentialCity").append("<option value=''>请选择</option>");
        for (var i = 0; i < cities.length; i++) {
            $option = $("<option/>");
            $option.attr("value", cities[i]);
            $option.text(cities[i]);
            $("#preferentialCity").append($option);

        }
        form.render();
    });

    layui.use('form', function () {

        //监听提交
        form.on('submit(component-form)', function (data) {

            getImgSrc();

            var searchObj = $("#searchFormId").serializeObject();
            var foodpicListStr= getFoodPicListStr();
            searchObj.foodPicListStr=foodpicListStr;
            //循环取出，循环次数为添加的标签个数 -1,通过添加后缀匹配
            var searchObjStr = JSON.stringify(searchObj);
            var combinationList = [];
            for (var i = 0; i < combinationNumber; i++) {
                var combinationName = "combinationName_" + i;
                var combinationPicAddress = "combinationPicAddress_" + i;
                var combinationType = "combinationType_" + i;
                var combinationPrice = "combinationPrice_" + i;
                if (searchObjStr.indexOf(combinationName)) {
                    var combination = {}
                    combination.title = searchObj[combinationType]
                    combination.url = searchObj[combinationName]
                    combination.price = searchObj[combinationPrice]
                    combination.picUrl = searchObj[combinationPicAddress]
                    if(JSON.stringify(combination).length>3){
                        combinationList.push(combination)
                    }
                }
            }
            var combinationListStr = JSON.stringify(combinationList);
            if(combinationListStr.length>50){
                searchObj.preferentialFoodListStr = combinationListStr;
            }

            var combination1List = [];
            for (var i = 0; i < combinationNumber1; i++) {
                var combinationName1 = "combinationName1_" + i;
                var combinationType1 = "combinationType1_" + i;
                if (searchObjStr.indexOf(combinationName1)) {
                    var combination1 = {}
                    combination1.title = searchObj[combinationType1]
                    combination1.url = searchObj[combinationName1]
                    if(JSON.stringify(combination1).length>3){
                        combination1List.push(combination1)
                    }
                }
            }
            var combination1ListStr = JSON.stringify(combination1List);
            if(combination1ListStr.length>25){
                searchObj.discountCouponListStr = combination1ListStr;
            }

            if($("#preferentialType").val() == 'nationwide'){
                searchObj.businessId = "111111111111111111111111_business";
            }else{
                searchObj.businessId = $("#businessId").val().split(',')[0];
            }


            // searchObj.preferentialPrice = $("#orderPrice").val();

            layer.open({
                title: '提示'
                , content: '是否确认新增'
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    searchObj.serviceNoStr = "view_push_add_submission";
                    $.simpleAjax('/view/v2/push/view_push_add_submission', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
                    layer.close(index);
                }
                , btn2: function (index) {
                    console.info("btn2");
                    layer.close(index);
                }
                , cancel: function (index, layero) {
                    console.info("cancel");
                }
            });


            return false;//这一行代码必须加，不然会自动刷新页面，这个和layui的封装有关，且returnFunction 也不会调用
        });
        form.render(); // 更新全部
    });

    function returnFunction(data) {
        if (data.code == '1') {
            layer.open({
                icon: 1,
                title: advice
                , content: data.msg
                , yes: function (index, layero) {
                    window.location.reload();
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

    var combinationNumber = 1

    function combinationAdd() {
        var setMealHtml = '<div id="combination_' + combinationNumber + '" >\n' +
            '                <div class="layui-row">\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <label class="layui-form-label required-tag">优惠餐品</label>\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationType_' + combinationNumber + '" name="combinationType_' + combinationNumber + '" placeholder="请输入餐品名称"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" lay-verify="required"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationName_' + combinationNumber + '" name="combinationName_' + combinationNumber + '" placeholder="请输入直达链接"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" lay-verify="required"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="layui-row">\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationPrice_' + combinationNumber + '" name="combinationPrice_' + combinationNumber + '" placeholder="请输入餐品价格"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" lay-verify="required"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '               </div>\n' +
            '\n' +
            '                <div class="layui-upload" style="margin-left: 168px;">\n' +
            '                    <div id="combinationPicAddress_' + combinationNumber + '" class="layui-upload-list" >\n' +
            '                        <input name="combinationPicAddress_' + combinationNumber + '" type="hidden" value="" lay-verify="pic"/>\n' +
            '                        <div class="upload-img-item" >\n' +
            '\n' +
            '                        </div>\n' +
            '                        <div class="upload-item-add" id="upload_combinationPic_add_' + combinationNumber + '"><i class="layui-icon layui-icon-add-1"></i>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <button  id="combinationDelete_0" name="combinationDelete_0" type="button" class="layui-btn">移除组合</button>\n' +
            '            </div>'

        $('#combinationAdd').before(setMealHtml);
        var id = '#upload_combinationPic_add_' + combinationNumber
        uploadPic(id, combinationNumber);
        combinationNumber++;
    }

    var combinationNumber1 = 1

    function combinationAdd1() {
        var setMealHtml = '<div id="combination1_' + combinationNumber1 + '" >\n' +
            '                <div class="layui-row">\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <label class="layui-form-label required-tag">优惠券领取</label>\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationType1_' + combinationNumber1 + '" name="combinationType1_' + combinationNumber1 + '" placeholder="输入券名"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" lay-verify="required"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationName1_' + combinationNumber1 + '" name="combinationName1_' + combinationNumber1 + '" placeholder="请输入领取地址"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" lay-verify="required"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '                <button  id="combinationDelete1_0" name="combinationDelete1_0" type="button" class="layui-btn">移除</button>\n' +
            '            </div>'

        $('#combinationAdd1').before(setMealHtml);
        combinationNumber1++;
    }

    function uploadPic(id, number) {
        upload.render({
            elem: id
            , url: '/pic/ossFileUpload'
            , multiple: true
            , field: 'file'
            , before: function (obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function (index, file, result) {
                    var imgHtml = '<div style="display: none" class="upload-img-item" >\n' +
                        '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                        '                <img data-key="filePreview_' + fileIndex + '" src="' + result + '" style="border: 1px solid #c0c0c0;" />\n' +
                        '          </div>';
                    $(id).before(imgHtml);
                    fileIndex++;
                });
            }, done: function (data) {
                if (data.code == '1') {
                    var url = data.data;
                    $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("combination_pic_address_" + number, url);
                    $("img[data-key='filePreview_" + (fileIndex - 1) + "']").parent().css("display", 'inline-block');
                } else {
                    layer.msg(data.msg, {
                        icon: 5,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
            }
        });
    }

    //发布人头像上传   upload_headPic_add
    upload.render({
        elem: '#upload_headPic_add'
        , url: '/pic/ossFileUpload'
        , multiple: true
        , field: 'file'
        , before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                var imgHtml = '<div style="display: none" class="upload-img-item" >\n' +
                    '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                    '                <img data-key="filePreview_' + fileIndex + '" src="' + result + '" style="border: 1px solid #c0c0c0;" />\n' +
                    '          </div>';
                $('#upload_headPic_add').before(imgHtml);
                fileIndex++;
            });
        }, done: function (data) {
            if (data.code == '1') {
                var url = data.data;
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("headPic_url", url);
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").parent().css("display", 'inline-block');
            } else {
                layer.msg(data.msg, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        }
    });

    //订单截图上传  upload_orderPic_add
    var orderPicIndex = 0;
    upload.render({
        elem: '#upload_orderPic_add'
        , url: '/pic/ossFileUpload'
        , multiple: true
        , field: 'file'
        , before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                var imgHtml = '<div class="upload-img-item" >\n' +
                    '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                    '                <img data-key="filePreview_' + fileIndex + '" src="' + result + '" style="border: 1px solid #c0c0c0;" />\n' +
                    '          </div>';
                $('#upload_orderPic_add').before(imgHtml);
                fileIndex++;
            });
        }, done: function (data) {
            if (data.code == '1') {
                var url = data.data;
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("orderPic_url", url);
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").parent().css("display", 'inline-block');
                var orderPicNum = ++isOrderPicNum;
                if (orderPicNum > 2) {
                    $('#upload_orderPic_add').css("display", 'none');
                }

            } else {
                layer.msg(data.msg, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        }
    });

    // 商品图片上传
    a = $("#upload_duixiang").FraUpload({
        view        : ".show",      // 视图输出位置
        url         : "/pic/ossFileUpload", // 上传接口
        fetch       : "img",   // 视图现在只支持img
        debug       : false,    // 是否开启调试模式
        /* 外部获得的回调接口 */
        onLoad: function(e){                    // 选择文件的回调方法
            console.log("外部: 初始化完成...");
        },
        breforePort: function (e) {         // 发送前触发
            console.log("文件发送之前触发");
        },
        successPort: function (e) {         // 发送成功触发
            console.log("文件发送成功");
            onload_image()
        },
        errorPort: function (e) {       // 发送失败触发
            console.log("文件发送失败");
            onload_image()
        },
        deletePost: function(e){    // 删除文件触发
            console.log("删除文件");
            console.log(e);
            alert('删除了'+e.filename)
            onload_image()
        },
        sort: function(e){      // 排序触发
            console.log("排序");
            onload_image()
        },
    });

    // 获取图片上传信息
    function onload_image(){
        var res = a.FraUpload.show()
        var ids = [];
        for(let k in res){
            this_val = res[k]
            if(!empty(res[k]['is_upload']) && !empty(res[k]['ajax'])){
                ajax_value = res[k]['ajax'];
                ids.push(ajax_value.data.id)
            }
        }
        $("#imagepath").val(ids);
        $('#geoJsonTxt').html(JsonFormat(res));
    }



    //餐品图片上传  upload_foodPicList_add
    upload.render({
        elem: '#upload_foodPicList_add'
        , url: '/pic/ossFileUpload'
        , multiple: true
        , field: 'file'
        , before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                var imgHtml = '<div class="upload-img-item" >\n' +
                    '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                    '                <img data-key="filePreview_' + fileIndex + '" src="' + result + '" style="border: 1px solid #c0c0c0;" />\n' +
                    // '                <input type="text" id="sort_'+ fileIndex + '" th:placeholder="请输入优惠金额" class="layui-input" style="width:50px;height: 22px;margin-top:3px;" />\n' +
                    '          </div>';
                $('#upload_foodPicList_add').before(imgHtml);
                fileIndex++;
            });
        }, done: function (data) {
            if (data.code == '1') {
                var url = data.data;
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("foodPicList_url", url);
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").parent().css("display", 'inline-block');
                var foodPicListNum = ++isFoodPicListNum;
                if (foodPicListNum > 10) {
                    $('#upload_foodPicList_add').css("display", 'none');
                }
            } else {
                layer.msg(data.msg, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        }
    });



    //获取点击事件，（新增，删除标签栏）（图片上传）
    $(document).click(function (e) {
        var id = e.target.id
        var last = id.charAt(id.length - 1)
        if (id == 'combinationDelete_' + last) {
            var parent = document.getElementById("searchFormId");
            var son = document.getElementById(e.target.parentElement.id);
            parent.removeChild(son);
            combinationNumber--;
        }
        if (id == 'combinationAdd') {
            combinationAdd();
        }
        if (id == 'combinationDelete1_' + last) {
            var parent = document.getElementById("searchFormId");
            var son = document.getElementById(e.target.parentElement.id);
            parent.removeChild(son);
            combinationNumber1--;
        }
        if (id == 'combinationAdd1') {
            combinationAdd1();
        }
    })
    var fileIndex = 0;
    layui.use('upload', function () {
        var combinationId = '#upload_combinationPic_add_0'
        var combinationNum = '0'
        uploadPic(combinationId, combinationNum)
    });

    /**
     * 获取所有图片路经
     */
    function getImgSrc() {
        var headPicUrl = [];
        var orderPicUrl = [];
        var foodPicListUrl = [];
        $("img[data-key^='filePreview_']").each(function (index, item) {

            var foodPicListJson = {};

            if ($(item).attr("headPic_url")) {
                headPicUrl.push($(item).attr("headPic_url"))
            }
            if ($(item).attr("orderPic_url")) {
                orderPicUrl.push($(item).attr("orderPic_url"));
            }
            if ($(item).attr("foodPicList_url")) {
                foodPicListJson.picUrl = $(item).attr("foodPicList_url");
                if (foodPicListUrl.length == 0) {
                    foodPicListJson.dispaly = "true";
                } else {
                    foodPicListJson.dispaly = "false";
                }
                foodPicListJson.sort = foodPicListUrl.length + 1;
                foodPicListUrl.push(foodPicListJson);
            }
        });
        if (headPicUrl.length > 0) {
            $("input[name='headPicStr']").val(JSON.stringify(headPicUrl));
        }
        if (orderPicUrl.length > 0) {
            $("input[name='orderPicStr']").val(JSON.stringify(orderPicUrl));
        }
        if (foodPicListUrl.length > 0) {
            $("input[name='foodPicListStr']").val(JSON.stringify(foodPicListUrl));
        }


        var urlArr = []
        var arrObj = {}
        //根据图片的总类型生成数组，拼接属性名
        for (let i = 0; i < combinationNumber; i++) {
            arrObj['urlArr' + i] = [];
            $("img[data-key^='filePreview_']").each(function (index, item) {
                var picAddr = $(item).attr("combination_pic_address_" + i)
                if (picAddr) {
                    arrObj['urlArr' + i].push(picAddr)
                }
                // if ($(item).attr("pic_url_f0")) {
                //     urlArr.push($(item).attr("pic_url_f0"));
                // }
            });
            $("input[name='combinationPicAddress_" + i + "']").val(arrObj['urlArr' + i].join(","));
        }
        //添加到对应的input
        $("input[name='foodAddressListStr']").val(urlArr.join(","));

    }



    // 商品图片上传
    a = $("#upload_duixiang").FraUpload({
        view        : ".show",      // 视图输出位置
        url         : "upload.php", // 上传接口
        fetch       : "img",   // 视图现在只支持img
        debug       : false,    // 是否开启调试模式
        /* 外部获得的回调接口 */
        onLoad: function(e){                    // 选择文件的回调方法
            console.log("外部: 初始化完成...");
        },
        breforePort: function (e) {         // 发送前触发
            console.log("文件发送之前触发");
        },
        successPort: function (e) {         // 发送成功触发
            console.log("文件发送成功");
            onload_image()
        },
        errorPort: function (e) {       // 发送失败触发
            console.log("文件发送失败");
            onload_image()
        },
        deletePost: function(e){    // 删除文件触发
            console.log("删除文件");
            console.log(e);
            alert('删除了'+e.filename)
            onload_image()
        },
        sort: function(e){      // 排序触发
            console.log("排序");
            onload_image()
        },
    });

    // 获取图片上传信息
    function onload_image(){
        var res = a.FraUpload.show()
        var ids = [];
        for(let k in res){
            this_val = res[k]
            if(!empty(res[k]['is_upload']) && !empty(res[k]['ajax'])){
                ajax_value = res[k]['ajax'];
                ids.push(ajax_value.data.id)
            }
        }
        $("#imagepath").val(ids);
        $('#geoJsonTxt').html(JsonFormat(res));
    }


// 将类库返回的json打印到pre中
    function JsonFormat(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/&/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '' + match + '';
        });
    }
    /**
     * 判断变量是否为空
     */
    function empty(value) {
        if(value=="" || value==undefined || value==null || value==false || value==[] || value=={}){
            return true;
        }else{
            return false;
        }
    }

    //组合前端显示
    var discountCouponNumber;
    var preferentialFoodNumber;

    function setView() {
        //从前端获取组合的数据
        var discountCouponListStr = $("#discountCouponListStr").val();
        var discountCouponList = JSON.parse(discountCouponListStr);
        discountCouponNumber = discountCouponList.length;
        combinationNumber1 = discountCouponNumber;
        //对数据进行循环遍历
        for (let i = 0; i < discountCouponNumber; i++) {
            //将数据进行填充，添加到前端
            var setMealHtml = '<div id="combination1_' + i + '" >\n' +
                '                <div class="layui-row">\n' +
                '                    <div class="layui-col-xs6">\n' +
                '                        <div class="layui-form-item">\n' +
                '                            <label class="layui-form-label required-tag">优惠券领取</label>\n' +
                '                            <div class="layui-input-block">\n' +
                '                                <input type="text" id="combinationType1_' + i + '" name="combinationType1_' + i + '" placeholder="输入券名"\n' +
                '                                       autocomplete="off"  value="' + discountCouponList[i].title + '"\n' +
                '                                       class="layui-input" lay-verify="required"/>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div class="layui-col-xs6">\n' +
                '                        <div class="layui-form-item">\n' +
                '                            <div class="layui-input-block">\n' +
                '                                <input type="text" id="combinationName1_' + i + '" name="combinationName1_' + i + '" placeholder="请输入领取地址"\n' +
                '                                       autocomplete="off" value="' + discountCouponList[i].url + '"\n' +
                '                                       class="layui-input" lay-verify="required"/>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\n' +
                '                <button  id="combinationDelete1_0" name="combinationDelete1_0" type="button" class="layui-btn">移除</button>\n' +
                '            </div>'
            $('#combinationAdd1').before(setMealHtml);
        }


        //从前端获取组合的数据
        var preferentialFoodListStr = $("#preferentialFoodListStr").val();
        var preferentialFoodList = JSON.parse(preferentialFoodListStr);
        preferentialFoodNumber = preferentialFoodList.length;
        combinationNumber = preferentialFoodNumber;
        //对数据进行循环遍历
        for (let i = 0; i < preferentialFoodNumber; i++) {
            var picStr = "";
            var picUrlArr = preferentialFoodList[i].picUrl.split(',');
            for (var p = 0; p < picUrlArr.length; p++) {
                picStr += '                  <div class="upload-img-item" >\n' +
                    '                            <i class="layui-icon layui-icon-close-fill"></i>\n' +
                    '                            <img data-key="filePreview_"\n' +
                    '                                 combination_pic_address_' + i + ' = "' + picUrlArr[p] + '" \n' +
                    '                                 src="' + picUrlArr[p] + '" \n' +
                    '                                 style="border: 1px solid #c0c0c0;" />\n' +
                    '                        </div>\n';
            }
            //将数据进行填充，添加到前端
            var setMealHtml = '<div id="combination_' + i + '" >\n' +
                '                <div class="layui-row">\n' +
                '                    <div class="layui-col-xs6">\n' +
                '                        <div class="layui-form-item">\n' +
                '                            <label class="layui-form-label required-tag">优惠餐品</label>\n' +
                '                            <div class="layui-input-block">\n' +
                '                                <input type="text" id="combinationType_' + i + '" name="combinationType_' + i + '" placeholder="请输入餐品名称"\n' +
                '                                       autocomplete="off" value="' + preferentialFoodList[i].title + '"\n' +
                '                                       class="layui-input" lay-verify="required"/>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div class="layui-col-xs6">\n' +
                '                        <div class="layui-form-item">\n' +
                '                            <div class="layui-input-block">\n' +
                '                                <input type="text" id="combinationName_' + i + '" name="combinationName_' + i + '" placeholder="请输入直达链接"\n' +
                '                                       autocomplete="off" value="' + preferentialFoodList[i].url + '"\n' +
                '                                       class="layui-input" lay-verify="required"/>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\n' +
                '                <div class="layui-row">\n' +
                '                    <div class="layui-col-xs6">\n' +
                '                        <div class="layui-form-item">\n' +
                '                            <div class="layui-input-block">\n' +
                '                                <input type="text" id="combinationPrice_' + i + '" name="combinationPrice_' + i + '" placeholder="请输入餐品价格"\n' +
                '                                       autocomplete="off" value="' + preferentialFoodList[i].price + '"\n' +
                '                                       class="layui-input" lay-verify="required"/>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '               </div>\n' +
                '\n' +
                '                <div class="layui-upload" style="margin-left: 168px;">\n' +
                '                    <div id="combinationPicAddress_' + i + '" class="layui-upload-list" >\n' +
                '                        <input name="combinationPicAddress_' + i + '" type="hidden" value="" lay-verify="pic"/>\n' +
                picStr +
                '                        <div class="upload-item-add" id="upload_combinationPic_add_' + i + '"><i class="layui-icon layui-icon-add-1"></i>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <button  id="combinationDelete_0" name="combinationDelete_0" type="button" class="layui-btn">移除组合</button>\n' +
                '            </div>'

            $('#combinationAdd').before(setMealHtml);
            var id = '#upload_combinationPic_add_' + combinationNumber
            uploadPic(id, combinationNumber);
        }
    }

    //自定义验证规则
    form.verify({
        specifiedInstruction: function (value) {
            if (value.length > 20) {
                return '不能超过20字符';
            }
        }

    });

    function initData() {
        // loadOwner($("select[name='owner']"));
        // setView();
    }
    var pro = ["北京","天津","上海","重庆","河北","山西","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","海南","四川","贵州","云南","陕西","甘肃","青海","内蒙古","广西","西藏","宁夏","新疆维吾尔自治区","香港","澳门","台湾"];

    var city = {北京:["东城区","西城区","崇文区","宣武区","朝阳区","海淀区","丰台区","石景山区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","门头沟区","密云县","延庆县"],
        天津:["和平区","河东区","河西区","南开区","河北区","红桥区","东丽区","西青区","北辰区","津南区","武清区","宝坻区","滨海新区","静海县","宁河县","蓟县"],
        上海:["黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","闵行区","宝山区","嘉定区","浦东新区","金山区","松江区","青浦区","奉贤区","崇明县"],
        重庆:["渝中区","大渡口区","江北区","南岸区","北碚区","渝北区","巴南区","长寿区","双桥区","沙坪坝区","万盛区","万州区","涪陵区","黔江区","永川区","合川区","江津区","九龙坡区","南川区","綦江县","潼南县","荣昌县","璧山县","大足县","铜梁县","梁平县","开县","忠县","城口县","垫江县","武隆县","丰都县","奉节县",
            "云阳县","巫溪县","巫山县","石柱土家族自治县","秀山土家族苗族自治县","酉阳土家族苗族自治县","彭水苗族土家族自治县"],
        河北:["石家庄","唐山","秦皇岛","邯郸","邢台","保定","张家口","承德","沧州","廊坊","衡水"],
        山西:["太原","大同","阳泉","长治","晋城","朔州","晋中","运城","忻州","临汾","吕梁"],
        辽宁:["沈阳","大连","鞍山","抚顺","本溪","丹东","锦州","营口","阜新","辽阳","盘锦","铁岭","朝阳","葫芦岛"],
        吉林:["长春","吉林","四平","辽源","通化","白山","松原","白城","延边朝鲜族自治州"],
        黑龙江:["哈尔滨","齐齐哈尔","鹤岗","双鸭山","鸡西","大庆","伊春","牡丹江","佳木斯","七台河","黑河","绥化","大兴安岭"],
        江苏:["南京","苏州","无锡","常州","镇江","南通","泰州","扬州","盐城","连云港","徐州","淮安","宿迁"],
        浙江:["杭州","宁波","温州","嘉兴","湖州","绍兴","金华","衢州","舟山","台州","丽水"],
        安徽:["合肥","芜湖","蚌埠","淮南","马鞍山","淮北","铜陵","安庆","黄山","滁州","阜阳","宿州","巢湖","六安","亳州","池州","宣城"],
        福建:["福州","厦门","莆田","三明","泉州","漳州","南平","龙岩","宁德"],
        江西:["南昌","景德镇","萍乡","九江","新余","鹰潭","赣州","吉安","宜春","抚州","上饶"],
        山东:["济南","青岛","淄博","枣庄","东营","烟台","潍坊","济宁","泰安","威海","日照","莱芜","临沂","德州","聊城","滨州","菏泽"],
        河南:["郑州","开封","洛阳","平顶山","安阳","鹤壁","新乡","焦作","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","周口","驻马店"],
        湖北:["武汉","黄石","十堰","荆州","宜昌","襄樊","鄂州","荆门","孝感","黄冈","咸宁","随州","恩施"],
        湖南:["长沙","株洲","湘潭","衡阳","邵阳","岳阳","常德","张家界","益阳","郴州","永州","怀化","娄底","湘西"],
        广东:["广州","深圳","珠海","汕头","韶关","佛山","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","东莞","中山","潮州","揭阳","云浮"],
        海南:["海口","三亚"],
        四川:["成都","自贡","攀枝花","泸州","德阳","绵阳","广元","遂宁","内江","乐山","南充","眉山","宜宾","广安","达州","雅安","巴中","资阳","阿坝","甘孜","凉山"],
        贵州:["贵阳","六盘水","遵义","安顺","铜仁","毕节","黔西南","黔东南","黔南"],
        云南:["昆明","曲靖","玉溪","保山","昭通","丽江","普洱","临沧","德宏","怒江","迪庆","大理","楚雄","红河","文山","西双版纳"],
        陕西:["西安","铜川","宝鸡","咸阳","渭南","延安","汉中","榆林","安康","商洛"],甘肃:["兰州","嘉峪关","金昌","白银","天水","武威","酒泉","张掖","庆阳","平凉","定西","陇南","临夏","甘南"],青海:["西宁","海东","海北","海南","黄南","果洛","玉树","海西"],
        内蒙古:["呼和浩特","包头","乌海","赤峰","通辽","鄂尔多斯","呼伦贝尔","巴彦淖尔","乌兰察布","锡林郭勒盟","兴安盟","阿拉善盟"],广西:["南宁","柳州","桂林","梧州","北海","防城港","钦州","贵港","玉林","百色","贺州","河池","来宾","崇左"],西藏:["拉萨","那曲","昌都","林芝","山南","日喀则","阿里"],
        宁夏:["银川","石嘴山","吴忠","固原","中卫"],新疆维吾尔自治区:["乌鲁木齐","克拉玛依","吐鲁番","哈密","和田","阿克苏","喀什","克孜勒苏","巴音郭楞","昌吉","博尔塔拉","伊犁","塔城","阿勒泰"],香港:["香港岛","九龙东","九龙西","新界东","新界西"],澳门:["澳门半岛","离岛"],
        台湾:["台北","高雄","基隆","新竹","台中","嘉义","台南市"]};

    // 初始化控件数据
    $(document).ready(function () {
        initData();
        $("#province").append("<option value=''>请选择</option>");
        for(var i=0;i<pro.length;i++){
            $option=$("<option/>");
            $option.attr("value",pro[i]);
            $option.text(pro[i]);
            $("#province").append($option);
        }
    });

    form.render();

})
;