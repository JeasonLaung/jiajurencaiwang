const cookie = require('./cookie.js')
const tool = require('./tool.js')
const app = getApp()
//post加载函数分装
const postLogin = (url, params, callback, method = 'POST', header = { 'Content-Type': 'application/x-www-form-urlencoded'},tip = false) => {
  wx.showLoading('登录中...')
  wx.request({
    url: url,
    method:method,
    data:params,
    header:{
      ...header,
      "Cookie": cookie.getCookie('session') ? cookie.getCookie('session') :''
    },
    success: function (res) {
      setTimeout(()=>{
        // console.log(res);
        callback(res)
        wx.hideLoading()
      },200)
    }
  })
}

//测试函数，正式上线要关掉
const noData = function (res) {
  console.error("没有获取到数据");
  console.log(res)
}

const personLogin = (params,callback)=>{
  postLogin('https://m.v2.51renc.com/api/v1/users/login',params,function(res) {
    //如果已经登录的,存储登录session
    if (res.data.status === 0){
      var setcookie = tool.toJson(res.header['Set-Cookie'],";")
      // console.log(setcookie);
      let session = 'KID=' + setcookie['KID']
      let time = setcookie['Max-Age']
      // console.log('time is:'+time);
      cookie.setCookie('session', session, time)
      // console.log(app);
      getApp().globalData.userInfo = res.data.data
      cookie.setCookie('userInfo', res.data.data, time)
      callback('登录成功')
    }else{
      callback('账号或密码错误')
    }
  },'POST', {'Content-Type':'application/json;charset=UTF-8'})
}


module.exports = {
  personLogin
}