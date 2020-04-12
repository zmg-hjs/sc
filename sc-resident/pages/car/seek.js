// pages/car/seek.js
const carUrl=require('../../config').carUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[
        {
          id:'1',
          starting:'郑州',
          destination:'南阳',
          peopleNum:'2',
          telephone:'12635',
          carNum:'豫A2365',
          date:'2020-2-3',
          time:'8:00'

        },
        {
          id:'2',
          starting:'新密',
          destination:'郑州',
          peopleNum:'3',
          telephone:'12625',
          carNum:'豫A2665',
          date:'2020-2-3',
          time:'9:00'
        },
        {
          id:'3',
        starting:'郑州',
        destination:'安阳',
        peopleNum:'2',
        telephone:'19635',
        carNum:'豫B2365',
        date:'2020-2-3',
        time:'10:00'
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       wx.request({
         url: carUrl+'find',
         method:'POST',
         data:{

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