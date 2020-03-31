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

    laydate.render({
        elem: '#releaseDateStr'
        , type: 'datetime'
        , format: 'yyyy-MM-dd'
    });
    laydate.render({
        elem: '#lastEndDateStr'
        , type: 'datetime'
        , format: 'yyyy-MM-dd'
        , ready: function (value) {

        }
        , done: function(value, date, endDate) {

        }
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

    $(document).on('click', '#cancel', function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    })

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
    })
    layui.use('upload', function(){
        //执行实例
        var foodId = '#upload_foodPic_add'
        var foodNumber = 'f0'
        uploadPic(foodId,foodNumber)
    });
    function combinationAdd(){
        var setMealHtml='<div id="combination_' + combinationNumber + '" >\n' +
            '                <div class="layui-row">\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <label class="layui-form-label required-tag">餐品分类</label>\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationType_' + combinationNumber + '" name="combinationType_' + combinationNumber + '" th:placeholder="请输入组合类型名"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" lay-verify="required"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="layui-col-xs6">\n' +
            '                        <div class="layui-form-item">\n' +
            '                            <label  class="layui-form-label required-tag">餐品名</label>\n' +
            '                            <div class="layui-input-block">\n' +
            '                                <input type="text" id="combinationName_' + combinationNumber + '" name="combinationName_' + combinationNumber + '" th:placeholder="请输入组合名"\n' +
            '                                       autocomplete="off"\n' +
            '                                       class="layui-input" lay-verify="required"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '                <div  class="edit-module-title">上传一张餐品图片</div>\n' +
            '                <div class="layui-upload">\n' +
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
    var fileIndex = 1;
    //图片上传
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
                    $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("pic_url_" + number , url);
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

    /**
     * 获取所有图片路经
     */
    function getImgSrc() {
        var urlArr = []
        var arrObj = {}
        //根据图片的总类型生成数组，拼接属性名
        for (let i = 0; i < combinationNumber; i++) {
            arrObj['urlArr' + i] = [];
            $("img[data-key^='filePreview_']").each(function (index, item) {
                var picAddr = $(item).attr("pic_url_" + i)
                if (picAddr){
                    arrObj['urlArr' + i].push(picAddr)
                }
            });
            $("input[name='combinationPicAddress_" + i + "']").val(arrObj['urlArr' + i].join(","));
        }
        $("img[data-key^='filePreview_']").each(function (index, item) {
            if ($(item).attr("pic_url_f0")) {
                urlArr.push($(item).attr("pic_url_f0"));
            }
        });
        //添加到对应的input
        $("input[name='foodAddressListStr']").val(urlArr.join(","));
    }

    //监听提交
    form.on('submit(component-form)', function (data) {
        getImgSrc();
        var searchObj = $("#searchFormId").serializeObject();
        //循环取出，循环次数为添加的标签个数 -1,通过添加后缀匹配
        var searchObjStr = JSON.stringify(searchObj);
        var combinationList = []
        for (var i = 0; i < combinationNumber; i++) {
            var combinationName = "combinationName_" + i;
            var combinationPicAddress = "combinationPicAddress_" + i;
            var combinationType = "combinationType_" + i;
            if (searchObjStr.indexOf(combinationName)) {
                var combination = {combinationName:"",combinationPicAddress:"",combinationType:""}
                combination.combinationName = searchObj[combinationName]
                combination.combinationPicAddress = searchObj[combinationPicAddress]
                combination.combinationType = searchObj[combinationType]
                combinationList.push(combination)
            }
        }
        searchObj.whetherValid = off_on(searchObj.whetherValid);
        searchObj.combinationListStr = JSON.stringify(combinationList);
        searchObj.updateJson = JSON.stringify(updateJson);
        searchObj.serviceNoStr="view_overbearfood_update_submission";
        $.simpleAjax('/view/v2/overbearfood/view_overbearfood_update_submission', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
        return false;//这一行代码必须加，不然会自动刷新页面，这个和layui的封装有关，且returnFunction 也不会调用
    });

    function off_on(whetherValid) {
        if (whetherValid == 'on'){
            whetherValid = 'valid'
        }

        if (whetherValid == undefined){
            whetherValid = 'invalid'
        }
        return whetherValid;
    }
    function returnFunction(data) {
        if (data.code == '1') {
            layer.open({
                icon:1,
                title: advice
                ,content: data.msg
                ,yes: function(index, layero){
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
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
    //组合前端显示
    var combinationNumber;
    function setView() {
        //从前端获取组合的数据
        var combinationListStr = $("#combinationListStr").val();
        var combinationList = JSON.parse(combinationListStr);
        combinationNumber = combinationList.length;
        //对数据进行循环遍历
        for (let i = 0; i < combinationNumber; i++) {
            //将数据进行填充，添加到前端
            var setMealHtml='<div id="combination_' + i + '" >\n' +
                '                <div class="layui-row">\n' +
                '                    <div class="layui-col-xs6">\n' +
                '                        <div class="layui-form-item">\n' +
                '                            <label class="layui-form-label required-tag">餐品分类</label>\n' +
                '                            <div class="layui-input-block">\n' +
                '                                <input type="text" id="combinationType_' + i + '" name="combinationType_' + i + '" th:placeholder="请输入组合类型名"\n' +
                '                                       autocomplete="off"\n' +
                '                                       class="layui-input" lay-verify="required" value="'+combinationList[i].combinationType + '"/>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div class="layui-col-xs6">\n' +
                '                        <div class="layui-form-item">\n' +
                '                            <label  class="layui-form-label required-tag">餐品名</label>\n' +
                '                            <div class="layui-input-block">\n' +
                '                                <input type="text" id="combinationName_' + i + '" name="combinationName_' + i + '" th:placeholder="请输入组合名"\n' +
                '                                       autocomplete="off"\n' +
                '                                       class="layui-input" lay-verify="required" value="'+combinationList[i].combinationName + '"/>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div  class="edit-module-title">上传一张餐品图片</div>\n' +
                '                <div class="layui-upload">\n' +
                '                    <div id="combinationPicAddress_' + i + '" class="layui-upload-list" >\n' +
                '                        <input name="combinationPicAddress_' + i + '" type="hidden" value="" lay-verify="pic"/>\n' +
                '                        <div class="upload-img-item" >\n' +
                '                        </div>\n' +
                '                        <div class="upload-img-item" >\n' +
                '                            <i class="layui-icon layui-icon-close-fill"></i>\n' +
                '                            <img data-key="filePreview_"\n' +
                '                                 pic_url_'+ i + ' = "'+ combinationList[i].combinationPicAddress + '" \n' +
                '                                 src="' + combinationList[i].combinationPicAddress+'" \n' +
                '                                 style="border: 1px solid #c0c0c0;" />\n' +
                '                        </div>\n' +
                '                        <div class="upload-item-add" id="upload_combinationPic_add_' + i + '"><i class="layui-icon layui-icon-add-1"></i>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <button  id="combinationDelete_0" name="combinationDelete_0" type="button" class="layui-btn">移除组合</button>\n' +
                '            </div>'
            $('#combinationAdd').before(setMealHtml);
            //添加标签时，是图片上传生效
            var id = '#upload_combinationPic_add_' + i
            uploadPic(id,i);
        }
    }

    //拼接前端图片地址
    function setImage() {
        //根据data-key 获取需要拼接的标签
        $("img[data-key^='filePreview_']").each(function (index, item) {
            //拼接图片地址
            var imgUrl = $(item).attr("src")
            $(item).attr("src",imgUrl)
        });
    }

    var url;
    function initData() {
        $.simpleAjax('/url', 'GET', null, "application/json;charset-UTF-8",returnFunction_url);
        loadOwner($("select[name='owner']"));
    }
    function returnFunction_url(data) {
        url = data
        setImage()
        setView()
    }
    function set_on_off(){
        $()
    }
    // 初始化控件数据
    $(document).ready(function () {
        initData();
    });
    //保存修改的对象
    var updateJson = {}
    //input输入框发生变化时触发
    $("input").on("input",function(e){
        var value ={}
        var inputName = e.currentTarget.attributes.name.value;
        value.newValue = e.currentTarget.value;
        value.oldValue = e.currentTarget.attributes.value.value;
        updateJson[inputName] = value;
    });

    //自定义验证规则
    form.verify({
        specifiedInstruction: function(value){
            if(value.length > 20){
                return '不能超过20字符';
            }
        }

    });
})
;