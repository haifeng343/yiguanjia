Page({
  data: {
    rangeArr: ['约定归还，保留仓位', '不归还，仓位释放'],//弹窗列表
    val: '',//选择第几个
    rangeArr3: ['冻存盒转移', '材料转移'],
    val3: '',//选择第几个
    date: '',//时间
    dec: '',//原因
    showDialog: false,//是否展示弹出窗
    type: null,//1首次入库申请单 2转移申请单 3挂失申请表 4归还申请表 5延期申请表 6实验取出申请表 7过期销毁申请表  8消耗完申请
    list: null,//数据
    unfold:false,//展开收起
    deleteId:null,//删除的Id
  },
  onLoad(option) {
    if(option.type){
      this.setData({
        type:option.type
      })
      if(option.type==1){
        dd.setNavigationBar({title:'首次入库申请'})
      }
      if(option.type==2){
        dd.setNavigationBar({title:'转移申请'})
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
  //获取原因
  hasInput(e) {
    this.setData({
      dec: e.detail.valle
    })
  },
  submit() {
    
  },
  goSearch(){
    dd.navigateTo({
      url:'/page/search/search?type='+this.data.type
    })
  },
  // 收起展开
  toggle(){
    this.setData({
      unfold:!this.data.unfold
    })
  },
  // 删除
  deleteItem(e){
    dd.vibrate();//振动
    this.setData({
      showDialog:true,
      deleteId:e.currentTarget.dataset.index
    })
  }, 
  // 确定删除
  deleteSure(){
    let tempArr = this.data.list;
    tempArr.forEach((_,index)=>{
      if(index==this.data.deleteId){
        tempArr.splice(index,1)
      }
    })
    this.setData({
      list:tempArr,
      showDialog:false
    })
  },
  // 取消删除
  deleteCancel(){
    this.setData({
      showDialog:false,
      deleteId:''
    })
  },
});
