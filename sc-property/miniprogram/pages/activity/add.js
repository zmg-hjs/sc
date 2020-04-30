const app = getApp()
const activityUrl=require("../../config").activityUrl
Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 100,
    keyboardHeight: 0,
    isIOS: false,
    value6:'',
    content:'',
    info:''
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad(options) {
    this.setData({
      info:JSON.parse(options.inf)
    })
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    console.log(this.data.isIOS)
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      console.log(res.height)
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      that.loadData();
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clickLogText(e) {
    that.editorCtx.getContents({
      success: function (res) {
        console.log(res.html)
        wx.setStorageSync("content", res.html); // 缓存本地
        console.log(res.html)
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        // console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count:1,
      success:function(res){
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'file',
          url: app.globalData.domainName+'/sc/staff/upload/images',
          success:function(ress){
            var info=JSON.parse(ress.data)
            that.editorCtx.insertImage({
              src: info.data,
              data: {
                id: 'abcd',
                role: 'god'
              },
              width: '100%',
              success: function () {
                console.log('insert image success')
              }
            })
          }
        })

        }
      })
    },
  formSubmit:function(e){
      var that = this;
      wx.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context;
        that.loadData();
      }).exec()
      that.editorCtx.getContents({
        success: function (res) {
          that.setData({
            content:res.html.replace(/wx:nodeid="\d+"/g, '')
          })
        },
        fail:function(res){

        }
      });
      var json = {
        title: e.detail.value.title,
        content: that.data.content,
        committeesNumber:e.detail.value.committeesNumber,
        hostParty:that.data.info.name,
        activityStartTimeStr:that.data.info.actStaD+" "+that.data.info.actStaT+":00",
        activityEndTimeStr:that.data.info.actEndD+" "+that.data.info.actEndT+":00",
        votingStartTimeStr:that.data.info.votStaD+" "+that.data.info.votStaT+":00",
        votingEndTimeStr:that.data.info.votEndD+" "+that.data.info.votEndT+":00"

        
      }
      wx.request({
        url: app.globalData.domainName + '/sc/property/activity/vote/add1',
        method: 'POST',
        data: json,
        success: function (res) {
          wx.createSelectorQuery().select('#editor').context(function (res) {
            that.editorCtx = res.context;
            that.loadData();
          }).exec()
          that.editorCtx.getContents({
            success: function (res) {
              that.setData({
                content: res.html.replace(/wx:nodeid="\d+"/g, '')
              })
            },
            fail: function (res) {

            }
          });
          json.content=that.data.content;
          wx.request({
            url: app.globalData.domainName + '/sc/property/activity/vote/add',
            method: 'POST',
            data: json,
            success: function (res) {
              wx.navigateTo({
                url: "/pages/activity/information"
              }) 
            }

          })
          
        }

      })
    }
    
  })