// pages/my/change.js
const userUrl = require('../../config.js').userUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'',
    infoArray:{
      actualName:'姓名',
      phoneNumber:'电话号',
      floor:'楼层',
      unit:'单元号',
      door:'门牌号',

    },
    value:'',
    userInfo:'',
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
       url: userUrl + 'update',
       method:"POST",
       data:{
         openId:this.data.userInfo.openId,
         change:this.data.changeWhat,
         value:this.data.temp
       },
       success:res =>{
         if(res.data.code==1){
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
    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
      placeholder: '请输入' + this.data.infoArray[options.changeWhat],
      value: this.data.userInfo[options.changeWhat],
      changeWhat:options.changeWhat,
    })
    console.log("load",this.data.value)
    wx.setNavigationBarTitle({
      title: '修改' + this.data.infoArray[options.changeWhat]
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
    this.setData({    
      value: this.data.userInfo[this.data.changeWhat],
    })
    console.log("show",this.data.value)
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