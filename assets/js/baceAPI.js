// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:3007' + options.url
        //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1)
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

    //全局统一挂载complete 回调函数，无论请求成功还是失败都会调用此函数
    options.complete = function(res) {
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败') {
            //身份认证失败，未登录，强制清空token，跳转到登录页面
            localStorage.removeItem('token')
            location.href = "/login.html"
        }
    }

})