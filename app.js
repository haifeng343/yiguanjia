App({
  onLaunch(options) {
    // console.log('App Launch', options);

    // dd.setStorage('corpId', options.query.corpId);
    // console.log('getSystemInfoSync', dd.getSystemInfoSync());
    // console.log('SDKVersion', dd.SDKVersion);
    // https://blog.csdn.net/weixin_30536513/article/details/102122187
    let url = this.globalData.serverurl + "/api/dingapi/dinglogin";
    this.globalData.corpId = options.query.corpId;
    dd.getAuthCode({
      success: (res) => {
        dd.httpRequest({
          url: url,
          method: 'POST',
          data: JSON.stringify({
            auth_code: res.authCode,
            auth_corpid: this.globalData.corpId,
          }),
          headers: {
            "Content-Type": "application/json"
          },
          success: function (res) {
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
                user: res.data.result
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
    this.globalData.serverurl = "https://api.mfetv.top";
    this.globalData.isIphoneX = dd.getSystemInfoSync().model == "iPhone10,3" ? true : false;

  },
  onShow() {
    // console.log('App Show');
  },
  onHide() {
    // console.log('App Hide');
  },
  globalData: {
    corpId: '',//企业id
    serverurl: "https://api.mfetv.top",
    token: null,//登录token权限 
    userInfo: null,//用户信息
    isIphoneX: false,
  },
  // 封装网络请求
  http(api, data) {
    let endurl = encodeURI(this.globalData.serverurl + api);
    let a = dd.getStorageSync({ key: 'userInfo' })
    dd.showLoading();
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + a.data.token
        },
        url: endurl,
        method: 'POST',
        // 需要手动调用JSON.stringify将数据进行序列化
        data: JSON.stringify(data),
        dataType: 'json',
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)
        },
        complete: function (res) {
          dd.hideLoading()
        }
      })
    })
  }

});
