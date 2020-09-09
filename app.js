App({
  onLaunch(options) {
    console.log('App Launch', options);

    // dd.setStorage('corpId', options.query.corpId);
    // console.log('getSystemInfoSync', dd.getSystemInfoSync());
    // console.log('SDKVersion', dd.SDKVersion);
    // https://blog.csdn.net/weixin_30536513/article/details/102122187
    this.globalData.corpId = options.query.corpId;
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
  https(httpstype, url, data) {
    let token = '';
    dd.getStorage({
      key: 'userInfo',
      success(res) {
        if (res) {
          token = res.data.token
        }
      }
    })
    dd.showLoading();
    let endurl = encodeURI(this.globaldata.serverurl + url);
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + this.globalData.token
        },
        url: endurl,
        method: httpstype,
        data: data,
        dataType: 'json',
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)

        },
        complete: (res) => {
          dd.hideLoading()
        }
      })
    })
  },
  // app.https('GET', '/api/v1/dailyTunneling?id=' + this.data.curTbmId + '&time=' + startdate).then(res => {
  //   console.log(res)
  // })
});
