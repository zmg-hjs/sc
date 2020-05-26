// miniprogram/pages/charges/charges.js
const chargesUrl=require('../../config').chargesUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
      payment:{},
      id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: chargesUrl+'/resident_payment_one',
      data:{
         id:options.id
      },
      method:'POST',
      success:function(res){
        console.log(res.data)
         that.setData({
           payment:res.data.data
         })
         console.log(that.data.payment)
      }
    })
  },
 payMent(){
   wx.request({
     url: chargesUrl+'/resident_payment_update',
     method:'POST',
     data:{
         id:this.data.payment.id
     },
     success:function(res){
      wx.showModal({
        title: '提示',
        content: '支付成功',
        showCancel: false,
        confirmText: "确定",
        success: function(res){
          wx.navigateBack()
         },
    })
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

  }
})