// pages/repair/res.js
const repairUrl=require('../../config').repairUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starIndex:3,
    content:'',
    id:''
  },
  onChange:function(e){
    const index = e.detail.index;
    this.setData({
      'starIndex' : index
  })
  },
  bindContentChange:function(e){
    this.setData({
      content:e.detail.value
   })
   console.log(this.data.content)
  },
  submit:function(){
    var that=this
    wx.request({
      url: repairUrl+'resident_repair_feedback',
      data:{
        id:that.data.id,
        maintenanceFeedback:this.data.content,
        score:this.data.starIndex
      },
      method:'POST',
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '成功',
          showCancel: false,
          confirmText: "确定",
          success: function(res) {
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
      this.setData({
        id:options.id
      })
      console.log(this.data.id)
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