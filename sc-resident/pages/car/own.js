// pages/car/My.js
const carUrl=require('../../config').carUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    carpoolStatus:'',
    actions : [
      {
          name : '取消',
          color : '#fff',
          fontsize : '20',
          width : 100,
          icon : 'delete_fill',
          background : '#ed3f14'
      }
    ]
  },
  submit(e){
      var that=this
      wx.showModal({
        title: '提示',
        content: '确定取消拼车吗',
        showCancel: true,
        confirmText: "确定",
        success: function(res) {
        wx.request({
          url: carUrl+'cancel',
          method:'POST',
          data:{
              id:e.currentTarget.id,
              userId:wx.getStorageSync('userInfo').id
          },
          success:function(res){
              wx.request({
                url: carUrl+'my',
                method:'POST',
                data:{
                    carpoolStatus:that.data.carpoolStatus,
                    userId:wx.getStorageSync('userInfo').id
                },
                success:function(res){
                    that.setData({
                        list:res.data.data
                    })
                    console.log('修改后',that.data.list)
                }
              })
          }
          
        })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this
     wx.request({
        url: carUrl+'my',
        method:'POST',
        data:{
            carpoolStatus:options.carpoolStatus,
            userId:wx.getStorageSync('userInfo').id
        },
        success:function(res){
            that.setData({
                list:res.data.data,
                carpoolStatus:options.carpoolStatus
            })
            console.log(that.data.list)
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