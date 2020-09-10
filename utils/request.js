
const app = getApp();
function https(httpstype, url, data) {
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
  let endurl = encodeURI(app.globaldata.serverurl + url);
  console.log(endurl)
  return new Promise((resolve, reject) => {
    dd.httpRequest({
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      url: endurl,
      method: 'post',
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
}
module.export = ({
  https:https
})