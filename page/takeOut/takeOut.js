const app = getApp();
Page({
  data: {
    rangeArr: ['约定归还，保留仓位', '不归还，仓位释放'],//弹窗列表
    val: '',//选择第几个  归还类型 1.约定归还 2.不归还
    rangeArr3: ['冻存盒转移', '材料转移'],
    val3: '',//选择第几个
    date: '',//预计归还时间
    date1: '',//申请延期时间
    days: '',//预计天数
    dec: '',//原因
    showDialog: false,//是否展示弹出窗
    type: null,//1首次入库申请单 2转移申请单 3挂失申请表 4归还申请表 5延期申请表 6实验取出申请表 7过期销毁申请表  8消耗完申请
    list: null,//数据
    unfold: false,//展开收起
    deleteId: null,//删除的Id
    productList: [//产品类型
      {
        id: 1,
        name: '样本'
      },
    ]
  },
  onLoad(option) {
    if (option.type) {
      this.setData({
        type: option.type
      })
      // if (option.type == 1) {
      //   dd.setNavigationBar({ title: '首次入库申请' })
      // }
      // if (option.type == 2) {
      //   dd.setNavigationBar({ title: '转移申请' })
      // }
      if (option.type == 3) {
        dd.setNavigationBar({ title: '挂失申请' })
      }
      if (option.type == 4) {
        dd.setNavigationBar({ title: '归还申请' })
      }
      if (option.type == 5) {
        dd.setNavigationBar({ title: '延期申请' })
      }
      if (option.type == 6) {
        dd.setNavigationBar({ title: '实验取出申请' })
      }
      if (option.type == 7) {
        dd.setNavigationBar({ title: '过期销毁申请' })
      }
      if (option.type == 8) {
        dd.setNavigationBar({ title: '消耗完申请' })
      }
 
    }
  },
  // 获取弹窗
  change1(e) {
    this.setData({
      val: e.detail.value
    })
  },
  // 获取日期
  change2(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 获取归还类型
  change3(e) {
    this.setData({
      val3: e.detail.value
    })
  },
  // 获取归还类型
  change4(e) {
    this.setData({
      date1: e.detail.value
    })
  },
  //获取原因
  hasInput(e) {
    this.setData({
      dec: e.detail.value
    })
  },
  //预期天数
  hasInput1(e) {
    this.setData({
      days: parseFloat(e.detail.value)
    })
  },
  // 获取输入框 使用量
  hasUse(e) {
    let tempArr = this.data.list;
    tempArr.forEach((item, index) => {
      if (index == e.currentTarget.dataset.index) {
        if (parseFloat(e.detail.value) >= item.bc_capacity) {
          e.detail.value = item.bc_capacity;
        }
        item.ac_capacity = parseFloat(item.bc_capacity - parseFloat(e.detail.value));
      }
    });
    this.setData({
      list: tempArr
    })
  },
  // 提交
  submit() {
    console.log(this.data.list)
    // 转移申请
    if (this.data.type == 2) {
      app.http('/api/apply/applytransfer', {
        apply_reason: this.data.dec,
        product_type_id: this.data.productList[0].id,
        product_type: this.data.productList[0].name,
        remarks: '',
        instorage: {
          sample: this.data.list
        },
        outstorage: {
          sample: this.data.list
        }
      }).then(res => {
        if (res.data.success) {
          dd.showToast({
            type: 'success', 
            content: res.data.message
          })
          dd.navigateTo({
            url:'/page/mine/mine'
          })
        }
      })
    }
    // 挂失申请
    if (this.data.type == 3) {
      app.http('/api/apply/applyloss', {
        apply_reason: this.data.dec,
        product_type_id: this.data.productList[0].id,
        product_type: this.data.productList[0].name,
        remarks: '',
        outstorage: {
          sample: this.data.list
        }
      }).then(res => {
        if (res.data.success) {
          dd.showToast({
            type: 'success', 
            content: res.data.message
          })
        }
      })
    } 
    // 归还申请
    if (this.data.type == 4) {
      let tempArr = this.data.list;
      tempArr.forEach(item => {
        if (item.use > item.bc_capacity) {
          dd.showToast({
            content:'使用量不得大于当前容量'
          })
          return false;
        }
      })
      app.http('/api/apply/applyback', {
        apply_reason: this.data.dec,
        product_type_id: this.data.productList[0].id,
        product_type: this.data.productList[0].name,
        remarks: '',
        instorage: {
          sample: this.data.list
        }
      }).then(res => {
        if (res.data.success) {
          dd.showToast({
            type: 'success', 
            content: res.data.message
          })
        }
      })
    }
    // 延期申请
    if (this.data.type == 5) {
      app.http('/api/apply/applydelay', {
        apply_reason: this.data.dec,
        returnday: this.data.date,
        days: this.data.days,
        delaydays: this.data.date1,
        product_type_id: this.data.productList[0].id,
        product_type: this.data.productList[0].name,
        remarks: '',
        outstorage: {
          sample: this.data.list
        }
      }).then(res => {
        if (res.data.success) {
          dd.showToast({
            type: 'success',
            content: res.data.message
          })
        }
      })
    }
    // 实验取出
    if (this.data.type == 6) {
      app.http('/api/apply/applyborrow', {
        apply_reason: this.data.dec,
        returnday: this.data.date,
        returntype: parseInt(this.data.val) + 1,
        product_type_id: this.data.productList[0].id,
        product_type: this.data.productList[0].name,
        remarks: '',
        outstorage: {
          sample: this.data.list
        }
      }).then(res => {
        if (res.data.success) {
          dd.showToast({
            type: 'success',
             content: res.data.message
          })
        }
      })
    }
    // 过期销毁
    if (this.data.type == 7) {
      app.http('/api/apply/applyexpire', {
        apply_reason: this.data.dec,
        product_type_id: this.data.productList[0].id,
        product_type: this.data.productList[0].name,
        remarks: '',
        outstorage: {
          sample: this.data.list
        }
      }).then(res => {
        if (res.data.success) {
          dd.showToast({
            type: 'success',
             content: res.data.message
          })
        }
      })
    }
    // 消耗完申请
    if (this.data.type == 8) {
      app.http('/api/apply/applydepleted', {
        apply_reason: this.data.dec,
        product_type_id: this.data.productList[0].id,
        product_type: this.data.productList[0].name,
        remarks: '',
        outstorage: {
          sample: this.data.list
        }
      }).then(res => {
        if (res.data.success) {
          dd.showToast({
            type: 'success', 
            content: res.data.message
          })
        }
      })
    }
  },
  goSearch() {
    dd.navigateTo({
      url: '/page/search/search?type=' + this.data.type
    })
  },
  // 收起展开
  toggle() {
    this.setData({
      unfold: !this.data.unfold
    })
  },
  // 删除
  deleteItem(e) {
    dd.vibrate();//振动
    this.setData({
      showDialog: true,
      deleteId: e.currentTarget.dataset.index
    })
  },
  // 确定删除
  deleteSure() {
    let tempArr = this.data.list;
    tempArr.forEach((_, index) => {
      if (index == this.data.deleteId) {
        tempArr.splice(index, 1)
      }
    })
    this.setData({
      list: tempArr,
      showDialog: false
    })
  },
  // 取消删除
  deleteCancel() {
    this.setData({
      showDialog: false,
      deleteId: ''
    })
  },
});
