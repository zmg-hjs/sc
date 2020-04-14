// miniprogram/pages/activity/add1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     inf:{
       actStaD:'',
       actStaT:'',
       actEndD:'',
       actEndT:'',
       votStaD:'',
       votStaT:'',
       votEndD:'',
       votEndT:'',
       name:''
     },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindActStaD:function(e){
    this.setData({
      ['inf.actStaD']:e.detail.value
    })
  },
  bindActStaT:function(e){
    this.setData({
      ['inf.actStaT']:e.detail.value
    })
  },
  bindActEndD:function(e){
    this.setData({
      ['inf.actEndD']:e.detail.value
    })
  },
  bindActEndT:function(e){
    this.setData({
      ['inf.actEndT']:e.detail.value
    })
  },
  bindVotStaD:function(e){
    this.setData({
      ['inf.votStaD']:e.detail.value
    })
  },
  bindVotStaT:function(e){
    this.setData({
      ['inf.votStaT']:e.detail.value
    })
  },
  bindVotEndD:function(e){
    this.setData({
      ['inf.votEndD']:e.detail.value
    })
  },
  bindVotEndT:function(e){
    this.setData({
      ['inf.votEndT']:e.detail.value
    })
  },
  bindNameChange:function(e){
    this.setData({
      ['inf.name']:e.detail.value
    })
  },
  submit:function(){
    var info=JSON.stringify(this.data.inf)
    console.log(info)
    wx.navigateTo({
      url: './add?inf='+info,
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