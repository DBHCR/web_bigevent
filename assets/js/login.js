$(function() {
    //实现去登录和去注册的按需加载
    $('.login-box a').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('.reg-box a').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取form对象
    const form = layui.form;
    //从layui中获取弹层组件
    var layer = layui.layer

    //通过form.verify()函数自定义校验规则
    form.verify({
        'pwd': [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //这是确认两次密码的值是否一致的规则
        repwd: function(value) {
            let pwdValue = $('.reg-box [name=password]').val();
            if (value !== pwdValue) {
                layer.msg('两次密码输入不一致！')
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()

        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        console.log(data);


        $.ajax({
            type: "POST", //默认get
            url: "/api/reguser", //默认当前页
            data: data, //格式{key:value}
            success: function(res) { //请求成功回调
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
            }
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        let data = $(this).serialize();
        console.log(data);
        $.ajax({
            type: "POST", //默认get
            url: "/api/login", //默认当前页
            data: data, //格式{key:value}
            success: function(res) { //请求成功回调
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                //登录成功，跳转到后台主页
                location.href = "/index.html"
            }
        })
    })






})