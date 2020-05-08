// miniprogram/pages/chat/im/chat.js
const userUrl=require('../../../config').userUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:'2',
    img:wx.getStorageSync('userInfo').headPictureUrl,
    current:'notice',
    users:'',
    chatRoomEnvId: 'sc-qzcty',
    rooms:[],
    name:'',
    openId:''
  },
  handleChange ({ detail }) {
    this.setData({
      current: detail.key
  });
    if(this.data.current=='notice'){
      var that=this
      const db=wx.cloud.database({
        env:this.data.chatRoomEnvId
      })
      const _ = db.command
      db.collection('room').where(_.or([
        _.or({
          people1:wx.getStorageSync('userInfo').username
        }),
        _.or({
          people2:wx.getStorageSync('userInfo').username
        }),
        _.or({
          people1:'社区总群'
        })
      ])).get().then(res => {
        that.setData({
          rooms:res.data,
          name:wx.getStorageSync('userInfo').username,
          show:'2'
        })
        console.log(that.data.rooms)
      })
  }
    if(this.data.current=='group'){
      var that=this
      wx.request({
        url: userUrl+'all',
        method:'POST',
        data:{
          id:wx.getStorageSync('userInfo').id
        },
        success:function(res){
          that.setData({
            users:res.data.data,
            show:'1'
          })
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
    var that=this
    const db=wx.cloud.database({
      env:this.data.chatRoomEnvId
    })
    const _ = db.command
    db.collection('room').where(_.or([
      _.or({
        people1:wx.getStorageSync('userInfo').username
      }),
      _.or({
        people2:wx.getStorageSync('userInfo').username
      }),
      _.or({
        people1:'社区总群'
      })
    ])).get().then(res => {
      that.setData({
        rooms:res.data,
        name:wx.getStorageSync('userInfo').username,
        openId:wx.getStorageSync('userInfo').openId,
        show:'2'
      })
      console.log(that.data.rooms)
    })
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