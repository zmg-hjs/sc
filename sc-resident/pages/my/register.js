// pages/my/register.js
const userUrl=require('../../config').userUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    telephone:'',
    unit:'',
    floor:'',
    door:''

  },
  changgeName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  changgeTel:function(e){
    this.setData({
      telephone:e.detail.value
    })
  },
  changgeUnit:function(e){
    this.setData({
      unit:e.detail.value
    })
  },
  changgeFloor:function(e){
    this.setData({
      floor:e.detail.value
    })
  },
  changgeDoor:function(e){
    this.setData({
      door:e.detail.value
    })
  },
  bindSubmit:function(e){
    wx.login({
      success: res => {
        wx.getUserInfo({
          success:ress=>{
            wx.request({
              url: userUrl+'register',
              data: {
                code: res.code,
                phoneNumber:'13938290826',
                iv:ress.iv,
                encryptedData:ress.encryptedData
              },
              method: 'POST',
              success: function (res) {
                wx.setStorageSync('userInfo', res.data.data)
                console.log('注册信息',wx.getStorageSync('userInfo'))
                wx.switchTab({
                        url: '../index/index',
                   })
              },
              fail: function (res) {
                console.log(".....fail.....");
              }
            })
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