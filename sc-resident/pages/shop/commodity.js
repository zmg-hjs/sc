// pages/shop/commodity.js
const shopUrl=require('../../config').shopUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        title:'小台芒 2斤/袋',
        url:'http://5b0988e595225.cdn.sohucs.com/images/20170910/551ced4e517b4828a841142e056a6b4c.jpeg',
        id:'1',
        seller:'18.6'
      },
      {
        title:'红富士苹果 2斤/袋',
        url:'http://img.chemcp.com/201910/187099201910191014583088.jpg',
        id:'2',
        seller:'10'
      },
      {
        title:'小黄瓜 2斤/袋',
        url:'http://img.mp.sohu.com/upload/20170712/280d28acfe3643bab859b38a61d1cccd_th.png',
        id:'1',
        seller:'13'
      },
    ],
    list1:[
      {
        title:'小黄瓜 2斤/袋',
        url:'http://img.mp.sohu.com/upload/20170712/280d28acfe3643bab859b38a61d1cccd_th.png',
        id:'1',
        seller:'13'
      },
      {
        title:'红富士苹果 2斤/袋',
        url:'http://img.chemcp.com/201910/187099201910191014583088.jpg',
        id:'2',
        seller:'10'
      },
      {
        title:'小台芒 2斤/袋',
        url:'http://5b0988e595225.cdn.sohucs.com/images/20170910/551ced4e517b4828a841142e056a6b4c.jpeg',
        id:'1',
        seller:'18.6'
      }
    ],
    current_scroll: 'clothes'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  handleChangeScroll ({ detail }) {
    console.log(detail.key)
    this.setData({
        current_scroll: detail.key,
        list:this.data.list1
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
        console.log(res.data)
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
        commoditystatus:'audit_successful'
      },
      success:function(res){
        console.log(res.data)
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