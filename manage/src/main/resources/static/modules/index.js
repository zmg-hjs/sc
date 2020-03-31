
$(function(){
    //--------------------创建目录树---------------------
    //菜单列表html
    var menus = '';
    function toTree(data) {
        // 删除 所有 children,以防止多次调用
        data.forEach(function (item) {
            delete item.children;
        });

        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        var map = {};
        data.forEach(function (item) {
            map[item.id] = item;
        });
        var val = [];
        data.forEach(function (item) {
            // 以当前遍历项的parentId,去map对象中找到索引的id
            var parent = map[item.parentId];
            // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
            if (parent) {
                (parent.children || ( parent.children = [] )).push(item);
            } else {
                //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                val.push(item);
            }
        });
        return val;
    };

    function creatMenu(childData){
        var len = childData.length;
        for(var i=0;i<len;i++){
            var obj = childData[i];
            if(i == 0){
                menus += '<dl class="layui-nav-child">'
            }
            if(obj.children){
                menus += '<dd data-name="grid">' +
                    '<a href="javascript:;">'+ childData[i].cnName+'</a>';
                creatMenu(obj.children);
                menus += '</dd>';
            }else{
                menus += '<dd data-name="list">' +
                    '<a lay-href="'+childData[i].code+'">'+childData[i].cnName+'</a>';
                if(len == (i+1)){
                    menus += '</dd>';
                }
            }
        }
        menus +='</dl>';
    }

    var treeData = toTree(menuData);
    //console.log(treeData);
    treeData.forEach(function (item) {
        if(item.hasOwnProperty('children')){
            menus += '<li data-name="component" class="layui-nav-item">' +
                '<a href="javascript:;" lay-tips="'+item.cnName+'" lay-direction="2">' +
                '<i class="layui-icon '+ item.imgSrc+'"></i>' +
                '<cite>'+item.cnName+'</cite>' +
                '</a>';
            creatMenu(item.children);
            menus += '</li>';
        }else{
            menus += '<li data-name="get" class="layui-nav-item">' +
                        '<a href="javascript:;" lay-href="'+item.code+'" lay-tips="'+item.cnName+'" lay-direction="0">' +
                        '<i class="layui-icon layui-icon-auz"></i>' +
                        '<cite>'+item.cnName+'</cite>' +
                        '</a>' +
                      '</li>';
        }
    });
    $("#view").append(menus);
    $("#view").find("li:eq(0)").addClass("layui-nav-itemed");// 默认展开第一个选项卡

    $('.languageCode').click(function() {
        $.ajax({
            url : '/language/change?lang=' + $(this).data('code'),
            type : 'POST',
            dataType : 'json',
            contentType : "application/json",
            success : function(data) {
                if (data.code == 0) {
                    window.location.reload();
                }
            }
        });
    });
    $('.logoutSystem').click(function () {
        //浏览器跳出登陆
        parent.location.href = '/logout';
    });

});