// pages/vote/activity.js
const activityUrl=require('../../config').activityUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        title:'小区居委会委员第二次选举',
        content:'小区居委会委员第二次选举内容如下',
        host_party:'小区物业',
        activity_end_time:'4-8 8:00',
        activity_start_time:'4-1 8:00',
        voting_start_time:'4-5 8:00',
        voting_end_time:'4-6 8:00'
      },
      {
        title:'小区居委会委员第三次选举',
        content:'小区居委会委员第三次选举内容如下',
        host_party:'小区物业',
        activity_end_time:'7-8 8:00',
        activity_start_time:'7-1 8:00',
        voting_start_time:'7-5 8:00',
        voting_end_time:'7-6 8:00'
      },

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: activityUrl+'findAll',
      method:'POST',
      data:{

      },
      success:function(res){
        that.setData({
          list:res.data.data
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