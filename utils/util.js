//login为独立模块，不引入
const initData = require('initData.js')
const load = require('load.js')
const cookie = require('cookie.js')
const login = require('login.js')
const update = require('update.js')
const upload = require('upload.js')

const host = 'https://m.v2.51renc.com'

const formatTime = (date,s,d) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  s = s ? s : '/'
  return d ? [year, month, day].map(formatNumber).join(s) : [year, month, day].map(formatNumber).join(s) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//坑爹情况三，距离今天是第几天(wxs简直不是一个JS，啥都不兼容)
const dayAgo = date => {
  var s1 = new Date(date)// 发布日期
  var s2 = new Date()// 当前日期
  var time = s2.getTime() - s1.getTime()
  var days = parseInt(time / (1000 * 60 * 60 * 24))
  if (days / 365 >= 1) {
    return parseInt(days / 365) + '年前'
  } else if (days / 30 >= 1) {
    return parseInt(days / 30) + '月前'
  } else {
    return parseInt(days) + '日前'
  }
}

//坑爹情况二，深拷贝
const deepCopy = obj =>{
  return JSON.parse(JSON.stringify(obj))
}
//unicode码转utf-8
String.prototype.toUtf8 = function () {
  var str = this.replace(/\\/g, "%");
  str = this.replace(/\\\//g, "%$");
  //转换中文
  str = unescape(str);
  //将其他受影响的转换回原来
  str = str.replace(/%/g, "\\");
  // str = str.replace(/%\$/g, "\\");
  //对网址的链接进行处理
  str = str.replace(/\\/g, "");
  return str;
}





module.exports = {
  host,
  /*初始数据*/
  ...initData,


  /*处理函数 */
  formatTime,
  dayAgo, 
  //工具函数
  /*深拷贝 */
  deepCopy,


  //关于get的操作
  ...load,

  //session设置
  ...cookie,

  //login设置
  ...login,

  ...update,

  ...upload
}
