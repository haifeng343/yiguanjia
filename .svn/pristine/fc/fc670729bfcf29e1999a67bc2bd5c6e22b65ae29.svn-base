Page({
  data: {
    showDialog: false,//是否显示阴影层
    showNavId: null,//选中 1类型 2状态
    nav: [//1类型 2状态
      {
        id: 1,
        name: '类型'
      },
      {
        id: 2,
        name: '状态'
      }],
    selectArr: [],//多选的类型
    navList1: [//类型
      {
        name: '样本',
        list: [
          {
            id: 1,
            name: '尿 液'
          },
          {
            id: 2,
            name: '血 液'
          },
          {
            id: 3,
            name: '唾 液'
          },
          {
            id: 4,
            name: '组 织'
          },
          {
            id: 5,
            name: '粪 便'
          },
          {
            id: 6,
            name: '脑积液'
          },
        ]
      },
      {
        name: '其他',
        list: [
          {
            id: 7,
            name: '组织芯片'
          },
          {
            id: 8,
            name: '石蜡块'
          },
          {
            id: 9,
            name: '耗 材'
          },
          {
            id: 10,
            name: '抗 体'
          },
          {
            id: 11,
            name: '试 剂'
          },
          {
            id: 12,
            name: '危险品'
          },
          {
            id: 13,
            name: '质 粒'
          },
          {
            id: 14,
            name: '病 毒'
          },
          {
            id: 15,
            name: '细 胞'
          },
          {
            id: 16,
            name: '引 物'
          }
        ]
      },
    ],
    showName: null,//选中的名称
    showId2: null,//选中状态
    navList2: [//状态
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '待入库'
      },
      {
        id: 2,
        name: '已入库'
      },
      {
        id: 3,
        name: '销 毁'
      },
      {
        id: 4,
        name: '挂 失'
      },
      {
        id: 5,
        name: '逾 期'
      },
      {
        id: 6,
        name: '待出库'
      },
      {
        id: 7,
        name: '使用中'
      },
      {
        id: 8,
        name: '延 期'
      }
    ],
  },
  onLoad() { },

  // 设置点击的类型
  setShowName(e) {
    if (e.currentTarget.dataset.id == this.data.showNavId) {
      this.setData({
        showNavId: null,
        showDialog: false,
      })
    } else {
      this.setData({
        showNavId: e.currentTarget.dataset.id,
        showDialog: true
      })
    }
  },

  // 类型 设置选中的数组
  setShow1(e) {
    let tempArr = this.data.navList1;
    tempArr.forEach(item => {
      item.list.forEach(item1 => {
        if (e.currentTarget.dataset.item1.id == item1.id) {
          if (item1.select == true) {
            item1.select = false
          } else {
            item1.select = true;
          }
        }
      })
    })
    this.setData({
      navList1: tempArr
    })
  },

  // 重置
  resetForm() {
    let tempArr = this.data.navList1;
    tempArr.forEach(item => {
      item.list.forEach(item1 => {
        item1.select = false
      })
    })
    this.setData({
      navList1: tempArr
    })
  },

  // 提交
  submitForm() {
    let arr = [];
    let tempArr = this.data.navList1;
    tempArr.forEach(item => {
      item.list.forEach(item1 => {
        if (item1.select == true) {
          arr.push(item1)
        }
      })
    })
    this.setData({
      navList1: tempArr,
      selectArr: arr,
      showDialog: false,
      showNavId: arr.length > 0 ? 1 : null
    })
  },

  // 状态 设置选中状态
  setShow2(e) {
    let tempArr = this.data.nav;
    tempArr[1].name = e.currentTarget.dataset.item.name;
    if (e.currentTarget.dataset.item.name == '全部') {
      tempArr[1].name = '状态'
    }
    this.setData({
      showId2: e.currentTarget.dataset.item.id,
      nav: tempArr,
      showDialog: false,
      showNavId: null
    })

  },

  // 关闭弹窗
  closeDialog() {
    this.setData({
      showDialog: false,
      showNavId: null,
    })
  },

  // 去到搜索页面
  toSearch() {
    dd.navigateTo({
      url: '/page/search/search'
    })
  },
});
