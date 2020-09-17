const app = getApp();
Page({
  data: {
    shenList: [
      {
        id: 6,
        name: '申请实验',
        img: '../../img/a1.png'
      },
      {
        id: 3,
        name: '挂失申请',
        img: '../../img/a2.png'
      },
      {
        id: 4,
        name: '归还申请',
        img: '../../img/a3.png'
      },
      {
        id: 5,
        name: '延期申请',
        img: '../../img/a4.png'
      },
      {
        id: 8,
        name: '消耗完申请',
        img: '../../img/a5.png'
      },
      {
        id: 2,
        name: '转移申请',
        img: '../../img/a6.png'
      },
      {
        id: 7,
        name: '清理过期',
        img: '../../img/a7.png'
      },
    ],
    shenList1: [{
      id: 1,
      name: '入库列表',
      img: '../../img/b1.png'
    },
    {
      id: 2,
      name: '待出库列表',
      img: '../../img/b2.png'
    },
    {
      id: 3,
      name: '待入库列表',
      img: '../../img/b3.png'
    },
    {
      id: 4,
      name: '出库列表',
      img: '../../img/b4.png'
    },
    {
      id: 5,
      name: '归还列表',
      img: '../../img/b5.png'
    },
    {
      id: 6,
      name: '挂失列表',
      img: '../../img/b6.png'
    },
    {
      id: 7,
      name: '转移列表',
      img: '../../img/b7.png'
    },
    {
      id: 8,
      name: '延期列表',
      img: '../../img/b8.png'
    },
    {
      id: 9,
      name: '过期列表',
      img: '../../img/b9.png'
    },
    ],
    isIphoneX: app.globalData.isIphoneX,
    navList: [//代办nav
      {
        id:1,
        name:'我发起的'
      },
      {
        id:2,
        name:'待处理的'
      },
      {
        id:3,
        name:'已处理的'
      },
      {
        id:4,
        name:'抄送我的'
      },
    ],
  },
  onLoad() {

  },
  goNav(e){
    dd.navigateTo({
      url:'/page/agent/agent?type='+e.currentTarget.dataset.id
    })
  },
  // 扫码
  saoma() {
    dd.scan({
      type: 'qr',
      success: (res) => {
        // 入库 出库
        console.log(res);
        dd.setStorage({
          key: 'codeContent',
          data: {
            code: res.code
          },
          success: function () {

          }
        });
      },
    });
  },
  // 跳转到申请页面
  goToForm(e) {
    dd.navigateTo({
      url: '/page/takeOut/takeOut?type=' + e.currentTarget.dataset.id
    })
  },
  // 跳转到我的列表
  myList() {
    dd.navigateTo({
      url: '/page/search/search?type=0'
    })
  },


});
