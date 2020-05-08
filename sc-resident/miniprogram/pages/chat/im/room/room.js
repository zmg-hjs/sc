const app = getApp()

Page({
  data: {
    avatarUrl: '',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    chatRoomEnvId: 'sc-qzcty',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: '',
    chatRoomGroupName:'',
    // functions for used in chatroom components
    onGetUserInfo: null,
    getOpenID: null,
    groupId1:''
  },

  onLoad: function(options) {
    var that=this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
     if(options.groupStatus==2){
        const db=wx.cloud.database({
          env:this.data.chatRoomEnvId
        })
        const _ = db.command
        db.collection('room').where(_.or([
          _.or({
            people2:wx.getStorageSync('userInfo').username,
            people1:options.name
         
          }),
         _.or({
            people1:wx.getStorageSync('userInfo').username,
            people2:options.name
          })
        ])).get().then(res => {
          console.log(res.data)
          if(res.data.length==0){
            console.log('这里是信件')
            db.collection('room').add({
              // data 字段表示需新增的 JSON 数据
              data: {
               _id:wx.getStorageSync('userInfo').openId+options.openId,
               people1:wx.getStorageSync('userInfo').username,
               people2:options.name,
               groupId:wx.getStorageSync('userInfo').openId+options.openId,
               sendTime: new Date(),
               sendTimeTS: Date.now(),
               avatarUrl:options.avatarUrl,
               finalMessage:'',
               finalOpenId:''
              }
            })
            .then(ress => {
              console.log(res)
              that.setData({
                chatRoomGroupName:options.name,
                chatRoomGroupId:wx.getStorageSync('userInfo').openId+options.openId,

              })
            })
            .catch(console.error)
          }
          else{
            that.setData({
              chatRoomGroupId:res.data[0].groupId,
              chatRoomGroupName:options.name,
            })
          }
        })
    }
    if(options.groupStatus==1){
      this.setData({
        chatRoomGroupId:options.groupId,
        chatRoomGroupName:options.name,
      })
      console.log(this.data.chatRoomGroupId)
    }
    this.setData({
      onGetUserInfo: this.onGetUserInfo,
      getOpenID: this.getOpenID,
     // chatRoomGroupName:options.groupName,
     // chatRoomGroupId:options.groupId
    })

    wx.getSystemInfo({
      success: res => {
        console.log('system info', res)
        if (res.safeArea) {
          const { top, bottom } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })
  },

  getOpenID: async function() {
    return  wx.getStorageSync('userInfo').openId
  },

  onGetUserInfo: function(e) {
    // if (!this.logged && e.detail.userInfo) {
    //   this.setData({
    //     logged: true,
    //     avatarUrl: e.detail.userInfo.avatarUrl,
    //     userInfo: e.detail.userInfo
    //   })
    // }
          this.setData({
        logged: true,
        avatarUrl: wx.getStorageSync('userInfo').headPictureUrl,
        userInfo: wx.getStorageSync('userInfo')
      })
      console.log(this.data.userInfo)
  },

  onShareAppMessage() {
    return {
      title: '即时通信 Demo',
      path: '/pages/im/room/room',
    }
  },
})
