const cookie = require('cookie')
const tool = require('tool')
const app = getApp()
//load加载函数分装
const load = (url, params, callback, method = 'GET', header = { 'Content-Type': 'application/json;charset=UTF-8' }) => {
  if (!params['hideloading']) {
    wx.showLoading({
      title: '请稍候...',
    })
    var timer = 0
  }else{
    delete params['hideloading']
    var timer = 0
  }

  var header = {
    ...header,
    'Cookie': cookie.getCookie('session') ? cookie.getCookie('session') : ''
  }
  wx.request({
    url: url,
    method: method,
    data: params,
    header:header,
    success: function (res) {
      setTimeout(() => {
        callback(res.data)
        if (!params['hideloading']) {
          wx.hideLoading()
        }
        
      }, timer)

    },
    fail() {
      if (!params['hideloading']) {
          wx.hideLoading()
      }
      wx.showToast({
        title: '加载失败'
      })
    }
  })
}


//API
//当前用户
const loadCurrent = (params, callback) => {
  var url = 'https://m.v2.51renc.com/api/v1/users/current'
  //截取res
  var res
  load(url, params, function (res){
    //如果是登录成功的
    if (res.status === 0 ){
      //公司个人都是这个login的所以要注意在这里就要将其类型分开
      getApp().globalData.LOGINED = true
      //设置首页的tabBar
      
      //打开data查看数据可以清晰看到是个人还是公司
      // if (res.data.data.type == "user"){
      //   app.globalData.USER = "person"
      // }else{
      //   app.globalData.USER = "person"
      // }

    }
    callback ? callback(res) : false
  })
  

  // GET company_id
}
//不成功便成仁
const getUserId = (callback,callback2) => {
  var url = 'https://m.v2.51renc.com/api/v1/users/current'
  var res
  load(url, false, function (res){
    if (res.status === 0 ){
      //实时对话
      getApp().connectSocket()
      //已经登录的
      callback(res.data.id,res.data)


    }else{
      wx.reLaunch({
        url:'/pages/index/index'
      })
    }
  })
}

//message
const loadPersonReply=function (params, callback) {
  let url = "https://m.v2.51renc.com/api/v2/company/get_replys?type=1"
  load(url,params,callback)
}
const addPersonReply = function (params, callback) {
  let url = "https://m.v2.51renc.com/api/v2/company/add_reply"
  load(url,params,callback,'POST')
  // content: "456789"
  // type: 1
}
const loadDelivery = (params, callback) => {
  let url = 'https://m.v2.51renc.com/api/v2/company/user_delivery_job_records'
  load(url,params, callback)
}
const loadVisitor = function (params, callback) {
  let url = 'https://m.v2.51renc.com/api/v2/company/user_get_all_visitor'
  load(url,params, callback)
}
const loadOffer = function (params, callback) {
  let url = "https://m.v2.51renc.com/api/v2/company/get_user_invite_info"
  load(url,params, callback,"POST")
}


//我的
const loadMyAccount = (params, callback) => {
  let url = "https://m.v2.51renc.com/api/v2/company/student_get_account_info"
  load(url,false, callback)
}









//公司

//公司关联职位
const loadCompanyWithJob = (params, callback) => {
  var url = 'https://m.v2.51renc.com/api/v2/company/job_with_company'
  load(url, params, callback)
  // GET company_id
}

//公司图片
const loadCompanyImg = (params, callback) =>{
  var url = "https://m.v2.51renc.com/api/v2/company/get_company_pic_tourist"
  // GET _company_id
  load(url, params, callback)
}
//公司详情
const loadCompanyDetail = (params, callback) => {
  var id = params['id'] ? params['id'] : console.error('请在params中输入公司的id')
  var url = 'https://m.v2.51renc.com/api/v1/company/' + id + '?detail=1'
  load(url, {}, callback)
  // GET /id
}
//获取关键词公司
const searchCompany = (params, callback) => {
  var url = 'https://m.v2.51renc.com/api/v1/search/company'
  load(url, params, callback)
  // GET keyword
}
//获取所有公司
const loadCompany = (params, callback) => {
  var url = 'https://m.v2.51renc.com/api/v2/company/get_companys'
  load(url, params, callback)
  // GET 只改变page获取
}

//HR详情
const loadHRDetail = (params, callback) => {
  var url = 'https://m.v2.51renc.com/api/v2/company/get_hrs'
  load(url, params, callback)
  // GET _company_id
}

//收藏职位
const collectJob = (params, callback) => {
  var url = 'https://m.v2.51renc.com/api/v2/company/user_collect_job'
  load(url, params, callback,'POST')
  // GET job_id
}
// 职位详情

const loadPositionDetail = (params, callback) => {
  var url = 'https://m.v2.51renc.com/api/v2/company/job_detail'
  load(url, params, callback)
  // GET id
}

// 职位

const loadPosition = (params, callback) => {
  // params预处理
  var queryUrl = '';
  //清除空数组url
  queryUrl = tool.parseUrlParams(params, true)
  var url = 'https://m.v2.51renc.com/api/v2/company/job_search'
  url = url + queryUrl
  load(url, {}, callback)

  //GET globalData.position
}



//城市
//省
const loadProvince = (params, callback) => {
  load('https://m.v2.51renc.com/api/v2/company/get_all_province', {...params,hideloading:true}, callback)
  // GET
}

//市
const loadCity = (params, callback) => {
  load('https://m.v2.51renc.com/api/v2/company/get_citys_by_province', {...params,hideloading:true}, callback)
  // GET ?province_id=110000
}

//岗位类型
const loadJobType = (params, callback) => {
  load('https://m.v2.51renc.com/api/v2/company/get_jobs', params, callback)
  // GET 
}


//我的收藏
const loadMyCollect = (params, callback) => {
  load('https://m.v2.51renc.com/api/v2/company/user_collect_job_records', params, callback)
  // GET 
}
//取消我的收藏
const cancelCollectJob = (params, callback) => {
  load('https://m.v2.51renc.com/api/v2/company/user_cancel_collect_job', params, callback,"POST")
  // POST id(jobid)
}


//投递简历
const deliveryJob = (params, callback) =>{
  let url = 'https://m.v2.51renc.com/api/v2/company/user_delivery_job'
  // company_id: 468
  // job_id: 826
  load(url, params, callback,"POST")
}

//及时聊天
const chatOpen = (params, callback)=>{
  let url="https://m.v2.51renc.com/api/v2/company/open_chat_window"
  //opt_id=474      工作id
  //type=personal   个人类型
  load(url, params, callback,"GET")

}

//加载全部学校
const loadAllSchool = (params, callback)=>{
  let url ="https://m.v2.51renc.com/api/v2/company/all_sort_school"
  load(url, params, callback,"GET")
}

//加载年
const loadSchoolYear = (params, callback) => {
  let url = 'https://m.v2.51renc.com/api/v3/school/get_all_year'
  load(url, params, callback,"GET")
  //GET school_id
}
//加载专业
const loadMajor = (params, callback) => {
  let url = 'https://m.v2.51renc.com/api/v3/school/get_all_major'
  load(url, params, callback,"GET")
  //GET school_id=128&year=2018
}

//获取验证码
const personRegisterCaptcha = (params, callback) =>{
  let url ="https://m.v2.51renc.com/api/v1/users/captcha"
  load(url, {...params,action:'register'}, callback,"POST")
// captcha: "123"
// invitation_code: ""
// password: "123"
// phone: "123a"
}

const personRegisterAction = (params, callback) =>{
  let url ="https://m.v2.51renc.com/api/v1/users/register"
  load(url, {...params,invitation_code:''}, callback,"POST")
// captcha: "123"
// invitation_code: ""
// password: "123"
// phone: "123a"
}

const personLogin = require('./login').personLogin
//注册成功
const Register = function (params, callback) {
  //params传入form
  let url1 = 'https://m.v2.51renc.com/api/v2/company/get_invite_reward',
  //登录操作{phone: "18680026210", password: "jkl", captcha: "3736", invitation_code: ""}
  url2 = 'https://m.v2.51renc.com/api/v1/users/login',
  //基本信息
  url3 = 'https://m.v2.51renc.com/api/v1/users/4450/base',
  //绑定学校
  url4 = 'https://m.v2.51renc.com/api/v3/school/user_binging_school',
  //期待工作
  url5 = 'https://m.v2.51renc.com/api/v1/users/4450/expect',
  //个人标签
  url6 = 'https://m.v2.51renc.com/api/v2/company/set_user_labels'
//{phone: "18680026210", password: "jkl", captcha: "3736", invitation_code: ""}
  let phone = params.phone.phone,
  password = params.phone.password,
  captcha = params.phone.captcha,
  invitation_code  = "",

  personProvince = params.college._province,
  personCity = params.college._city,

  major = params.college.major,
  _school_name = params.college._school_name,
  _school_id = params.college._school_id,
  _school_major_id = params.college._school_major_id,

  name = params.info.name,
  logo = params.info.logo,
  gender = params.info.gender,
  brief_name = params.info.name,

  career = params.position.career,
  city = params.position.city,
  salary = params.position.salary,

  label_ids = params.ability.ability
 

  wx.showLoading({
    title:'正在登录...'
  })
  load(url1,false,function (res) {

    //登录
    personLogin({phone,password,captcha,invitation_code},function (res) {
      if (res.status === 0){
        let id = res.data.data.id
        var setcookie = tool.toJson(res.header['Set-Cookie'],";")
        let session = 'KID=' + setcookie['KID']
        let time = setcookie['Max-Age']
        cookie.setCookie('session', session, time)
        getApp().globalData.userInfo = res.data.data
        cookie.setCookie('userInfo', res.data.data, time)
        // {"id":4450,"major":"艺术设计","name":"z","brief_name":"z","province":"湖北省","city":"直辖县级","logo":"/upload-files/c_logo_uploads/20181103/64170336ef6a80f11b02264b24dc3ab6.jpg"}   
        load(url3,{id,major,name,brief_name,province:personProvince,city:personCity,logo},function (res) {
          if (res.status === 0) {
            // {"_school_name":"江西陶瓷工艺美术职业技术学院","_school_id":"10","_school_major_id":24}
            load(url4,{major,_school_name,_school_id,_school_major_id},function (res) {
              if (res.status === 0) {
                // {"id":4450,"career":"设计师助理","salary":"3k-6k","city":"北京"}
                load(url5,{id,career,salary,city:positionCity},function (res) {
                  if (res.status === 0) {
                    load(url6,{label_ids},function (res) {
                      if (res.status === 0) {
                        wx.hideloading()
                        wx.showToast({
                          title:'准备返回首页'
                        })
                        wx.reLaunch({
                          url:'/pages/index/index'
                        })
                      }
                    },'POST')
                  }
                },'PUT')
              }
            },"POST")
          }
        },'PUT')
      }
    })
    
  },'GET')

  // load(url,params.info)

}
const recordSeeCompany = function () {
  
}

// const openChat = function (params, callback) {
//   let url = 'https://m.v2.51renc.com/api/v2/company/open_chat_window'
//   // ?type=personal&opt_id=474
//   load(url,params,callback,'GET')
// }

// const postMyPersonTag = ()=>{
//   let url = "https://m.v2.51renc.com/api/v2/company/post_label"
// }

const checkCaptcha  = function (params, callback) {
  let url = "https://m.v2.51renc.com/api/v1/users/verify_captcha"
//   captcha: "8362"
// phone: "18680026210"
// {phone: "18680026210", captcha: "4975"}
  load(url,params,function (res) {
    if (res.status === 0) {
      //验证码正确
      callback(res,true)
    }else{
      callback(res,false)
    }
  },"POST")
}
const resetPassword = function (params, callback) {
  let url = 'https://m.v2.51renc.com/api/v1/users/reset_password'
  load(url,params,callback,"POST")
    // phone: "18680026210", password: "jkl"
}

module.exports = {
  Register,
  //聊天
  addPersonReply,
  loadPersonReply,


  //验证码
  personRegisterCaptcha,
  personRegisterAction,
  checkCaptcha,
  resetPassword,



  //注册加载
  loadAllSchool,
  loadMajor,
  loadSchoolYear,

  //我的
  loadMyAccount,




  chatOpen,
  //获取城市
  loadProvince,
  loadCity,

  //获取岗位及其信息
  loadPosition,
  loadPositionDetail,
  collectJob,
  cancelCollectJob,
  loadMyCollect,
  deliveryJob,

  //获取公司及其相关详情
  loadCompany,
  searchCompany,
  loadCompanyDetail,
  loadCompanyWithJob,
  loadCompanyImg,


  //获取岗位类型
  loadJobType,


  //获取HR
  loadHRDetail,
  
  //获取当前用户
  loadCurrent,



  loadVisitor,
  loadDelivery,
  loadOffer,


  getUserId
}