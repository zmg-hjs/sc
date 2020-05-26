// miniprogram/pages/mine/mine.js
const workUrl=require('../../config').workUrl
const app = getApp()
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
      { text: '我的消息发布', url: '../myNews/myNews', icon: '../../images/icon-index.png', tips: '' },
      { text: '联系我们', url: '../userinfo/userinfo', icon: '../../images/icon-index.png', tips: '' }
    ],
    status:["on_duty_status","come_off_duty","be_busy",],
    countries: ["上班", "下班", "忙碌"],
    statusImgs:["/images/status1.png","/images/status2.png","/images/status3.png"],
    countryIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindStatusChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', this.data.countries[e.detail.value]);
    this.setData({
        countryIndex: e.detail.value,
    })
    wx.request({
      url: workUrl+'work',
      method:'POST',
      data:{
       id:wx.getStorageSync('userInfo').workDto.id,
       workStatus:this.data.status[e.detail.value]
      },
      success:function(res){
        console.log(res.data)
      }
    })
},
  onLoad: function (options) {
    var status=wx.getStorageSync('userInfo').workDto.workStatusStr
    console.log(status)
    if(status==="下班"){
     this.setData({
       countryIndex:1
     })
     console.log("下班")
    }
     if(status==="上班"){
     this.setData({
       countryIndex:0
     })
     console.log("上班")
    }
     if(status==="忙碌"){
     this.setData({
       countryIndex:2
     })
     console.log("忙碌")
    }
    var that =this;
    if (app.globalData.userId == null || app.globalData.userId == ""){
      console.log(app.globalData.userId)
      wx.showModal({
        title: '注意',
        content: '物业端小程序仅供物业工作人员使用，使用前请确认你的手机号已在后台管理系统中录入？',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../userlogin/userlogin'
            })
            console.log(1)
          } else if (res.cancel) {
            wx.switchTab({
              url: "/pages/index/index"
            }) 
            console.log(1)
          }
        }
      })
    }else{
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
    }
    
  },
  onShow: function (options) {
    var that = this;
    if (app.globalData.userId == null || app.globalData.userId == "") {
      console.log(app.globalData.userId)
      wx.showModal({
        title: '注意',
        content: '物业端小程序仅供物业工作人员使用，使用前请确认你的手机号已在后台管理系统中录入？',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../userlogin/userlogin'
            })
            console.log(1)
          } else if (res.cancel) {
            wx.switchTab({
              url: "/pages/index/index"
            })
            console.log(1)
          }
        }
      })
    } else {
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
    }

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
            url: 'http://localhost:8001/sc/staff/user/login',
            method: 'POST',
            data: {
              code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
            },
            success: function (e) {
              console.log("1:" + e.data.code)
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

  },
  onTabItemTap(item) {
    var that = this;
    if (app.globalData.userId == null || app.globalData.userId == "") {
      console.log(app.globalData.userId)
      wx.showModal({
        title: '注意',
        content: '物业端小程序仅供物业工作人员使用，使用前请确认你的手机号已在后台管理系统中录入？',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../userlogin/userlogin'
            })
            console.log(1)
          } else if (res.cancel) {
            wx.switchTab({
              url: "/pages/index/index"
            })
            console.log(1)
          }
        }
      })
    } else {
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
    }
  },
  
})