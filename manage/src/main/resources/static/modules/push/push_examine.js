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

    $(document).on('click','#close',function(){
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);//关闭当前页
        // window.parent.location.reload();
    });

    laydate.render({
        elem: '#releaseDate'
        , type: 'datetime'
        , format: 'yyyy-MM-dd HH:mm:ss'
    });
    var nowDate = new Date();
    nowDate.setDate(nowDate.getDate() + 1)
    nowDate.setHours(23);
    nowDate.setMinutes(59);
    nowDate.setSeconds(59);
    laydate.render({
        elem: '#lastEndDate'
        , type: 'datetime'
        , format: 'yyyy-MM-dd'
        ,value:nowDate
        , ready: function (value) {

        }
        , done: function(value, date, endDate) {

        }
    });

    $(document).on('click', '.layui-btn.event-btn', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call($(this)) : '';
    }).on('click', '.upload-img-item .layui-icon', function () {
        var url = $(this).parent().find('img').prop('src');
        console.log(url);
        var type = $(this).parent().remove()
    });


    /*layui图片换位子-------------------------start----------------------------------------*/

    var upurl = "/pic/ossFileUpload";//上传图片地址
    var duotu = true;//是否为多图上传true false


    function getfileName(path){
        var filename=path.substring(path.lastIndexOf("/")+1,path.length);
        var id=filename.substring(0,filename.lastIndexOf("."));
        return id;
    }
    function showPicList() {
        var foodPicListStr = $("#foodPicListStr").val();
        if(foodPicListStr != null && foodPicListStr.length > 10) {
            var foodPicList = JSON.parse(foodPicListStr);
            for (var i = 0; i < foodPicList.length; i++) {
                var id = getfileName(foodPicList[i].picUrl);
                $('#upload_img_list').append('<dd class="item_img" id="' + id + '"><div class="operate"><i class="toleft layui-icon"></i><i class="toright layui-icon"></i><i onclick=UPLOAD_IMG_DEL("' + id + '") class="close layui-icon"></i></div><img src="' + foodPicList[i].picUrl + '" class="img" ><input type="hidden" name="dzd_img[]" value="' + foodPicList[i].picUrl + '" /></dd>');
            }
        }
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


    form.on('select(businessFilter)', function(data){
        $("#businessImg").remove();
        if(data.value != null && data.value != undefined){
            var url = data.value.split(',')[1];
            var imgHtml = '<div class="upload-img-item" id="businessImg">\n' +
                // '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                '                <img src="' + url + '" style="border: 1px solid #c0c0c0;" />\n' +
                '          </div>';
            $('#upload_bus_add').before(imgHtml);
        }
    });
    layui.use('form', function () {

        //监听提交
        form.on('submit(component-form)', function (data) {

            var searchObj = $("#searchFormId").serializeObject();
            var foodpicListStr= getFoodPicListStr();
            searchObj.foodPicListStr=foodpicListStr;

            getImgSrc();
            //循环取出，循环次数为添加的标签个数 -1,通过添加后缀匹配
            var searchObjStr = JSON.stringify(searchObj);
            var combinationList = [];
            for (var i = 0; i < combinationNumber; i++) {
                var combinationName = "combinationName_" + i;
                var combinationPicAddress = "combinationPicAddress_" + i;
                var combinationType = "combinationType_" + i;
                var combinationPrice = "combinationPrice_"+i;
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

            searchObj.businessId = $("#businessId").val().split(',')[0];
            // searchObj.preferentialPrice = $("#orderPrice").val();
            layer.open({
                title: '提示'
                ,content: '是否确认审核'
                ,btn:['确定','取消']
                ,yes:function(index, layero){
                    console.info("yes");
                    searchObj.serviceNoStr="view_push_review_submission";
                    $.simpleAjax('/view/v2/push/view_push_review_submission', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
                    layer.close(index);
                }
                ,btn2:function (index) {
                    console.info("btn2");
                    layer.close(index);
                }
                ,cancel: function(index, layero){
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
                icon:1,
                title: '审核成功'
                ,content: data.msg
                ,yes: function(index, layero){
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);//关闭当前页
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
    var combinationNumber = 1
    function combinationAdd(){
        var setMealHtml='<div id="combination_' + combinationNumber + '" >\n' +
            '                <div class="layui-row">\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <label class="layui-form-label required-tag">优惠餐品</label>\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationType_' + combinationNumber + '" name="combinationType_' + combinationNumber + '" placeholder="请输入餐品名称"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationName_' + combinationNumber + '" name="combinationName_' + combinationNumber + '" placeholder="请输入直达链接"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input"/>\n' +
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
            '                                       class="layui-input"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '               </div>\n'+
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
        uploadPic(id,combinationNumber);
        combinationNumber++;
    }

    var combinationNumber1 = 1
    function combinationAdd1(){
        var setMealHtml='<div id="combination1_' + combinationNumber1 + '" >\n' +
            '                <div class="layui-row">\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <label class="layui-form-label required-tag">优惠券领取</label>\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationType1_' + combinationNumber1 + '" name="combinationType1_' + combinationNumber1 + '" placeholder="输入券名"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" />\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationName1_' + combinationNumber1 + '" name="combinationName1_' + combinationNumber1 + '" placeholder="请输入领取地址"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" />\n' +
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

    function uploadPic(id,number){
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
                    $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("combination_pic_address_" + number , url);
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
    upload.render({
        elem: '#upload_orderPic_add'
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
                $('#upload_orderPic_add').before(imgHtml);
                fileIndex++;
            });
        }, done: function (data) {
            if (data.code == '1') {
                var url = data.data;
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("orderPic_url", url);
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").parent().css("display", 'inline-block');
            } else {
                layer.msg(data.msg, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        }
    });

    //餐品图片上传  upload_foodPicList_add
    upload.render({
        elem: '#upload_foodPicList_add'
        , url: '/pic/ossFileUpload'
        , multiple: true
        , field: 'file'
        , before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                var imgHtml = '<div style="display: none" class="upload-img-item" >\n' +
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
            var parent=document.getElementById("searchFormId");
            var son=document.getElementById(e.target.parentElement.id);
            parent.removeChild(son);
            combinationNumber--;
        }
        if (id == 'combinationAdd') {
            combinationAdd();
        }
        if (id == 'combinationDelete1_' + last) {
            var parent=document.getElementById("searchFormId");
            var son=document.getElementById(e.target.parentElement.id);
            parent.removeChild(son);
            combinationNumber1--;
        }
        if (id == 'combinationAdd1') {
            combinationAdd1();
        }
    })
    var fileIndex = 0;
    layui.use('upload', function(){
        var combinationId = '#upload_combinationPic_add_0'
        var combinationNum = '0'
        uploadPic(combinationId,combinationNum)
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

            if ($(item).attr("headPic_url")){
                headPicUrl.push($(item).attr("headPic_url"))
            }
            if ($(item).attr("orderPic_url")){
                orderPicUrl.push($(item).attr("orderPic_url"));
            }
            if ($(item).attr("foodPicList_url")){
                foodPicListJson.picUrl = $(item).attr("foodPicList_url");
                if(foodPicListUrl.length == 0){
                    foodPicListJson.dispaly = "true";
                }else{
                    foodPicListJson.dispaly = "false";
                }
                foodPicListJson.sort = foodPicListUrl.length+1;
                foodPicListUrl.push(foodPicListJson);
            }
        });
        if(headPicUrl.length > 0){
            $("input[name='headPicStr']").val(JSON.stringify(headPicUrl));
        }
        if(orderPicUrl.length > 0){
            $("input[name='orderPicStr']").val(JSON.stringify(orderPicUrl));
        }
        if(foodPicListUrl.length > 0){
            $("input[name='foodPicListStr']").val(JSON.stringify(foodPicListUrl));
        }


        var urlArr = []
        var arrObj = {}
        //根据图片的总类型生成数组，拼接属性名
        for (let i = 0; i < combinationNumber; i++) {
            arrObj['urlArr' + i] = [];
            $("img[data-key^='filePreview_']").each(function (index, item) {
                var picAddr = $(item).attr("combination_pic_address_" + i)
                if (picAddr){
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


    //组合前端显示
    var discountCouponNumber;
    var preferentialFoodNumber;
    function setView() {
        showPicList();
        var orderPicStr = $("#orderPicStr").val();
        if(orderPicStr != null && orderPicStr.length > 10) {
            var orderPic = JSON.parse(orderPicStr);
            for (var i = 0; i < orderPic.length; i++) {
                var imgHtml = '<div class="upload-img-item" >\n' +
                    '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                    '                <img data-key="filePreview_' + i + '" ' +
                    '                   src="' + orderPic[i] + '" ' +
                    '                   orderPic_url="' + orderPic[i] + '" style="border: 1px solid #c0c0c0;" />\n' +
                    // '                <input type="text" id="sort_'+ i + '" value="'+foodPicList[i].sort+'" th:placeholder="请输入优惠金额" lay-verify="required|number" class="layui-input" style="width:50px;height: 22px;margin-top:3px;" />\n' +
                    '          </div>';
                fileIndex++;
                $('#upload_orderPic_add').before(imgHtml);
            }
        }
        var foodPicListStr = $("#foodPicListStr").val();
        if(foodPicListStr != null && foodPicListStr.length > 10) {
            var foodPicList = JSON.parse(foodPicListStr);
            for (var i = 0; i < foodPicList.length; i++) {
                var imgHtml = '<div class="upload-img-item" >\n' +
                    '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                    '                <img data-key="filePreview_' + i + '" ' +
                    '                   src="' + foodPicList[i].picUrl + '" ' +
                    '                   foodPicList_url="' + foodPicList[i].picUrl + '" style="border: 1px solid #c0c0c0;" />\n' +
                    // '                <input type="text" id="sort_'+ i + '" value="'+foodPicList[i].sort+'" th:placeholder="请输入优惠金额" lay-verify="required|number" class="layui-input" style="width:50px;height: 22px;margin-top:3px;" />\n' +
                    '          </div>';
                fileIndex++;
                $('#upload_foodPicList_add').before(imgHtml);
            }
        }
        //从前端获取组合的数据
        var discountCouponListStr = $("#discountCouponListStr").val();
        if(discountCouponListStr != null && discountCouponListStr.length > 10) {
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
                    '                                <input type="text" id="combinationType1_' + i + '" name="combinationType1_' + i + '" th:placeholder="输入券名"\n' +
                    '                                       autocomplete="off"  value="' + discountCouponList[i].title + '"\n' +
                    '                                       class="layui-input" lay-verify="required"/>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <div class="layui-col-xs6">\n' +
                    '                        <div class="layui-form-item">\n' +
                    '                            <div class="layui-input-block">\n' +
                    '                                <input type="text" id="combinationName1_' + i + '" name="combinationName1_' + i + '" th:placeholder="请输入领取地址"\n' +
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
        }

        //从前端获取组合的数据
        var preferentialFoodListStr = $("#preferentialFoodListStr").val();
        if(preferentialFoodListStr != null && preferentialFoodListStr.length > 10) {
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
                    fileIndex++;
                }
                //将数据进行填充，添加到前端
                var setMealHtml = '<div id="combination_' + i + '" >\n' +
                    '                <div class="layui-row">\n' +
                    '                    <div class="layui-col-xs6">\n' +
                    '                        <div class="layui-form-item">\n' +
                    '                            <label class="layui-form-label required-tag">优惠餐品</label>\n' +
                    '                            <div class="layui-input-block">\n' +
                    '                                <input type="text" id="combinationType_' + i + '" name="combinationType_' + i + '" th:placeholder="请输入餐品名称"\n' +
                    '                                       autocomplete="off" value="' + preferentialFoodList[i].title + '"\n' +
                    '                                       class="layui-input" lay-verify="required"/>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                    <div class="layui-col-xs6">\n' +
                    '                        <div class="layui-form-item">\n' +
                    '                            <div class="layui-input-block">\n' +
                    '                                <input type="text" id="combinationName_' + i + '" name="combinationName_' + i + '" th:placeholder="请输入直达链接"\n' +
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
                    '                                <input type="text" id="combinationPrice_' + i + '" name="combinationPrice_' + i + '" th:placeholder="请输入餐品价格"\n' +
                    '                                       autocomplete="off" value="' + preferentialFoodList[i].price + '"\n' +
                    '                                       class="layui-input" lay-verify="required|number"/>\n' +
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
    }

    //自定义验证规则
    form.verify({
        specifiedInstruction: function(value){
            if(value.length > 20){
                return '不能超过20字符';
            }
        }

    });

    // 初始化控件数据
    $(document).ready(function () {
        setView();
    });

    form.render();
})
;