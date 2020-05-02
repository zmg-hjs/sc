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
    current:'',
    shop:''
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
    if(this.data.current=='shop'){
      wx.request({
        url: shopUrl+'resident_commodity_buy',
        method:'POST',
        data:{
          commodityId:this.data.id,
          buyerId:wx.getStorageSync('userInfo').id,
          buyerActualName:wx.getStorageSync('userInfo').actualName,
          buyerPhoneNumber:wx.getStorageSync('userInfo').phoneNumber,
          harvestAddress:wx.getStorageSync('userInfo').address
        },
        success:function(res){
          console.log(res.data)
          wx.showModal({
            title: '提示',
            content: '下单成功，等待发货',
            showCancel: false,
            confirmText: "确定",
            success: function(res) {
              wx.navigateBack()
            }
          })
        }
      })
    }
},
  onLoad: function (options) {
       this.setData({
         id:options.id
       })
       console.log(this.data.id)
       var that=this
       wx.request({
         url: shopUrl+'resident_commodity_one',
         method:'POST',
         data:{
           id:options.id
         },
         success:function(res){
          that.setData({
            imgUrls:res.data.data.commodityPictureUrl.split(','),
            shop:res.data.data
          })
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