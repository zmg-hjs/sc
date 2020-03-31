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
        elem: '#test1'
        , type: 'datetime'
        , format: 'yyyy-MM-dd HH:mm'
    });


    $(document).on('click', '.layui-btn.event-btn', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call($(this)) : '';
    }).on('click', '.upload-img-item .layui-icon', function () {
        var url = $(this).parent().find('img').prop('src');
        console.log(url);
        var type = $(this).parent().remove()
    });
    var fileIndex = 1;

    //商家二维码图片上传
    upload.render({
        elem: '#upload_appletQrCodeUrl_add'
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
                $('#upload_appletQrCodeUrl_add').before(imgHtml);
                fileIndex++;
            });
        }, done: function (data) {
            if (data.code == '1') {
                var url = data.data;
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("applet_url", url);
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").parent().css("display", 'inline-block');
            } else {
                layer.msg(data.msg, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        }
    });

    //商家品牌图片上传   upload_logoAddress_add
    upload.render({
        elem: '#upload_logoAddress_add'
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
                $('#upload_logoAddress_add').before(imgHtml);
                fileIndex++;
            });
        }, done: function (data) {
            if (data.code == '1') {
                var url = data.data;
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("logo_url", url);
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").parent().css("display", 'inline-block');
            } else {
                layer.msg(data.msg, {
                    icon: 5,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }
        }
    });

    //商家品牌图片/品牌推荐图上传  upload_brandAddress_add

    upload.render({
        elem: '#upload_brandAddress_add'
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
                $('#upload_brandAddress_add').before(imgHtml);
                fileIndex++;
            });
        }, done: function (data) {
            if (data.code == '1') {
                var url = data.data;
                $("img[data-key='filePreview_" + (fileIndex - 1) + "']").attr("brand_url", url);
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
        var logoUrl = [];
        var appletUrl = [];
        var brandUrl = [];
        $("img[data-key^='filePreview_']").each(function (index, item) {
            if ($(item).attr("brand_url")){
                brandUrl.push($(item).attr("brand_url"))
            }
            if ($(item).attr("applet_url")){
                appletUrl.push($(item).attr("applet_url"));
            }
            if ($(item).attr("logo_url")){
                logoUrl.push($(item).attr("logo_url"))
            }
        });
        $("input[name='brandAddress']").val(brandUrl.join(","));
        $("input[name='appletQrCodeUrl']").val(appletUrl.join(","));
        $("input[name='logoAddress']").val(logoUrl.join(","));
    }
    layui.use('form', function () {
        form.verify({
        });
        //监听提交
        form.on('submit(component-form)', function (data) {
            getImgSrc();
            console.log(lnglatlist)
            var searchObj = $("#searchFormId").serializeObject();
            if (lnglatlist.length > 0){
                var coordinateList = []
                lnglatlist.forEach(item=>{
                    coordinateList.push({
                        longitude:item.R,latitude:item.Q})
                })

                searchObj.coordinateListStr = JSON.stringify(coordinateList);
                searchObj.serviceNoStr="view_business_add_submission";
                $.simpleAjax('/view/v2/business/view_business_add_submission', 'POST', JSON.stringify(searchObj), "application/json", returnFunction);
                return false;//这一行代码必须加，不然会自动刷新页面，这个和layui的封装有关，且returnFunction 也不会调用
            }else {
                layer.msg("请勾选地图",{icon:6})
                return false
            }
        });
        form.render(); // 更新全部
    });

    layui.use('layer', function(){
        var $ = layui.jquery, layer = layui.layer;
        $(document).on('click','#creatMap',function(){
            onpolygon_creat();
            return false;
        });
        $(document).on('click','#openMap',function(){
            onpolyEditor_open();
            return false;
        });
        $(document).on('click','#clearMap',function(){
            onpolyEditor_clear();
            return false;
        });
    });
    var map = null;
    var lnglatlist = [],
        markerList = [],
        polygon = null;
    var marker = null;
    var polyEditor = null;
    function mapOnLoad() {
        var go = {
            numder: 0
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=54ef60a7a5c68052ba0be2724476147d&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
        window.onLoad = function() {
            map = new AMap.Map('container', {
                resizeEnable: true,
                zoom: 11, //设置地图显示的缩放级别
                center: [114.06672086834908,22.620661688653495], //设置地图中心点坐标
                lang: 'zh_cn', //设置地图语言类型
            });
            map.on('complete', function() {
                console.log('地图图块加载完成')
            });
            //2.异步加载多个插件
            AMap.plugin(['AMap.ToolBar', 'AMap.Driving', 'AMap.PolyEditor'], function() { //异步同时加载多个插件

            });
            map.on('click', function(ev) {
                console.log(lnglatlist);
                //多边形不存在new
                if (polygon == null) {
                    var lnglat = ev.lnglat;
                    // 创建一个 Marker 实例：
                    var newMarker = new AMap.Marker({
                        position: lnglat, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: '第' + (go.numder + 1) + '点击'
                    });
                    markerList.push(newMarker); //地图上点的集合放在一起方便管理
                    lnglatlist.push(lnglat);
                    newMarker.setLabel({
                        content: lnglat,
                        offset: new AMap.Pixel(20, 0)
                    });
                    map.add(newMarker);
                }
            });
        }
    }



    function onpolygon_creat(){
        if (polygon == null) {
            // 将创建的点标记添加到已有的地图实例：
            polygon = new AMap.Polygon({
                path: lnglatlist,
                strokeColor: "#FF33FF",
                //strokeWeight: 9,
                strokeOpacity: 0.9,
                fillOpacity: 0.4,
                fillColor: '#1791fc',
                lineJoin: 'round', // 折线拐点连接处样式
                zIndex: 50,
            })
            map.remove(markerList); //清除地图上的点
            //将多变形
            map.add(polygon);
            // 缩放地图到合适的视野级别
            map.setFitView([polygon]);
        }
    }

    function onpolyEditor_open() {
        if (polygon != null) {
            polyEditor = new AMap.PolyEditor(map, polygon)
            map.addControl(polyEditor);
            polyEditor.open();
        }else{
            log.info('请用鼠标点击地图生成轮廓点，创建')
        }
    }

    function onpolyEditor_close(){
        if(polyEditor!=null){
            //保存范围数据arr
            console.log(lnglatlist);
            layer.msg("保存成功",{icon:6});
            //关闭polyEditor的编辑状态
            polyEditor.close();
        }else{
            log.info('没有发生变化')
        }
    }

    function onpolyEditor_clear() {
        map = null;
        lnglatlist = [];
        markerList = [];
        polygon = null;
        marker = null;
        polyEditor = null;
        mapOnLoad();
    }
    function returnFunction(data) {
        if (data.code == '1') {
            layer.open({
                icon:1,
                title: advice
                ,content: data.msg
                ,yes: function(index, layero){
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
    function initData() {
        loadOwner($("select[name='owner']"));
    }
    // 初始化控件数据
    $(document).ready(function () {
        initData();
        mapOnLoad();
    });

})
;