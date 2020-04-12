// pages/car/join.js
const carUrl=require('../../config').carUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
     starting:'',
     destination:'',
     id:'',
     telephone:'',
     num:'2'
  },
bindNumChange:function(e){
  this.setData({
    num: e.detail.value
  })
},
submit: function(){
  wx.request({
    url: carUrl+'addCarpool',
    method:'POST',
    data:{
      id:this.data.num,
      userId:wx.getStorageSync('userInfo').id
     }
    })
  wx.showModal({
    title: '提示',
    content: '提交成功',
    showCancel: false,
    confirmText: "确定",
    success: function(res) {
      wx.navigateBack({
        delta: 2
    })
    }
  })

},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      destination:options.destination,
      starting:options.starting,
      telephone:options.telephone
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