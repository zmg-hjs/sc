// miniprogram/pages/charges/index.js
const chargesUrl=require('../../config').chargesUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[]
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
    this.setData({
      list:[]
    })
    var that=this
    wx.request({
      url: chargesUrl+'/resident_payment_list',
      method:'POST',
      data:{
        residentUserId:wx.getStorageSync('userInfo').id,
        paymentStatus:'unpaid'
      },
      success:function(res){
        that.setData({
          list:that.data.list.concat(res.data.data)
        })
        wx.request({
          url: chargesUrl+'/resident_payment_list',
          method:'POST',
          data:{
            residentUserId:wx.getStorageSync('userInfo').id,
            paymentStatus:'paid'
          },
          success:function(ress){
            that.setData({
              list:that.data.list.concat(ress.data.data)
            })
            console.log(that.data.list)
          }
        })
      }
    })
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