// pages/vote/voting.js
const voteUrl=require('../../config').voteUrl
const activityUrl=require('../../config').activityUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId:'',
    list:[],
    position:'right',
    current: '',
    id:'',
    enrollId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId:options.id
    })
    var that=this
    wx.request({
      url: activityUrl+'/enroll/findAll',
      method:'POST',
      data:{
        activityId:this.data.activityId
      },
      success:function(res){
        that.setData({
          list:res.data.data
        })
        console.log('获取数据',res.data)
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleVoterChange({ detail = {} }) {
    this.setData({
        current: detail.value
    });
  },
  submit: function(){
    for(var i=0;i<this.data.list.length;i++){
      if(this.data.list[i].residentUserActualName==this.data.current)
      this.setData({
        id:this.data.list[i].residentUserId,
        enrollId:this.data.list[i].id
      })
    }
    console.log(this.data.id)
    var that=this
    wx.request({
      url: voteUrl+'findOne',
      method:'POST',
      data:{
        residentUserId:wx.getStorageSync('userInfo').id,
        activityId:this.data.activityId
      },
      success:function(res){
      console.log(res.data)
        if(res.data.code=="-1"){
        wx.request({
          url: voteUrl+'add',
          method:'POST',
          data:{
            activityId:that.data.activityId,
            votedPersonId:that.data.id,
            residentUserId:wx.getStorageSync('userInfo').id,
            residentUserActualName:wx.getStorageSync('userInfo').actualName,
            votedPersonActualName:that.data.current,
            enrollId:that.data.enrollId
          },
          success:function(res){
            wx.showModal({
              title: '提示',
              content: '投票成功',
              showCancel: false,
              confirmText: "确定",
              success: function(res) {
                wx.navigateBack({
                  delta: 2
              })
              }
            })
            console.log(that.data.current)
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '您已经投过票了',
          showCancel: false,
          confirmText: "确定",
          success: function(res) {
            wx.navigateBack({
              delta: 2
          })
          }
        })
      }
      }
    })
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