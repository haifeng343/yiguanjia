App({
  onLaunch(options) {
    console.log('App Launch', options);

    // dd.setStorage('corpId', options.query.corpId);
    // console.log('getSystemInfoSync', dd.getSystemInfoSync());
    // console.log('SDKVersion', dd.SDKVersion);
    // https://blog.csdn.net/weixin_30536513/article/details/102122187
    this.globalData.corpId = options.query.corpId;
    this.globalData.serverurl = "https://api.mfetv.top";
    this.globalData.isIphoneX = dd.getSystemInfoSync().model == "iPhone10,3" ? true : false;
    console.log(this)
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
    console.log(data)
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
