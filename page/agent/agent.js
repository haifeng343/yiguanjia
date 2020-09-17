const app = getApp();
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
    pageData: [],
    pageIndex: 1,
    totalPageCount: 0,
  },
  onLoad(option) {
    if (option.type) {
      this.setData({
        showId: parseInt(option.type)
      })
      this.getData(1);
    }
  },

  // 获取我的代办列表
  getData(pageIndex) {
    app.http('/api/apply/getapplyprocessed', {
      type: parseInt(this.data.showId),
      pageIndex: pageIndex,
      pageSize: 10,
      fldSort: '',
      fldName: ''
    }).then(res => {
      if (res.data.success) {
        let tempArr = res.data.result.pageData;
        tempArr.forEach(item => {
          item.apply_user = item.apply_user.substring(item.apply_user.length - 2);
        })
        let temp = this.data.pageData;
        this.setData({
          pageData: pageIndex == 1 ? tempArr : temp.concat(tempArr),
          pageIndex: res.data.result.pageIndex,
          totalPageCount: res.data.result.totalPageCount,
        })
      }
    })
  },

  // 设置选中
  setShow(e) {
    this.setData({
      showId: e.currentTarget.dataset.id
    })
    this.getData(1);
  },
  // 页面被下拉
  onPullDownRefresh() {
    this.getData(1);
    dd.stopPullDownRefresh();
  },
  // 页面被拉到底部
  onReachBottom() {
    if (this.data.totalPageCount < this.data.pageIndex) {
      return
    }
    let temp = this.data.pageIndex;
    temp++;
    this.setData({
      pageIndex: temp
    })
    this.getData(temp);
  },

});
