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

  onLoad: function(e) {
    var that =this;
    wx.request({
      url: app.globalData.domainName + '/sc/property/news/resident_news_index',
      method: 'POST',
      data: {
        page: 1,
        limit: 50
      },
      success: function (res) {
        that.setData({
          list: res.data.data
        })
        if(that.data.list.length>0){
          for (var i = 0; i < that.data.list.length;i++){
            that.data.list.createDateStr = that.data.list.createDateStr.substring(0,10)
          }
        }
      }

    })
  },

  

})
