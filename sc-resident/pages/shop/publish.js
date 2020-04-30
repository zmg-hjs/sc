// pages/shop/publish.js
const shopUrl=require('../../config').shopUrl
const imageUrl=require('../../config').imageUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    files:[],
    goods:'',
    money:'',
    count:0,
    countries: ["衣服", "食品", "电器","美妆","家具","其他"],
    english:["clothes", "food", "electrical", "beauty", "furniture", "others"],
    name:'',
    countryIndex: 0,
    imageUrls:[],

  },
  bindCountryChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', this.data.countries[e.detail.value]);

    this.setData({
        countryIndex: e.detail.value,
        name:this.data.english[e.detail.value]
    })
},
   bindGoodChange:function(e){
    this.setData({
      goods: e.detail.value
    })

   },
   bindMonChange:function(e){
    this.setData({
      money: e.detail.value
    })

   },
  chooseImage: function (e) {
    if(this.data.count==3){
      wx.showModal({
        title: '提示',
        content: '只能上传三张图片！',
        showCancel: false,
        confirmText: "确定",
        success: function(res) {
        }
      })
      return
    }
 
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.data.count++;
          //   that.setData({
          //     files: that.data.files.concat(res.tempFilePaths)
          // });
            wx.uploadFile({
              filePath: res.tempFilePaths[0],
              name: 'file',
              url: imageUrl+'images',
              success:function(ress){
              //   that.setData({
              //     imageUrls: that.data.imageUrls.concat(ress.data.data)
              // }); 
              var info=JSON.parse(ress.data)
              that.setData({
                files: that.data.files.concat(info.data)
            });
              }
            })
        }
    })
},
previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  bindContentChange:function(e){
    this.setData({
      content:e.detail.value
   })
  },
  submit:function(){
   console.log(this.data)
   wx.request({
     url: shopUrl+'resident_commodity_add',
     method:'POST',
     data:{
      businessId:wx.getStorageSync('userInfo').id,
      businessActualName:wx.getStorageSync('userInfo').actualName,
      businessPhoneNumber:wx.getStorageSync('userInfo').phoneNumber,
     commodityName:this.data.goods,
     commodityIntroduce:this.data.content,
     commodityPictureUrl:this.data.files,
     commodityPrice:this.data.money,
     commodityClassification:this.data.name
     },
     success:function(res){
       console.log(res)
       wx.showModal({
        title: '提示',
        content: '发布成功，等待审核',
        showCancel: false,
        confirmText: "确定",
        success: function(res) {
          wx.navigateBack()
        }
      })
     }
   })
  },
  onLoad: function (options) {

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