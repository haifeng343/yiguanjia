const app = getApp();
Page({
  data: {
    navList: [1, 2, 3, 4, 5],
    showCengId: 1,//默认选择第一层
    cengList: [1, 2, 3, 4],//容器层数
    samplebox: 1,//1 9*9   2 12*12
    items: [], //样本盒
    cells: Array.apply(null, {
      length: 81
    }).map(function (_, index) {
      return {
        id: index,
        number: index % 9 + 1
      };
    }),
    roomList: [],//房间列表
    val: 1,//选择第几个
    containerList: [
      {
        id: 10,
        name: '冰箱'
      },
      // {
      //   id:20,
      //   name:'液氮罐'
      // },
      // {
      //   id:30,
      //   name:'柜子'
      // },
      // {
      //   id:40,
      //   name:'冷库'
      // },
      // {
      //   id:50,
      //   name:'石蜡块档案柜'
      // },
      // {
      //   id:60,
      //   name:'病理玻片柜'
      // },
    ],
    val1: 0,
    bxList: [],//容器
    val2: 0,
    containerid: null,//容器id
    levela: null,//容器大层
    levelb: null,//容器小层
    option: null,//传值
    ctList: [],//抽屉
    showXiaoCengId: null,//小层选中
    jiazList: [],//架子
    heziList: [],//盒子
    jiaziId: null,//架子Id
    showJiaziId: null,//架子选中
  },
  onShow() {
    this.getRoomList();
  },
  onLoad(option) {
    console.log(option);
    if (option) {
      this.setData({
        option: option
      })
    }
    let tempArr3 = [];
    let tempArr = [];
    let tempArr1 = [];
    if (this.data.samplebox == 1) {
      tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      tempArr1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
    } else {
      tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      tempArr1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];
    }
    tempArr1.forEach((item1, index1) => {
      tempArr.forEach((item, index) => {
        tempArr3.push({
          id: index % 9 + 1,
          name: item1 + (index + 1)
        });
      });
    });

    this.setData({
      items: tempArr3
    })
  },
  // 获取房间号
  getRoomList() {
    app.http('/api/container/getlistbyroom', {
      name: '',
      roomid: 0,
      pageIndex: 1,
      pageSize: 1000,
      fldSort: '',
      fldName: ''
    }).then(res => {
      if (res.data.success) {
        this.setData({
          roomList: res.data.result.pageData,
        })
        this.getBxList();
      }
    })
  },
  // 房间号
  change(e) {
    this.setData({
      val: e.detail.value
    })
    this.getBxList();
  },
  // 容器类型
  change1(e) {
    this.setData({
      val1: e.detail.value
    })
  },
  // 容器
  change2(e) {
    this.setData({
      val2: e.detail.value
    })
    console.log(e)
  },
  // 获取冰箱列表
  getBxList() {
    app.http('/api/container/getlistbyfridge', {
      name: '',
      roomid: this.data.val == 0 ? this.data.roomList[0].id : this.data.val,
      pageIndex: 1,
      pageSize: 1000,
      fldSort: '',
      fldName: ''
    })
      .then((res) => {
        if (res.data.success) {
          this.setData({
            bxList: res.data.result.pageData,
            containerid: res.data.result.pageData.length > 0 ? res.data.result.pageData[this.data.val2].containerid : null,
            levela: res.data.result.pageData.length > 0 ? res.data.result.pageData[this.data.val2].levela : null,
            levelb: res.data.result.pageData.length > 0 ? res.data.result.pageData[this.data.val2].levelb : null,
            samplebox: res.data.result.pageData.length > 0 ? res.data.result.pageData[this.data.val2].samplebox : null,
          })
          if (this.data.levela) {
            this.changeLeava(this.data.showCengId);
          }
        }
      });
  },
  showItem(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      showHeziId: e.currentTarget.dataset.index
    })
  },
  // 大层切换
  changeCeng(e) {
    this.setData({
      showCengId: e.currentTarget.dataset.id
    })
    this.changeLeava(this.data.showCengId);
  },
  // 从大层获取小层
  changeLeava(showCengId) {
    app.http('/api/container/getconbylevela', {
      containerid: this.data.containerid,
      level_a: showCengId,
    }).then(res => {
      if (res.data.success) {
        this.setData({
          ctList: res.data.result
        })
      }
    })
  },
  // 从小层获取架子
  getJiazi(e) {
    let item = e.currentTarget.dataset.item;
    app.http('/api/container/getconbylevelb', {
      containerid: this.data.containerid,
      level_a: this.data.showCengId,
      level_b: item.level_b,
      level_x: item.level_x,
    }).then(res => {
      if (res.data.success) {
        this.setData({
          jiazList: res.data.result,
          showXiaoCengId: e.currentTarget.dataset.index
        })
      }
    })
  },
  // 获取盒子
  getHezi(e) {
    let item = e.currentTarget.dataset.item;
    app.http('/api/container/getconbylattice', {
      latticeid: item.id,
    }).then(res => {
      if (res.data.success) {
        this.setData({
          jiaziId: item.id,
          heziList: res.data.result,
          showJiaziId: e.currentTarget.dataset.index
        })
      }
    })
  },
  // 入库
  ruku() {
    app.http('/api/apply/applyfirst',{
      apply_reason:'',
      remarks:'',
      product_type_id:1,
      product_type:'样本',
      instorage:{
        sample:[
          {
            sample_id:parseInt(this.data.option.sample_id),
            sample_type_id:parseInt(this.data.option.sample_type_id),
            sample_type:this.data.option.sample_type,
            sample_no:this.data.option.sample_no,
            ac_frozenbox:this.data.jiaziId,
            ac_sample:this.data.showHeziId,
            qrcode:this.data.option.code
          }
        ]
      }
    }).then(res=>{
      if (res.data.success) {
        
      }
    })
  },
});
