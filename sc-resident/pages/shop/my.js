// pages/shop/my.js
const shopUrl=require('../../config').shopUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    listName:'',
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status:options.status,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    that.data.list.splice(0,that.data.list.length)
    if(this.data.status=='publish'){
      that.setData({
        listName:'我的发布商品列表'
      })
      wx.request({
        url: shopUrl+'resident_commodity_my_list',
        method:'POST',
        data:{
          businessId:wx.getStorageSync('userInfo').id,
          commodityStatus:'audit_successful'
        },
        success:function(res){
          that.setData({
            list:that.data.list.concat(res.data.data)
          })
          wx.request({
            url: shopUrl+'resident_commodity_my_list',
            method:'POST',
            data:{
              businessId:wx.getStorageSync('userInfo').id,
              commodityStatus:'under_review'
            },
            success:function(res){
              that.setData({
                list:that.data.list.concat(res.data.data)
              })
              for(var i=0;i<that.data.list.length;i++){
                that.data.list[i].commodityPictureUrl=that.data.list[i].commodityPictureUrl.split(",")
                that.data.list[i].headerUrl=that.data.list[i].commodityPictureUrl[0]
              }
              that.setData({
                list:that.data.list,
              })
            }
          })
        }
      })

      return
    }
    if(this.data.status=='sale'){
      that.setData({
        listName:'我的售出商品列表'
      })
      wx.request({
        url: shopUrl+'resident_commodity_my_list',
        method:'POST',
        data:{
          businessId:wx.getStorageSync('userInfo').id,
          commodityStatus:'in_transaction'
        },
        success:function(res){
          that.setData({
            list:that.data.list.concat(res.data.data)
          })
          wx.request({
            url: shopUrl+'resident_commodity_my_list',
            method:'POST',
            data:{
              businessId:wx.getStorageSync('userInfo').id,
              commodityStatus:'transaction_successful'
            },
            success:function(res){
              that.setData({
                list:that.data.list.concat(res.data.data)
              })
              for(var i=0;i<that.data.list.length;i++){
                that.data.list[i].commodityPictureUrl=that.data.list[i].commodityPictureUrl.split(",")
                that.data.list[i].headerUrl=that.data.list[i].commodityPictureUrl[0]
              }
              that.setData({
                list:that.data.list,
              })
            }
          })
        }
      })
      return
    }
    if(this.data.status=='buy'){
      that.setData({
        listName:'我买到的商品列表'
      })
      wx.request({
        url: shopUrl+'resident_commodity_order_list',
        method:'POST',
        data:{
          buyerId:wx.getStorageSync('userInfo').id,
          commodityStatus:'in_transaction'
        },
        success:function(res){
          that.setData({
            list:that.data.list.concat(res.data.data)
          })
          wx.request({
            url: shopUrl+'resident_commodity_order_list',
            method:'POST',
            data:{
              buyerId:wx.getStorageSync('userInfo').id,
              commodityStatus:'transaction_successful'
            },
            success:function(res){
              console.log(res.data.data)
              that.setData({
                list:that.data.list.concat(res.data.data)
              })
              for(var i=0;i<that.data.list.length;i++){
                that.data.list[i].commodityPictureUrl=that.data.list[i].commodityPictureUrl.split(",")
                that.data.list[i].headerUrl=that.data.list[i].commodityPictureUrl[0]
              }
              that.setData({
                list:that.data.list,
              })
            
            }
          })
        }
      })

      return
    }


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