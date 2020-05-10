// pages/vote/information.js
const activityUrl=require('../../config').activityUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
       id:'',
       activity:'',
       content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.request({
      url: activityUrl+'findOne',
      method:'POST',
      data:{
        id:options.id
      },
      success:function(res){
        that.setData({
          id:options.id,
          activity:res.data.data,
          content:res.data.data.content,
          status:res.data.data.activityStatus

        })
        console.log(res.data)
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