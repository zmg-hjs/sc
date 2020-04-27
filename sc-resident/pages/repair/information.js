// pages/repair/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id:'1',
        status:'维修成功',
        name:'鲁班大师',
        process:'100'
      },
      {
        id:'1',
        status:'派遣中',
        name:'鲁班大师',
        process:'0'
      },
      {
        id:'1',
        status:'派遣成功',
        name:'鲁班大师',
        process:'25'
      },
      {
        id:'1',
        status:'维修中',
        name:'鲁班大师',
        process:'50'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancle:function(){
    wx.showModal({
      title: '提示',
      content: '确定取消报修吗',
      showCancel: true,
      confirmText: "确定",
      success: function(res) {
        wx.navigateBack()
      }
    })
  },
  response:function(){
      wx.navigateTo({
        url: '/pages/repair/res',
      })
  },
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