Page({
  data: {
    name: null,
    phone: null,
    rolename: null,
  },
  onLoad() {
    let that = this;
    dd.getStorage({
      key: 'userInfo',
      success(res) {
        if (res) {
          that.setData({
            name: res.data.nickname || '',
            phone: res.data.phone || '',
            rolename: res.data.rolename || '',

          })
        }
      }
    })
    console.log()
  },
});
