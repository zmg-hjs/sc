// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    nickName:'请登录',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false,
    menuitems: [
      { text: '我的消息发布', url: '../userinfo/userinfo', icon: '../../images/icon-index.png', tips: '' },
      { text: '联系我们', url: '../userinfo/userinfo', icon: '../../images/icon-index.png', tips: '' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    });
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (!that.data.logged && e.detail.userInfo) {
      that.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        userInfo: e.detail.userInfo
      })
    }
    
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
        console.log("用户的res:" + res);
        console.log("用户的code:" + res.code);
        if (res.code) {
          wx.request({
            url: 'http://localhost:8002/sc/resident/user/register',
            method: 'POST',
            data: {
              code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
              phoneNumber: "13938290826"
            },
            success: function (e) {
              console.log("1:" + e.data.code)
              console.log("1:" + e.data.data.iv)
            },
            fail: function (e) {
              console.log("2:" + e.data.code)
            },
            complete: function (e) {
              console.log("3:" + e.data.code)
            }
          })
        }
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