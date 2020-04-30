// pages/shop/shop.js
const shopUrl=require('../../config').shopUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "http://img0.imgtn.bdimg.com/it/u=2394972844,3024358326&fm=26&gp=0.jpg",
      "http://img5.imgtn.bdimg.com/it/u=3008142408,2229729459&fm=26&gp=0.jpg",
      "http://img4.imgtn.bdimg.com/it/u=2939038876,2702387014&fm=26&gp=0.jpg"
    ],
    current:''
},
  /**
   * 生命周期函数--监听页面加载
   */
  
  handleChange ({ detail }) {
    this.setData({
      current: detail.key
  });
    if(this.data.current=='homepage'){
      wx.navigateBack()
    }
    console.log(this.data.current)
},
  onLoad: function (options) {
       this.setData({
         id:options.id
       })
       console.log(this.data.id)
       wx.request({
         url: shopUrl+'resident_commodity_one',
         method:'POST',
         data:{
           id:options.id
         },
         success:function(res){
           console.log(res)
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