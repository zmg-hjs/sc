// pages/shop/information.js
const shopUrl=require('../../config').shopUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id:'',
  status:'',
  shop:'',
  imgUrl:'',
  people:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancle:function(){
    wx.request({
      url: shopUrl+'resident_commodity_order_cancel',
      method:'POST',
      data:{
        id:this.data.people.id,
        commodityId:this.data.people.commodityId
      },
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '删除成功',
          showCancel: false,
          confirmText: "确定",
          success: function(res) {
            wx.navigateBack()
          }
        })
      }
    })
  },
  delete:function(){
    wx.request({
      url: shopUrl+'resident_commodity_my_unpublish',
      method:'POST',
      data:{
        id:this.data.id
      },
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '删除成功',
          showCancel: false,
          confirmText: "确定",
          success: function(res) {
            wx.navigateBack()
          }
        })
      }
    })
  },
  cancle1:function(){
    wx.request({
      url: shopUrl+'resident_commodity_my_cancel',
      method:'POST',
      data:{
        id:this.data.id,
        commodityOrderId:this.data.people.id
      },
      success:function(res){
        wx.showModal({
          title: '提示',
          content: '删除成功',
          showCancel: false,
          confirmText: "确定",
          success: function(res) {
            wx.navigateBack()
          }
        })
      }
    })
  },
  onLoad: function (options) {
    console.log(options.status)
    this.setData({
      id:options.id,
      status:options.status
    })
    var that=this
    if(this.data.status=='publish'){
    wx.request({
      url: shopUrl+'resident_commodity_one',
      method:'POST',
      data:{
        id:options.id
      },
      success:function(res){
        console.log(res.data.data)
       var info=decodeURIComponent(res.data.data.commodityPictureUrl)
       var info1=JSON.parse(info)
       that.setData({
         imgUrl:info1[0],
         shop:res.data.data
       })
      }
    })
    return
  }
  if(this.data.status=='sale'){
    wx.request({
      url: shopUrl+'resident_commodity_one',
      method:'POST',
      data:{
        id:options.id
      },
      success:function(res){
        console.log(res.data.data)
       var info=decodeURIComponent(res.data.data.commodityPictureUrl)
       var info1=JSON.parse(info)
       that.setData({
         imgUrl:info1[0],
         shop:res.data.data
       })
      }
    })
    wx.request({
      url: shopUrl+'resident_commodity_order_one',
      method:'POST',
      data:{
        commodityId:this.data.id
       },
       success:function(res){
         that.setData({
           people:res.data.data
         })
         console.log(that.data.people)
       }
    })
    return
  }
  if(this.data.status=='buy'){
    wx.request({
      url: shopUrl+'resident_commodity_one',
      method:'POST',
      data:{
        id:options.id
      },
      success:function(res){
        console.log(res.data.data)
       var info=decodeURIComponent(res.data.data.commodityPictureUrl)
       var info1=JSON.parse(info)
       that.setData({
         imgUrl:info1[0],
         shop:res.data.data
       })
      }
    })
    wx.request({
      url: shopUrl+'resident_commodity_order_one',
      method:'POST',
      data:{
        commodityId:this.data.id
       },
       success:function(res){
         that.setData({
           people:res.data.data
         })
         console.log(that.data.people)
       }
    })
  }

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