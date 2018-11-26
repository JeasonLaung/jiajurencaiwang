// pages/login/login.js
const util = require('../../utils/util.js')
const checkObj = require('../../utils/check.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    loginData:{
      phone: "", 
      password: "", 
      remember: true
    },
    canIsubmit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   type:options.type
    // })
    this.setData({
      type:"person"
    })

    // util.loadCurrent({},function(res){
    //   console.log(res)
    // })

  },
  registerPerson:function () {
    wx.navigateTo({
      url:'/pages/register/person/person'
    })
  },
  forgetPerson:function () {
    wx.navigateTo({
      url:'/pages/forget/forget'
    })
  },
  check:function () {
    if (checkObj.check(this.data.loginData)) {
        this.setData({
          canIsubmit:true
        })
    }else{
      this.setData({
          canIsubmit:false
        })
    }
  },
  refeshUsername:function(e) {
    this.data.loginData.phone = e.detail.value
      this.check()
      
  },
  refeshPassword:function(e) {
    this.data.loginData.password = e.detail.value
      this.check()
      
  },
  //提交post前先检查数据
  //个人登录
  loginPerson:function () {
    var that = this 
    //选定完毕返回到主页
    let pages = getCurrentPages()
    let prevPage = pages[0]
    

    //构造一个post数据
    if(that.data.canIsubmit){
      util.personLogin(that.data.loginData,function(res) {
        //登录失败 与成功
        // {msg: "phone or password error", status: 1}
        // console.log(res);
        // return 
        var title = res
        //弹出提示
        that.selectComponent("#toast")._timer(title)
        
        if (title == "登录成功") {
          util.loadCurrent(false, function (res){
            // console.log(res)
          })
          prevPage.positionOnLoad()
          prevPage.setData({
            tabBarActive:0
          })
          prevPage.checkLogin()
          // prevPage.setData({
          //   tabBarActive:0
          // })
          wx.navigateBack({
            delta:1
          })
        }
      })
    }else{
      var title = checkObj.throwNone(that.data.loginData)
      // console.log(title);
      var json = {password:'密码',phone:'用户名'}
      that.selectComponent("#toast")._timer('请输入'+json[title])
    }
    
  },
  //公司登录
  loginCompany:function () {
    // var that = this 
    // if(that.data.canIsubmit){
    //   loginObj.postCompanyLogin(that.data.loginData,function(res) {
    //     //登录失败 与成功
    //     var title = res.data!=false ? "登录成功" : ( res.msg == "phone or password error" ?  "密码或账号不正确" : "登录超时")
    //     //弹出提示
    //     that.selectComponent("#toast")._timer(title)
    //     if (title == "登录成功") {
    //       //"跳转首页"
    //     }
    //   })
    // }else{
    //   var title = checkObj.throwNone(that.data.loginData)
    //   var json = {password:'密码',phone:'用户名'}
    //   that.selectComponent("#toast")._timer('请输入'+json[title])
    // }
  },
  //改变登录方式
  changeType:function() {
    if(this.data.type == 'person'){
        this.setData({
          type:'company'
        })
    }else{
      this.setData({
          type:'person'
        })
    }

  }
})