//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    list: [
      // { text: '我的消息发布', url: '../userinfo/userinfo', icon: '../../images/icon-index.png', tips: '' },
      // { text: '联系我们', url: '../userinfo/userinfo', icon: '../../images/icon-index.png', tips: '' }
    ]
  },
  service:function(e){
     let type=e.currentTarget.dataset.type
     var _url
     if(type=='mes'){
       _url="/pages/allNews/allNews"
     }
     if(type=='act'){
       _url='/pages/activity/index'
     }
     wx.navigateTo({
       url: _url,
     })
  },
  onLoad: function(e) {
    
  },

  

})
