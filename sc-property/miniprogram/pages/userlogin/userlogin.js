const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    nickName: '请登录',
    phoneNumber:"请输入后台登记手机号",
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false,
    showModal: false,
    phoneNumberStatus: false
  },
  //事件处理函数
  onLoad: function () {
    
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
      app.globalData.userinfo = e.detail.userInfo;
    }
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
        console.log("用户的res:" + res);
        console.log("用户的code:" + res.code);
        if (res.code) {
          that.setData({
            showModal: true
          })
        }
      }
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

  getPhoneNumber: function (e) {
    var that = this;
    that.setData({
      phoneNumber: e.detail.value
    })
  },
  // 弹出层里面的弹窗
  ok:function(e) {    //授权手机号登录（获得授权后加密的串）
    var that = this;
    wx.login({
      success: res => {
        wx.getUserInfo({
          success: ress => {
            // 获取到用户的 code 之后：res.code
            console.log("用户的res:" + res);
            console.log("用户的code:" + res.code);
            if (res.code) {
              wx.request({
                url: 'http://localhost:8001/sc/property/user/register',
                method: 'POST',
                data: {
                  code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                  iv: ress.iv,
                  encryptedData: ress.encryptedData,
                  phoneNumber: that.data.phoneNumber
                },
                success: function (e) {
                  console.log("1:" + e.data.code)
                  if(e.data.code!=1){
                    that.setData({
                      phoneNumberStatus: true
                    }) 
                  }else{
                    that.setData({
                      showModal: false
                    })
                    app.globalData.userId = e.data.data.id;
                    wx.switchTab({
                      url: "/pages/index/index"
                    }) 
                  }
                  
                },
                fail: function (e) {
                  console.log("2:" + e.data.code)
                  that.setData({
                    showModal: false
                  })
                }
              })
            }
          }
          
        })
      }
        
    })
    
    
  },
})
