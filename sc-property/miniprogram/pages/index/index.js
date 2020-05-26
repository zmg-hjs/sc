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
    var that = this;
     let type=e.currentTarget.dataset.type
     var _url
     if(type=='mes'){
       _url="/pages/allNews/allNews"
     }
     if(type=='act'){
      //  if (wx.getStorageSync('userInfo').position =="administrator"){
      //    _url = '/pages/activity/index'
      //  }else{
      //    wx.showModal({
      //      title: '注意',
      //      content: '活动发布仅供管理员使用！',
      //    })
      //  }
       
       _url = '/pages/activity/index'
     }
     if(type=='repair'){
      //  if (wx.getStorageSync('userInfo').position == "repairman") {
      //    _url = '/pages/repair/repair'
      //  } else {
      //    wx.showModal({
      //      title: '注意',
      //      content: '活动发布仅供管理员使用！',
      //    })
      //  }
       _url='/pages/repair/repair'
     }
     if(type=='info'){
      //  if (wx.getStorageSync('userInfo').position == "repairman") {
      //    _url = '/pages/task/task'
      //  } else {
      //    wx.showModal({
      //      title: '注意',
      //      content: '活动发布仅供管理员使用！',
      //    })
      //  }
       _url='/pages/task/task'
     }
     wx.navigateTo({
       url: _url,
     })
  },
  onLoad: function(e) {
    
  },

  

})
