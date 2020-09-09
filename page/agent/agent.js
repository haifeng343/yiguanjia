Page({
  data: {
    showId: 1,//选中
    nav: [//头部导航栏
      {
        id: 1,
        name: '我发起的'
      },
      {
        id: 2,
        name: '待处理的'
      },
      {
        id: 3,
        name: '已处理的'
      },
      {
        id: 4,
        name: '抄送我的'
      }],
    showDialog: false,//弹出窗是否显示
  },
  onLoad() { },

  // 设置选中
  setShow(e) {
    this.setData({
      showId: e.currentTarget.dataset.id
    })
  },
});
