const app = getApp();
//替换成开发者后台设置的安全域名

//获取用户信息的url
let url = app.globalData.serverurl + "/api/dingapi/dinglogin";
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

        dd.getAuthCode({
            success: (res) => {
                dd.httpRequest({
                    url: url,
                    method: 'POST',
                    data: JSON.stringify({
                        auth_code: res.authCode,
                        auth_corpid: app.globalData.corpId,
                    }), 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    success: function (res) {
                        console.log('success----', res);
                        dd.setStorage({
                            key: 'userInfo',
                            data: {
                                userid: res.data.result.userid,
                                account: res.data.result.account,
                                token: res.data.result.token,
                                phone: res.data.result.phone,
                                nickname: res.data.result.nickname,
                                dingid: res.data.result.dingid,
                                rolename: res.data.result.rolename,
                                unionid: res.data.result.unionid,
                                user:res.data.result
                            }
                        })
                    },
                    fail: function (res) {
                        dd.alert({ content: JSON.stringify(res) });
                    },
                    complete: function (res) {
                        dd.hideLoading();
                    }

                });
            },
            fail: (err) => {
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })

    }
    // app.https('GET', '/api/v1/dailyTunneling?id=' + this.data.curTbmId + '&time=' + startdate).then(res => {
    //     console.log(res)
    //   })
})