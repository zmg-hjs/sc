// miniprogram/pages/task/list.js
const repairUrl=require('../../config').repairUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
     status:'',
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status:options.status
    })


    console.log(this.data.status)
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
    var that=this
    wx.request({
      url: repairUrl+'property_repair_my_list',
      data:{
        staffUserId:wx.getStorageSync('userInfo').id,
        maintenanceStatus:that.data.status
      },
      method:'POST',
      success:function(res){
        that.setData({
          list:res.data.data
        })
        console.log(res.data.data)
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