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



    layui.use('form', function () {
        //监听提交
        form.on('submit(component-form)', function (data) {
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);//关闭当前页
        });
    });

    $(document).on('click',"#testListAction3",function(){
        var id = document.getElementById("carpoolUserId").value;
        var width = document.documentElement.scrollWidth * 0.5 + "px";
        var height = document.documentElement.scrollHeight * 0.5 + "px";
        layer.open({
            type: 2,
            skin: 'open-class',
            area: [width, height],
            title: '委员会选举活动发布页面',
            content: "/sc/manage/resident/manage_resident_user_find_page?id="+id
        });
    });

    function returnFunction(data) {
        if (data.code == '1') {
            layer.open({
                icon:1,
                title: advice
                ,content: data.msg
                ,yes: function(index, layero){
                    var index = parent.layer.getFrameIndex(window.name);
                    // parent.layui.table.reload('items');//重载父页表格，参数为表格ID
                    parent.layer.close(index);
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