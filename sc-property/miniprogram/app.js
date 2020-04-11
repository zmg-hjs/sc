//app.js
App({

  globalData:{
    userinfo:{},
    userId:"",
    //登录获取的code
    code:'',
    //域名
    domainName:'http://localhost:8001'
  },

  onLaunch: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.globalData.domainName + '/sc/property/user/automaticLogin',
          data: {
            code: res.code
          },
          method: 'POST',
          success: function (res) {
            if (res.data.code==1){
              
              that.globalData.userId = res.data.data.id;
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
})
