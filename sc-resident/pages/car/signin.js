// pages/car/signin.js
const carUrl=require('../../config').carUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starting:'',
    destination:'',
    flag1: false,
    flag2: false,
    date:"2020-3-9",
    time:"12.01",
    peopleNum:'',
    carNum:'',
    telephone:''
  },
  chooseLocation_1: function () {
    type: 'gcj02'
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          starting: res.name,
          flag1: true
        })
      },
    })
  },
  chooseLocation_2: function () {
    type: 'gcj02'
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          destination: res.name,
          flag2: true
        })
      },
    })
  },
  calculate: function () {
    console.log(this.data)
    wx.request({
      url: carUrl+'addCar',
      method:'POST',
      data:{
        starting:this.data.starting,
        destination:this.data.destination,
        peopleNum:this.data.peopleNum,
        time:this.data.time,
        telephone:this.data.telephone,
        userId:wx.getStorageSync('userInfo').id
      },
      success:function(res){
        console.log(res.data)
      }
      
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindNumChange:function(e){
    this.setData({
      peopleNum:e.detail.value  
    })
  },
  bindCarChange:function(e){
    this.setData({
      carNum:e.detail.value
    })
  },
  bindPhoneChange:function(e){
    this.setData({
      telephone:e.detail.value
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