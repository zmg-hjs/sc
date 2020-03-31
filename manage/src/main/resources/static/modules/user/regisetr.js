
(function ($) {
    "use strict";


     /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    // $('.validate-form').on('submit',function(data){
    //     var ss = data;
    //     $.ajax({
    //         //请求方式
    //         type : "POST",
    //         //请求的媒体类型
    //         contentType: "application/json;charset=UTF-8",
    //         //请求地址
    //         url : "/companyUser",
    //         //数据，json字符串
    //         data : JSON.stringify(),
    //         //请求成功
    //         success : function(result) {
    //             console.log(result);
    //         },
    //         //请求失败，包含具体的错误信息
    //         error : function(e){
    //             console.log(e.status);
    //             console.log(e.responseText);
    //         }
    //     });
    // });
    $("form").submit(function(data){
        var list = {};
        list.userName = $('#userName').val();
        list.passWord = $('#passWord').val();
        list.code = $('#code').val();
        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "/companyUser",
            //数据，json字符串
            data : JSON.stringify(list),
            //请求成功
            success : function(result) {
                if (result.code == '1'){
                    layer.msg("注册成功",{icon:6})
                    //window.location.href="/companyUser/login"
                } else {
                   //layer.msg("注册失败",{icon:5})
                    alert("注册失败")
                    return false;
                }
            },
        });
    });

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    var c = 60;
    $("#getCode").click(function () {
        var status = 'register';
        var stringify = JSON.stringify(status);
        $.ajax({
            //请求方式
            type : "GET",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "/companyUser/code",
            //数据，json字符串
            data : {status:'register'},
            //请求成功
            success : function(result) {
                console.log(result);
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        });
        $("#getCode").attr("disabled","true");//点击一次不可再点
        var interval = setInterval(function(){//定义定时器
            $("#getCode").html(c+"s之后重试");
            c--;
            if(c == 0){
                clearInterval(interval);//清除定时器
                $("#getCode").html("重新获取");
                $("#getCode").removeAttr("disabled");//删除这个属性
                c=60;
            }
        },1000);

    })

    $('#register').click(function () {
            var list = {};
            list.userName = $('#userName').val();
            list.passWord = $('#passWord').val();
            list.code = $('#code').val();
            $.ajax({
                //请求方式
                type : "POST",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",
                //请求地址
                url : "/companyUser",
                //数据，json字符串
                data : JSON.stringify(list),
                //请求成功
                success : function(result) {
                    if (result.code == '1'){
                        alert("注册成功")
                    } else {
                        alert(result.message)
                        return false;
                    }
                },
            });
            return false;
    })



})(jQuery);