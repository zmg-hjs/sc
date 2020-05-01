// pages/shop/commodity.js
const shopUrl=require('../../config').shopUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    headerUrl:'',
    current_scroll: 'clothes'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  handleChangeScroll ({ detail }) {
    console.log(detail.key)
    this.setData({
        current_scroll: detail.key,
    });
    var that=this
    wx.request({
      url: shopUrl+'/resident_commodity_list',
      method:'POST',
      data:{
        commodityClassification:detail.key,
        commodityStatus:'audit_successful'
      },
      success:function(res){
        that.setData({
          list:res.data.data
        })
        for(var i=0;i<that.data.list.length;i++){
          var info=decodeURIComponent(that.data.list[i].commodityPictureUrl)
          var info1=JSON.parse(info)
          that.data.list[i].headerUrl=info1[0]
        }
        that.setData({
          list:that.data.list
        })
      }
    })
},
submit:function(e){
  wx.navigateTo({
    url: './shop?id='+e.currentTarget.id,
  })
},
handleChange ({ detail }) {
  wx.navigateTo({
    url: './publish',
  })
},
  onLoad: function (options) {
    var that=this
    wx.request({
      url: shopUrl+'/resident_commodity_list',
      method:'POST',
      data:{
        commodityClassification:'clothes',
        commodityStatus:'audit_successful'
      },
      success:function(res){
        that.setData({
          list:res.data.data
        })
        for(var i=0;i<that.data.list.length;i++){
          var info=decodeURIComponent(that.data.list[i].commodityPictureUrl)
          var info1=JSON.parse(info)
          that.data.list[i].headerUrl=info1[0]
        }
        that.setData({
          list:that.data.list
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