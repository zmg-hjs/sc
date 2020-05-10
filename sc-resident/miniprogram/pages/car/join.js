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
     num:'2',
     now:''
  },
bindNumChange:function(e){
  this.setData({
    num: e.detail.value
  })
},
submit: function(){
  if(this.data.num<=this.data.now){
  wx.request({
    url: carUrl+'addCarpool',
    method:'POST',
    data:{
      id:this.data.id,
      carpoolNumber:this.data.num,
      userId:wx.getStorageSync('userInfo').id
     },
     success:function(res){
      wx.showModal({
        title: '提示',
        content: '拼车成功',
        showCancel: false,
        confirmText: "确定",
        success: function(res) {
          wx.navigateBack()
        }
      })
      console.log(res.data)
     }
    })
}else{
  wx.showModal({
    title: '提示',
    content: '剩余座位不足',
    showCancel: false,
    confirmText: "确定",
    success: function(res) {
      wx.navigateBack()
    }
  })
}

},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      destination:options.destination,
      starting:options.starting,
      telephone:options.telephone,
      now:options.now
    })
    if(this.data.now=='0'){
      wx.showModal({
        title: '提示',
        content: '拼车人员已满',
        showCancel: false,
        confirmText: "确定",
        success: function(res) {
          wx.navigateBack()
        }
      })
    }
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