// miniprogram/pages/repair/index.js
const repairUrl=require('../../config').repairUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancle:function(){
    wx.showModal({
      title: '提示',
      content: '接受报修',
      showCancel: true,
      confirmText: "确定",
      success: function(res) {
        wx.request({
          url: repairUrl+'property_repair_add',
          method:'POST',
          data:{
            id:info.id,
            staffUserId:wx.getStorageSync('userInfo').id,
            workId:wx.getStorageSync('userInfo').workDto.id
          },
          success:function(res){
            console.log(res.data.data)
          }
        })
        wx.navigateBack()
      }
    })
  },
  onLoad: function (options) {
    var that=this
    wx.request({
      url: repairUrl+'property_repair_one',
      data:{
        id:options.id
      },
      method:'POST',
      success:function(res){
        that.setData({
          info:res.data.data
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