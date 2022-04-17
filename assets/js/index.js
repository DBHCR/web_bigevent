$(function() {

    const layer = layui.layer;
    //获取用户的基本信息
    getUserInfo();

    //点击按钮实现用户退出功能
    $('.btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.alert('确认退出系统？', { icon: 3, title: '提示' },
            function(index) {
                //删除本地存储中的token
                localStorage.removeItem('token')
                    //跳转到登录页面
                location.href = "/login.html"
                layer.close(index);
            });
    })






    function getUserInfo() {
        $.ajax({
            type: "GET", //默认get
            url: "/my/userinfo", //默认当前页

            success: function(res) { //请求成功回调
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
        })
    }

    //渲染用户头像的函数
    function renderAvatar(user) {
        //1.获取用户的名称
        let name = user.usernickname || user.username;
        console.log();

        //2.设置欢迎的文本
        $('#welcome').html(`欢迎你  ${name}`);
        if (user.user_pic !== null) {
            //3.按需接在用户头像
            $('.layui-nav-img').attr('src', user.user_pic)
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            let first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }


    }
})