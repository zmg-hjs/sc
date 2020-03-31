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
        window.parent.location.reload();
    });


    layui.use('form', function () {

        //监听提交
        form.on('submit(component-form)', function (data) {

            var searchObj = $("#searchFormId").serializeObject();
            //循环取出，循环次数为添加的标签个数 -1,通过添加后缀匹配
            var searchObjStr = JSON.stringify(searchObj);



            layer.open({
                title: '提示'
                ,content: '是否确认'
                ,btn:['确定','取消']
                ,yes:function(index, layero){
                    console.info("yes");
                    searchObj.serviceNoStr="view_comment_update_submission";
                    $.simpleAjax('/view/v2/comment/view_comment_update_submission', 'POST', JSON.stringify(searchObj), "application/json;charset-UTF-8", returnFunction);
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
                title: advice
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

    //自定义验证规则
    form.verify({
        specifiedInstruction: function(value){
            if(value.length > 20){
                return '不能超过20字符';
            }
        }

    });

    function initData() {
        loadOwner($("select[name='owner']"));
    }

    // 初始化控件数据
    $(document).ready(function () {
        initData();
    });

    form.render();
})
;