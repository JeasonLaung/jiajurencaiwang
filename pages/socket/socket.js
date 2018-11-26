// pages/socket/socket.js
String.prototype.toUtf8 = function () {
  var str = this.replace(/\\/g, "%");
  //转换中文
  str = unescape(str);
  //将其他受影响的转换回原来
  str = str.replace(/%/g, "\\");
  //对网址的链接进行处理
  str = str.replace(/\\/g, "");
  return str;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  _bindinput:function(e){
    this.setData({
      msg:e.detail.value
    })
  },
  _sendmsg:function(){
    
    wx.sendSocketMessage({
      data: this.data.msg
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.connectSocket({
    //   url: 'ws://jeasonl.xyz:8080',
    //   success:function(){
    //     console.log(13)
    //   }
    // })
    // wx.onSocketMessage(function(res){
    //   console.log(res)
    // })
    const kid = wx.getStorageSync('session')
    // wx.connectSocket({ 
    //   url:'wss://m.v2.51renc.com/chatim',
    //   success:function (res) {
    //     console.log("链接成功...");
    //   }
    // })
    var that = this 
    that.connectSocket()
    wx.onSocketMessage(function(res){
      console.log(res.data.toUtf8())
    })
    wx.onSocketClose(function (res) {
      console.log("重启中...");
      that.connectSocket()
    })
    wx.onSocketOpen(function (res) {
      console.log('opened');
      console.log(res);
      that.sendMsg({
        cmd: "login",
        cookie_val: "PdOei/sJCF9RHDZrZ9j+TDk+ekbYPVl27v0APwA9e1xddqTE894X54EuNos5tPyw1y3KmCgZ7CJQniiVLOnf3g==",
        type: "personal"
      },function () {
        that.sendMsg({
          cmd: "getRencentUserlist"
        })
      })
    })
  },
  connectSocket:function () {
    wx.connectSocket({
      url:'wss://m.v2.51renc.com/chatim',
      header:{
        Cookie:'KID='+wx.getStorageSync('session'),
        'Sec-WebSocket-Key':'bOMopUam38kZmGbqFwri3Q==',
        'Sec-WebSocket-Extensions':"permessage-deflate; client_max_window_bits",
      },
      success:function (res) {
        console.log("链接成功...");
      }
    })
  },
  sendMsg:function (data,callback) {
    var _data = typeof data == 'object' ? JSON.stringify(data): data 
    wx.sendSocketMessage({
      data:_data,
      success:function () {
        callback ? callback(_data) : false
      }
      
    })
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