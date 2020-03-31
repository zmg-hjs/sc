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

    var url = ""
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
        , url: '/view/v2/systemLog/view_system_log_index_data?serviceNoStr=view_system_log_index_data'
        , toolbar: '#order-table-toolbar-toolbarDemo'
        , title: ''
        , cols: [[
            {type: 'checkbox', field: 'id', fixed: 'left'}
            , {field: 'serviceNoStr', title: '业务编号', width: 150,fixed: 'left', align: 'center'}
            , {field: 'content', title: '请求参数', fixed: 'left', width: 600, align: 'center'}
            , {field: 'extend', title: '类方法', width: 100, align: 'center'}
            , {field: 'createDateStr', title: '创建时间', width: 200, align: 'center'}
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
        if (obj.event === 'delete') {
            var searchObj = {}
            searchObj.id = data.id;
            $.simpleAjax('/business', 'DELETE', JSON.stringify(searchObj), "application/json;charset-UTF-8",returnFunction_dalete);
        }
        if (obj.event === 'update'){
            var width = document.documentElement.scrollWidth * 0.9 + "px";
            var height = document.documentElement.scrollHeight * 0.9 + "px";
            layer.open({
                type: 2,
                skin: 'open-class',
                area: [width, height],
                title: '商家修改页面',
                content: "/view/v2/business/view_business_update_page?businessId=" + data.id+"&serviceNoStr=view_business_detail_data"
                ,maxmin: true
                ,zIndex: layer.zIndex //重点1
            });
        }
    });

    function returnFunction_dalete(data) {
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
        if (data.code == '1') {
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
        $(document).on('click','#closeMap',function(){
            onpolyEditor_close();

            return false;
        });
    });

    var go = {
        numder: 0
    }
    var map = null,
        lnglatlist = [],
        markerList = [],
        polygon = null;
    var marker = null;
    var polyEditor = null;
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
                map.add(newMarker);
            }
        });
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
    function initData() {
        $.simpleAjax('/url', 'GET', null, "application/json;charset-UTF-8",returnFunction_url);
        loadOwner($("select[name='owner']"));
    }
    function returnFunction_url(data) {
        url = data
    }
    // 初始化控件数据
    $(document).ready(function(){
	    initData();
    });

});

