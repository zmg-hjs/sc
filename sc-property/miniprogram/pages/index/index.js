//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    menuitems: [
      { text: '我的消息发布', url: '../userinfo/userinfo', icon: '../../images/icon-index.png', tips: '' },
      { text: '联系我们', url: '../userinfo/userinfo', icon: '../../images/icon-index.png', tips: '' }
    ]
  },

  onLoad: function() {
   
  },

  

})
