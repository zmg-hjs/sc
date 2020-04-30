// pages/shop/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    listName:'',
    list:[
      {
      id:'1',
      title:'标题一',
      content:'由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588243789630&di=b20cf5fd50cc7b9c8816ed9b252b2680&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F408%2Fw1728h1080%2F20181229%2F_4Kw-hqwsysz1509145.jpg'
    },
    {
      id:'2',
      title:'标题一',
      content:'由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588243789630&di=b20cf5fd50cc7b9c8816ed9b252b2680&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F408%2Fw1728h1080%2F20181229%2F_4Kw-hqwsysz1509145.jpg'
    },
    {
      id:'3',
      title:'标题一',
      content:'由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588243789630&di=b20cf5fd50cc7b9c8816ed9b252b2680&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F408%2Fw1728h1080%2F20181229%2F_4Kw-hqwsysz1509145.jpg'
    },
    {
      id:'4',
      title:'标题一',
      content:'由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588243789630&di=b20cf5fd50cc7b9c8816ed9b252b2680&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F408%2Fw1728h1080%2F20181229%2F_4Kw-hqwsysz1509145.jpg'
    },
    {
      id:'5',
      title:'标题一',
      content:'由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588243789630&di=b20cf5fd50cc7b9c8816ed9b252b2680&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F408%2Fw1728h1080%2F20181229%2F_4Kw-hqwsysz1509145.jpg'
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(options.status=='publish'){
      this.setData({
        status:options.status,
        listName:'我的发布商品列表'
      })
      return
    }
    if(options.status=='sale'){
      this.setData({
        status:options.status,
        listName:'我的售出商品列表'
      })
      return
    }
    if(options.status=='buy'){
      this.setData({
        status:options.status,
        listName:'我的购买商品列表'
      })
      return
    }

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