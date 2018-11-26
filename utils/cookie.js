
/**
 * 此util 关联app.globalData的session数据，所以要先在全局变量中写上静态的"session"
 * 
 */
//设置失效时间名称
const deadtime_name = 'deadtime'


//存cookie
const setCookie = (key,value,deadtime) =>{
  //设置cookie
  wx.setStorageSync(key, value)
  //此时此刻
  var now = Date.parse(new Date()) / 1000 //秒为单位
  //不设置死亡时间默认立刻消失
  var deadtime = deadtime ? now + parseInt(deadtime) : -1
  //消失时间对象
  var deadtimeStorage = wx.getStorageSync(deadtime_name)
  // console.log(typeof deadtimeStorage);
  //没有创建
  if (!deadtimeStorage){
    deadtimeStorage = {}

  }
  deadtimeStorage[key] = deadtime
  wx.setStorageSync(deadtime_name, deadtimeStorage)
}
//获取session
const getCookie = key =>{
  //此时此刻
  var now = Date.parse(new Date()) / 1000 //秒为单位
  //消失时间对象
  var deadtimeStorage = wx.getStorageSync(deadtime_name)
  //不过期或没有这个值输出，过期删除
  if (deadtimeStorage[key] > now || !wx.getStorageSync(key)){
    return wx.getStorageSync(key)
  }else{
    removeCookie(key)
    return ''
  }
}

const removeCookie = key =>{
  // console.log('死亡时间'+wx.getStorageSync(deadtime_name)[key]);
  // console.log('删除了内存'+key);
  //直接删除key
  wx.removeStorageSync(key)
  //消失时间对象
  var deadtimeStorage = wx.getStorageSync(deadtime_name)
  //删除其中时间
  delete deadtimeStorage[key]
  //重新赋值
  wx.setStorageSync(deadtime_name, deadtimeStorage)
}

const clearCookie = () =>{
  wx.clearStorageSync()
}

module.exports = {
  setCookie,
  getCookie,
  removeCookie,
  clearCookie
}


