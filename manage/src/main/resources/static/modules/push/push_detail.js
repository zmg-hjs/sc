layui.config({
    base: '../../../static/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
    , formSelects: '../lib/formSelects/formSelects-v4'
}).use(['index', 'table', 'form', 'laydate', 'formSelects', 'upload'], function () {
    layui.form.config.verify.required[1] = requiredNotNull;
    var $ = layui.$,
        form = layui.form;

    // 初始化控件数据
    $(document).ready(function () {
        console.dir("...........ready................")
        var foodPicListStr = $("#foodPicListStr").val();
        var foodPicList = JSON.parse(foodPicListStr);
        console.dir(JSON.stringify(foodPicList))
        for(var i = 0;i< foodPicList.length;i++){
            var imgHtml = '<div class="upload-img-item" >\n' +
                '                <i class="layui-icon layui-icon-close-fill"></i>\n' +
                '                <img data-key="filePreview_' + i + '" ' +
                '                   src="' + foodPicList[i].picUrl + '" ' +
                '                   foodPicList_url="'+foodPicList[i].picUrl+'" style="border: 1px solid #c0c0c0;" />\n' +
                '                <div  id="sort_'+ i + '" text="'+foodPicList[i].sort+'" class="edit-module-title" />\n' +
                '          </div>';
            $('#upload_foodPicList_add').before(imgHtml);
        }
    });

    form.render();
})
;