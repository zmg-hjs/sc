// pages/my/change.js
const userUrl = require('../../config.js').userUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'',
    infoArray:{
      name:'姓名',
      tel:'手机号',
      floor:'楼层',
      unit:'单元号',
      door:'门牌号',

    },
    value:'',
    userInfo:wx.getStorageSync('userInfo'),
    temp:'',
    changeWhat:''

  },
  valueChange:function(res){
    this.setData({
      temp:res.detail.value
    })
   },
   submit:function(){
      if(this.data.temp==''){
       wx.showToast({
         title: this.data.infoArray[this.data.changeWhat]+'不能为空',
         icon:'none'
       })
       return
     }
     if(this.data.tmp==this.data.userInfo[this.data.changeWhat]){
       wx.navigateBack()
     }else{
     wx.request({
       url: userUrl + 'updateInfo',
       data:{
         openid:wx.getStorageSync('jiaoxue_OPENID'),
         change:this.data.changeWhat,
         value:this.data.temp
       },
       success:res =>{
         if(res.data.success){
         this.data.userInfo[this.data.changeWhat]=this.data.temp,
         wx.setStorageSync('userInfo',this.data.userInfo),
         wx.navigateBack()
       }else{
         wx.showToast({
           title: '修改失败',
           icon:'none'
         })
         wx.navigateBack()
       }
       }
     })
     }
   },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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