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
    var that=this
    if(options.status=='publish'){
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
        }
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
            var info=decodeURIComponent(that.data.list[i].commodityPictureUrl)
            var info1=JSON.parse(info)
            that.data.list[i].headerUrl=info1[0]
          }
          that.setData({
            list:that.data.list,
            status:options.status,
            listName:'我的发布商品列表'
          })
        }
      })
      return
    }
    if(options.status=='sale'){
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
        }
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
            var info=decodeURIComponent(that.data.list[i].commodityPictureUrl)
            var info1=JSON.parse(info)
            that.data.list[i].headerUrl=info1[0]
          }
          that.setData({
            list:that.data.list,
            status:options.status,
            listName:'我的售出商品列表'
          })
        }
      })
      return
    }
    if(options.status=='buy'){
      // wx.request({
      //   url: shopUrl+'resident_commodity_order_list',
      //   method:'POST',
      //   data:{
      //     buyerId:wx.getStorageSync('userInfo').id,
      //     commodityStatus:'in_transaction'
      //   },
      //   success:function(res){
      //     var count=res.data.data.length-1
      //     for(var i=0;i<res.data.data.length;i++){
      //       var count1=i
      //       wx.request({
      //         url: shopUrl+'resident_commodity_one',
      //         method:'POST',
      //         data:{
      //           id:res.data.data[i].commodityId
      //         },
      //         success:function(ress){
      //           // that.setData({
      //           //   list:that.data.list.concat(ress.data.data)
      //           // })
      //           that.data.list=that.data.list.concat(ress.data.data)
      //           console.log(that.data.list)
      //         }
      //       })
      //     }
      //   }
      // })
      wx.request({
        url: shopUrl+'resident_commodity_order_list',
        method:'POST',
        data:{
          buyerId:wx.getStorageSync('userInfo').id,
          commodityStatus:'in_transaction'//'transaction_successfu'//
        },
        success:function(res){
          if(res.data.data.length==0){
            console.log("没有了")
            for(var i=0;i<that.data.list.length;i++){
              var info=decodeURIComponent(that.data.list[i].commodityPictureUrl)
              var info1=JSON.parse(info)
              that.data.list[i].headerUrl=info1[0]
              if(i==that.data.list.length-1){
                console.log("没有了")
                that.setData({
                  list:that.data.list,
                  status:options.status,
                  listName:'我的购买商品列表'
                })

            }
            }
            // that.setData({
            //   list:that.data.list,
            //   status:options.status,
            //   listName:'我的购买商品列表'
            // })
            console.log(that.data.list)
          }
          else{
          var count=res.data.data.length-1
          for(var i=0;i<res.data.data.length;i++){
            var count1=i
            wx.request({
              url: shopUrl+'resident_commodity_one',
              method:'POST',
              data:{
                id:res.data.data[i].commodityId
              },
              success:function(ress){
                that.setData({
                  list:that.data.list.concat(ress.data.data)
                })
                console.log(count)
                console.log(count1)
                if(count1==count){
                  console.log(count)
                  for(var i=0;i<that.data.list.length;i++){
                    var info=decodeURIComponent(that.data.list[i].commodityPictureUrl)
                    var info1=JSON.parse(info)
                    that.data.list[i].headerUrl=info1[0]
                  }
                  that.setData({
                    list:that.data.list,
                    status:options.status,
                    listName:'我的购买商品列表'
                  })
                  console.log("kaisl")
                }
      
              }
            })
          }
        }
        }
      })
      return
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