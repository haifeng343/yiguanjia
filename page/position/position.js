Page({
  data: {
    navList: [1, 2, 3, 4, 5],
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9], //样本盒
    cells: Array.apply(null, {
        length: 81
      }).map(function(_, index) {
        return {
          id: index,
          number: index % 9 + 1
        };
      })
  },
  onLoad() {
    // let tempArr3 = [];
    // let tempArr = this.data.items;
    // let tempArr1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','J'];
    // tempArr.forEach((item, index) => {
    //   tempArr1.forEach((item1, index1) => {
    //     tempArr3.push({
    //       id: index % 9 + 1,
    //       name: item1 + (index+1)
    //     });
    //   });
    // });
    // // console.log(tempArr3);
    // this.setData({
    //   items:tempArr3
    // })
  },
  showItem(e){
    console.log(e.currentTarget.dataset.item)
  }
});
