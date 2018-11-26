//load加载函数分装
const tool = require('./tool.js')
const cookie = require('./cookie.js')

const update = (url, params, callback, method = 'PUT', header = { 'Content-Type': 'application/json, text/plain, */*' }) => {
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
        callback ? callback(res.data) : false
        if (!params['hideloading']) {
          wx.hideLoading()
        }
      }, timer)

    },
    fail() {
      wx.showToast({
        title: '加载失败'
      })
    }
  })
}
//https://m.v2.51renc.com/api/v1/users/4450?detail=1
const loadUser = (params,callback) =>{
  // console.log(params['id']);
  let url = 'https://m.v2.51renc.com/api/v1/users/'+params['id']+'?detail=1'
  delete params['id']
  update(url,params,callback,'GET')
}
//https://m.v2.51renc.com/api/v1/users/4450?detail=1
const loadMyPersonLabel = (params,callback) =>{
  // console.log(params['id']);
  let url = 'https://m.v2.51renc.com/api/v2/company/login_user_get_labels'
  update(url,params,callback,'GET')
}
const loadPersonLabel = (params,callback) =>{
  // console.log(params['id']);
  let url = 'https://m.v2.51renc.com/api/v2/company/get_label?label_type=1&level=2&parent_id=all'
  update(url,params,callback,'GET')
}

//跟新基本信息
const updateBase = (params,callback) => {
  // console.log(params['id']);
  let url = 'https://m.v2.51renc.com/api/v1/users/'+params['id']+'/base'
  update(url,params,callback)
}
//跟新基本信息
const updateExpect = (params,callback) => {
  // console.log(params['id']);
  let url = 'https://m.v2.51renc.com/api/v1/users/'+params['id']+'/expect'
  update(url,params,callback)
}
const updateExperience = (params,callback) => {
  let url = 'https://m.v2.51renc.com/api/v1/users/'+params['userid']+'/experience/'+params['id']
  update(url,params,callback)
}
const addExperience = (params,callback) => {
  let url = "https://m.v2.51renc.com/api/v1/users/"+params['id']+"/experience"
  update(url,params,callback,'POST')
}
const delExperience = (params,callback) => {
  let url = "https://m.v2.51renc.com/api/v1/users/"+params['userid']+"/experience/"+params['id']
  update(url,params,callback,'DELETE')
}
const updateEducation = (params,callback) => {
  let url = 'https://m.v2.51renc.com/api/v1/users/'+params['userid']+'/education/'+params['id']
  update(url,params,callback)
}
const addEducation = (params,callback) => {
  let url = "https://m.v2.51renc.com/api/v1/users/"+params['id']+"/education"
  delete params['id']
  update(url,params,callback,'POST')
}
// https://m.v2.51renc.com/api/v1/users/4450/education/57
const delEducation = (params,callback) => {
  let url = "https://m.v2.51renc.com/api/v1/users/"+params['userid']+"/education/"+params['id']
  update(url,false,callback,'DELETE')
}

const addTag = (params,callback) => {
  let url = 'https://m.v2.51renc.com/api/v2/company/post_label'
  update(url,params,callback,'POST')
}
const delTag = (params,callback) => {
  let url = 'https://m.v2.51renc.com/api/v2/company/delete_label'
  update(url,params,callback,'DELETE')

}
const setTags = (params,callback) => {
  // var tool
  let url = 'https://m.v2.51renc.com/api/v2/company/set_user_labels'
  update(url,params,callback,'POST')
}

const loadPersonProject = (params,callback) => {
  let url = 'https://m.v2.51renc.com/api/v2/company/login_user_get_kuworks'
  update(url,params,callback,'GET')
}
const addPersonProject = (params,callback) => {
  let url = 'https://m.v2.51renc.com/api/v2/company/add_ku_work'
  update(url,params,callback,'POST')
  // POST id,signedUrl,surface_pic,title,work_url
}
const delPersonProject = (params,callback) => {
  let url = 'https://m.v2.51renc.com/api/v2/company/delete_ku_work'
  update(url,params,callback,'POST')
  // POST ku_work_id
}
const updatePersonProject = (params,callback) => {
  delPersonProject({ku_work_id:params['id']},function () {
    addPersonProject(params,callback)
  })
  // POST id,signedUrl,surface_pic,title,work_url
}

const updatePersonPassword = function (params,callback) {
  let url = 'https://m.v2.51renc.com/api/v1/users/update_password'
  update(url,params,callback,"POST")
//   new_password: "jkl"
// password: "1"
}

module.exports= {
  updatePersonPassword,
  addPersonProject,
  delPersonProject,
  updatePersonProject,

  loadPersonProject,
  loadUser,
  loadMyPersonLabel,
  loadPersonLabel,
  updateBase,
  updateExpect,
  updateExperience,
  updateEducation,

  addEducation,
  addExperience,
  addTag,
  setTags,
  
  delExperience,
  delEducation,
  delTag
}