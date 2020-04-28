// pages/repair/information.js
const repairUrl=require('../../config').repairUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list1:[],
    list2:[],
    list3:[],
    list4:[],
    list5:[],
    list6:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  cancle:function(e){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定取消报修吗',
      showCancel: true,
      confirmText: "确定",
      success: function(res) {
        wx.request({
          url: repairUrl+'resident_repair_cancel',
          data:{
            id:e.currentTarget.id,
          },
          method:'POST',
          success:function(res){

            that.getInformation()
            that.setData({
              list:that.data.list
            })
          }
        })
      }
    })
  },
  getInformation:function(){
    var that=this
    that.data.list.splice(0,that.data.list.length)
    that.data.list1.splice(0,that.data.list1.length)
    that.data.list2.splice(0,that.data.list2.length)
    that.data.list3.splice(0,that.data.list3.length)
    that.data.list4.splice(0,that.data.list4.length)
    that.data.list5.splice(0,that.data.list5.length)
    that.data.list6.splice(0,that.data.list6.length)
   
    wx.request({
      url: repairUrl+'resident_repair_list',
      data:{
        residentUserId:wx.getStorageSync('userInfo').id
      },
      method:'POST',
      success:function(res){
        that.setData({
          list:res.data.data
        })
        for(var i=0;i<that.data.list.length;i++){
          that.data.list[i].createDateStr=that.data.list[i].createDateStr.substr(5,11)
          if(that.data.list[i].maintenanceStatusStr=='派遣中'){
            that.data.list[i].process=25
            that.data.list1.push(that.data.list[i])
          }
          if(that.data.list[i].maintenanceStatusStr=='完成派遣'){
            that.data.list[i].process=50
            that.data.list2.push(that.data.list[i])
          }    
          if(that.data.list[i].maintenanceStatusStr=='维修中'){
            that.data.list[i].process=75
            that.data.list3.push(that.data.list[i])
          }
          if(that.data.list[i].maintenanceStatusStr=='完成维修'){
            that.data.list[i].process=100
            that.data.list4.push(that.data.list[i])
          }
          if(that.data.list[i].maintenanceStatusStr=='取消'){
            that.data.list[i].process=0
            that.data.list5.push(that.data.list[i])
          }
          if(that.data.list[i].maintenanceStatusStr=='反馈'){
            that.data.list[i].process=100
            that.data.list6.push(that.data.list[i])
          }
        }
        that.data.list.splice(0,that.data.list.length)
        that.data.list=that.data.list.concat(that.data.list1)
        that.data.list=that.data.list.concat(that.data.list2)
        that.data.list=that.data.list.concat(that.data.list3)
        that.data.list=that.data.list.concat(that.data.list4)
        that.data.list=that.data.list.concat(that.data.list5)
        that.data.list=that.data.list.concat(that.data.list6)
        
        that.setData({
          list:that.data.list
        })
        console.log(that.data.list)
      }
      })
  },
  response:function(e){
      wx.navigateTo({
        url: '/pages/repair/res?id='+e.currentTarget.id,
      })
  },
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
    this.getInformation()
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