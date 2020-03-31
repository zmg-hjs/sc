// pages/car/My.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starting:'郑州',
    destination:'南阳',
    id:'',
    telephone:'1264552',
    num:'2',
    actions : [
      {
          name : '删除',
          color : '#fff',
          fontsize : '20',
          width : 100,
          icon : 'delete_fill',
          background : '#ed3f14'
      }
    ]
  },
  handleCancel2 () {
    this.setData({
        visible2: false,
        toggle : this.data.toggle ? false : true
    });
    console.log( this.data.toggle,111111111 )
},
handleClickItem2 () {
    const action = [...this.data.actions2];
    action[0].loading = true;

    this.setData({
        actions2: action
    });

    setTimeout(() => {
        action[0].loading = false;
        this.setData({
            visible2: false,
            actions2: action,
            toggle: this.data.toggle ? false : true
        });
        
    }, 2000);
},
handlerCloseButton(){
    this.setData({
        toggle2: this.data.toggle2 ? false : true
    });
},
actionsTap(){
    this.setData({
        visible2: true
    });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})