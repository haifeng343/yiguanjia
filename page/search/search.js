const app = getApp();
const neil = require('../../utils/request.js');
Page({
  data: {
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
    keyword: '',//搜索
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
      }, {
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
    ],
    showStatus: 0,
    statusList: [
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
    showDay: 1,
    dayList: [
      {
        id: 1,
        name: '近一天'
      },
      {
        id: 2,
        name: '近三天'
      },
      {
        id: 3,
        name: '近一周'
      },
    ],
    date1: '',
    date2: '',
    toggle1: false,//展开收起
    showDialog: false,//展开筛选
    select1: false,//全选
    pageData: null,//数据
    count: 0,//勾选条数
  },
  onLoad() {
    console.log(this);
    this.getData();
  },
  // 获取数据
  getData() {
    app.http('/api/sample/getsamplelist', {
      name: this.data.keyword,
      pageIndex: 1,
      pageSize: 10,
      fldSort: '',
      fldName: ''
    }).then(res => {
      if (res.data.success) {
        let tempArr = res.data.result.pageData;
        tempArr.forEach(item => {
          item.select = false;
        })
        this.setData({
          pageData: tempArr
        })
      }
    })
  },
  clearInput() {
    this.setData({
      keyword: ''
    })
    this.getData();
  },
  setChange(e) {
    let tempArr = this.data.pageData;
    let arr = [];
    tempArr.forEach(item => {
      if (item.id == e.currentTarget.dataset.id) {
        if (!item.select) {
          item.select = true;
        } else {
          item.select = false;
        }
      }
    })
    let a = tempArr.filter(item => {
      return item.select == true
    }).map(item => {
      return item.id
    })
    if (a.length == tempArr.length) {
      this.setData({
        select1: true
      })
    } else {
      this.setData({
        select1: false
      })
    }
    console.log(a)
    this.setData({
      pageData: tempArr,
      count: a.length,
    })
  },
  // 获取搜索内容
  hasKeyword(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  // 搜索
  search() {
    this.getData();
  },
  // 获取日期
  change1(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  // 获取日期
  change2(e) {
    this.setData({
      date2: e.detail.value
    })
  },
  // 类型 设置选中的数组
  setShow(e) {
    let tempArr = this.data.list;
    tempArr.forEach(item => {
      if (item.id == e.currentTarget.dataset.id) {
        if (item.select == true) {
          item.select = false;
        } else {
          item.select = true;
        }
      }
    })
    this.setData({
      list: tempArr
    })
  },

  // 材料状态
  setStatus(e) {
    this.setData({
      showStatus: e.currentTarget.dataset.id
    })
  },
  // 时间区间
  setDay(e) {
    this.setData({
      showDay: e.currentTarget.dataset.id
    })
  },
  // 展开收起
  toggle() {
    this.setData({
      toggle1: !this.data.toggle1
    })
  },
  // 隐藏showdialog
  hideDialog() {
    this.setData({
      showDialog: false
    })
  },
  // 显示showdialog
  showDialog() {
    this.setData({
      showDialog: true
    })
  },
  // 全选
  allSelect() {
    let tempArr = this.data.pageData;
    tempArr.forEach(item => {
      item.select = !item.select
    })
    this.setData({
      pageData: tempArr,
      select1: !this.data.select1,
      count: !this.data.select1 == true ? tempArr.length : 0
    })
  },
  onPullDownRefresh() {
    // neil.http('post','/api/sample/getsamplelist',{
    //     name:'',
    //     pageIndex:1, 
    //     pageSize:10,
    //     fldSort:'',
    //     fldName:''
    //   }).then(res=>{
    //     console.log(res)
    //   })
    // 页面被下拉
    dd.stopPullDownRefresh();
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  submit() {
    let pages = getCurrentPages();//页面路由
    let tempArr = this.data.pageData;
    let a = tempArr.filter(item=>{
      return item.select ==true
    }).map(item=>{
      return item
    })
    console.log(a)
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      list:a,
      unfold:true
    })
    dd.navigateBack({
      delta:1
    })
    console.log(prevPage);
  },
});
