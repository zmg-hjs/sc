// miniprogram/pages/myNews/myNews.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.domainName + '/sc/property/news/resident_news_my_data',
      method: 'POST',
      data: {
        page: 1,
        limit: 50,
        staffUserId:app.globalData.userId
      },
      success: function (res) {
        that.setData({
          list: res.data.data
        })
        if (that.data.list.length > 0) {
          for (var i = 0; i < that.data.list.length; i++) {
            that.data.list.createDateStr = that.data.list.createDateStr.substring(0, 10)
          }
        }
      }

    })
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

  },
  add:function(){
    wx.redirectTo({
      url: '../editor/editor'
    })
  }
})