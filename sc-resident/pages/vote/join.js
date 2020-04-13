// pages/vote/join.js
const voteUrl=require('../../config').voteUrl
const activityUrl=require('../../config').activityUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId:'',
    name:'',
    content:'',
    address:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindNameChange:function(e){
    this.setData({
       name:e.detail.value
    })
  },
  bindAdrChange:function(e){
    this.setData({
       address:e.detail.value
    })
  },
  bindConChange:function(e){
    this.setData({
       content:e.detail.value
    })
  },
  onLoad: function (options) {
    this.setData({
      activityId:options.id
    })
  },
  submit: function(){
    var that=this
        wx.request({
          url: activityUrl+'enroll/add',
          method:'POST',
          data:{
            activityId:that.data.activityId,
            residentUserId:wx.getStorageSync('userInfo').id,
            residentUserActualName:that.data.name,
            residentUserAddress:that.data.address,
            briefIntroduction:that.data.content
          },
          success:function(res){
            wx.showModal({
              title: '提示',
              content: '报名成功，等待审核',
              showCancel: false,
              confirmText: "确定",
              success: function(res) {
                wx.navigateBack({
                  delta: 2
              })
              }
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