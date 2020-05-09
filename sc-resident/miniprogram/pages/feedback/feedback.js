// pages/feedback/feedback.js
var complaintUrl=require('../../config').complaintUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    complaint:''
  },
  bindContentChange:function(e){
    this.setData({
      complaint:e.detail.value
    })
  },
  submit:function(){
   wx.request({
     url: complaintUrl+'resident_complint_add',
     data:{
      residentUserId:wx.getStorageSync('userInfo').id,
      residentUserActualName:wx.getStorageSync('userInfo').actualName,
      complaintContent:this.data.complaint
     },
     method:'POST',
     success:function(res){
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '投诉提交成功',
          showCancel: false,
          confirmText: "确定",
          success: function() {
            wx.navigateBack()
          }
        })
     }
   })
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