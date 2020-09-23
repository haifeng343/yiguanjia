const app = getApp();
//替换成开发者后台设置的安全域名

//获取用户信息的url
//let url = "http://abcde.vaiwan.com";
//若要在测试应用中临时使用类似abcdef.vaiwan.com 的二级域名代理到无公网IP的服务端开发环境，
//请参考内网穿透工具介绍:
//https://open-doc.dingtalk.com/microapp/debug/ucof2g

// let appSecret = '55AxDMCBrfRcqWs2O0RnWmSaRc8aPIEhs0WqFYzhlZ2M3KfDsZp_h1Sk1UfwPrRZ';


Page({
    data: {
        userId: ''
    },
    onLoad() {
        this.setData({
            corpId: app.globalData.corpId
        })

        

    }
    // app.https('GET', '/api/v1/dailyTunneling?id=' + this.data.curTbmId + '&time=' + startdate).then(res => {
    //     console.log(res)
    //   })
})