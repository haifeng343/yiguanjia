Page({
  data: {
    navList: [1, 2, 3, 4, 5],
    showCengId: 1,//默认选择第一层
    cengList: [1, 2, 3, 4],//容器层数
    tag: 12,//9*9  12*12
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], //样本盒
    cells: Array.apply(null, {
      length: 81
    }).map(function (_, index) {
      return {
        id: index,
        number: index % 9 + 1
      };
    }),
   rangeArr: ['房间301','房间302'],//弹窗列表
    val: 0,//选择第几个
    rangeArr1: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    val1:[0,0],
  },
  onLoad() {


    let tempArr3 = [];
    let tempArr = this.data.items;
    let tempArr1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J','K','L','M'];
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
  // 获取弹窗
  change1(e) {
    this.setData({
      val: e.detail.value
    })
  },
  showItem(e) {
    console.log(e.currentTarget.dataset)
  },
  changeCeng(e) {
    this.setData({
      showCengId: e.currentTarget.dataset.id
    })
  },
});
