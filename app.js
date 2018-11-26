const app = getApp()
const util = require('utils/util.js')
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var that = this

    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.onSocketMessage(function(res){
      // console.log(res.data.toUtf8())
      // if (true) {}
      // console.log(res)
    })
    wx.onSocketClose(function (res) {
      getApp().globalData.socket = false
      // console.log("重启中...");
      that.connectSocket()
    })
    wx.onSocketOpen(function (res) {
      // console.log('opened');
      // console.log(res);
      that.sendMsg({
        cmd: "login",
        cookie_val: wx.getStorageSync('session').split("=")[1],
        type: "personal"
      },function () {
        that.sendMsg({
          cmd: "getRencentUserlist"
        },function () {
          getApp().globalData.socket = true
        })
      })
    })
  },
  connectSocket:function () {
    var that = this
    if(getApp().globalData.socket){
       that.sendMsg({
        cmd: "login",
        cookie_val: wx.getStorageSync('session').split("=")[1],
        type: "personal"
      },function () {
        that.sendMsg({
          cmd: "getRencentUserlist"
        },function () {
          getApp().globalData.socket = true
        })
      })
      return false
    }
    wx.connectSocket({
      url:'wss://m.v2.51renc.com/chatim',
      header:{
        Cookie:wx.getStorageSync('session'),
        // 'Sec-WebSocket-Key':'bOMopUam38kZmGbqFwri3Q==',
        // 'Sec-WebSocket-Extensions':"permessage-deflate; client_max_window_bits",
      },
      success:function (res) {
        // console.log("链接成功...");
         
      }
    })
  },
  sendMsg:function (data,callback) {
    var _data = typeof data == 'object' ? JSON.stringify(data): data 
    // console.log('send');
    // console.log(data);
    wx.sendSocketMessage({
      data:_data,
      success:function () {
        callback ? callback(_data) : false
      }
      
    })
  },
  globalData: {
    socket:false,
    // userInfo: null,
    host:'https://m.v2.51renc.com',
    //API
    queryPosition:{
      city:'',
      start:1,
      pageRows:10,
      recommend:1,
      location:'',
      key_word:'',
      position:[],
      degree:[],
      experience:[],
      salary:[],
      labels:''
    },

    //公司获取
    queryCompany:{
      order_field:'xu',
      order:'asc',
      has_verified:true,
      //只改变page
      page:1,
      pagesize:12
    },


    //登录状态存储（暂时用getStorageSyc）
    //tabbarArr

    //是否登录
    LOGINED:false,
    //存储用户信息
    userInfo:{}


  }
})