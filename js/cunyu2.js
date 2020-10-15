(function() {
    $("body").prepend('<nav class="navbar navbar-default navbar-fixed-top">\
        <div class="container" style="margin-left: 0;">\
            <div class="navbar-header page-scroll">\
            	<a class="navbar-brand" href="#" id="summary-btn"><i class="fa fa-bars"></i>&nbsp;目录</a>\
                <a class="navbar-brand" href="/" target="_blank"><i class="fa fa-plane" aria-hidden="true"></i>&nbsp;返回主页</a>\
            </div>\
        </div>\
    </nav>');


// 滚动到顶端显示菜单
    window.onload = function(){
        $('.book-body,.body-inner').animate({
            scrollTop: 0
        }, 0);
        $('#summary-btn').on('click', function(){$('.js-toolbar-action')[0].click();});
    };

    var imgUrl = 'https://x-account.oss-cn-shenzhen.aliyuncs.com/cdn/logo/logo1/yellow/01.png';  // 分享后展示的一张图片
    var lineLink = location.href; // 点击分享后跳转的页面地址
    // var lineLink = "https://cunyubook.cunyu.co"; // 点击分享后跳转的页面地址
    var shareTitle = '存鱼进销存帮助文档';  // 分享后的标题
    var descContent = "《存鱼进销存》一款优秀的进销存系统，功能齐全，覆盖所有常见业务！";  // 分享后的描述信息
    var hrefUrl = "https://cunyubook.cunyu.co";

    //获取签名
    $.ajax({
        type : 'POST',
        url :  "https://test.back.x.acc8.cn/not-login-common/get-sign-package", //这个地址并非通用且长期有效，请去微信官方查看文档，并自行配置
        dataType : "json",
        data:{url:lineLink},
        success : function(response){
            wx.config({
                debug: true,
                appId: response.info.appId,
                timestamp: response.info.timestamp,
                nonceStr: response.info.nonceStr,
                signature: response.info.signature,
                jsApiList: [
                    'checkJsApi',
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'onMenuShareWeibo'
                ]
            });

            wx.ready(function() {
                wx.updateAppMessageShareData({
                    title: shareTitle, // 分享标题
                    link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    desc: descContent, // 分享描述
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.updateTimelineShareData({
                    title: shareTitle, // 分享标题
                    link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareWeibo({
                    title: shareTitle, // 分享标题
                    desc: descContent, // 分享描述
                    link: lineLink, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.error(function(res){
                    console.log('err', res)
                });
            });
        }

    });
})();
