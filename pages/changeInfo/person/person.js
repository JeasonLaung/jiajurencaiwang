// pages/changeInfo/person/person.js
const app = getApp()
const util = require('../../../utils/util')
const tool = require('../../../utils/tool')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    yearOld:'',
    degreeArr:['大专','本科','硕士','博士','其他'],
    experienceArr:['应届毕业生','一年以内','1-3年','3-5年','5-10年'],
    jobTypeArr:app.globalData.jobTypeArr? app.globalData.jobTypeArr:['设计师助理','设计师','驻点设计师','营销设计师','设计导购','家居顾问','储备店长'],
    provinceCityArr:[],
    provinceIdArr:[],
    salaryArr:['0K-3K','3K-6K','6K-10K','10K-15K','15K-20K'],
    labelArr:[],
    myEducationArr:[],
    myExperienceArr:[],

    // https://m.v2.51renc.com/api/v1/users/4450/base PUT
    formBase:{
      birth_year:'',
      nirth_month:'',
      degree:'',
      experience:'',
      id:'',
      logo:'',
      major:'',
      name:''
    },
    // https://m.v2.51renc.com/api/v1/users/4450/expect PUT
    formExpect:{
      career:'',
      city:'',
      id:'',
      salary:''
    }
  },

  refresh:function () {
    var that = this
      that.data.user_id = util.getCookie('userInfo')['id']
      util.loadUser({id:this.data.user_id},function (res) {
        let experience = res.data.experience,
        myExperienceArr = res.data.experience!=false ? function() {
          experience.forEach(v=>{
            v['description'] = v['description'].replace(/\r|\n/g,"<br/>")
          })
          return experience
        }() : false
      that.setData({
        _school_name:res.data._school_name,
        formExpect:{...res.data.expect,id:res.data.id},
        formBase:{...res.data.base,id:res.data.id},
        yearOld:new Date().getFullYear() - Number(res.data.base.birth_year),
        myEducationArr:res.data.education?res.data.education:false,
        myExperienceArr:myExperienceArr
      })
    })

    util.loadMyPersonLabel(false,function (res) {
      var labelIdArr = []
      res.data.forEach(v=>{
        labelIdArr.push(v['id'])
      })
      that.setData({
        labelArr:res.data,
        labelIdArr:labelIdArr
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.refresh()
    
    util.loadProvince({hideloading:true},function (res) {
      var provinceArr = []
      var provinceIdArr = []
      var province_tell_me = {}
      res.data.forEach(function (v) {
        provinceArr.push(v.short_name)
        provinceIdArr.push(v.id)
      })

      var cityArr = []
      util.loadCity({province_id:res.data[0]['id']},function (res) {
        res.data.forEach(function (v) {
          cityArr.push(v.short_name)
        })

        var provinceCityArr = [provinceArr,cityArr]
        that.setData({
          provinceCityArr:JSON.parse(JSON.stringify(provinceCityArr)),
          provinceIdArr:provinceIdArr
        })
      })
    })

  },
  readyChangeName:function () {
    this.selectComponent("#prompt").prompt({
      title:"修改姓名",
      placeholder:"请输入姓名",
      maxLength:10
    })
  },
  changeName:function (e) {
    if (e.detail == false) {
      this.selectComponent("#toast")._timer('名字不能为空哦！')
      return false
    }
    this.setData({
      'formBase.name':e.detail
    })
    this.putBase()
  },
  changeFace:function () {
    var that = this
    util.uploadFace().then(function(res) {
      res = JSON.parse(res.data)
      //上传成功
      if (res.status === 0) {
        that.data.formBase.logo = res.data.filename
        util.updateBase(that.data.formBase,function (res) {
          util.loadUser({id:that.data.user_id},function (res) {
                      that.setData({
              formBase:{...res.data.base,id:that.data.user_id}
            })
          })
        })
      }
    }).catch(function () {
      that.selectComponent("#toast")._timer('上传图片失败')
    })
  },


  // put 基础信息
  putBase:function () {
    var that = this 
    let pages = getCurrentPages(),
    firstPage = pages[0]

    util.updateBase(that.data.formBase,function (res) {
      util.loadUser({id:that.data.user_id},function (res) {
        that.setData({
          formBase:{...res.data.base,id:that.data.user_id}
        })
        firstPage.meOnLoad()
      })
    })
  },
  bindDateChange:function (e) {
    // 直接request
    var birthYear = e.detail.value.split('-')[0]
    var nirth_month = e.detail.value.split('-')[1]
    this.setData({
      yearOld: new Date().getFullYear() - parseInt(birthYear),
      'formBase.birth_year': birthYear,
      'formBase.nirth_month':nirth_month
    })

    this.putBase()
  },
  bindDegreeChange:function (e){
    // e.detail.value
    this.setData({
      'formBase.degree': this.data.degreeArr[e.detail.value]
    })
     this.putBase()
  },
  bindExperienceChange:function (e){
    // e.detail.value
    this.setData({
      'formBase.experience': e.detail.value
    })
     this.putBase()
  },


  // put 期待工作
  putExpect:function () {
    var that = this 
    util.updateExpect(that.data.formExpect,function (res) {

      util.loadUser({id:that.data.user_id},function (res) {
        that.setData({
          formExpect:{...res.data.expect,id:that.data.user_id}
        })
      })
    })
  },

  bindJobTypeChange:function (e) {
    this.setData({
      'formExpect.career': this.data.jobTypeArr[e.detail.value]
    })

    this.putExpect()
  },
  bindCityChange:function (e) {
    // console.log(e.detail.value)
    var that = this
    this.setData({
      'formExpect.city': that.data.provinceCityArr[1][e.detail.value[1]]
    })
    this.putExpect()
  },
  bindProvinceChange:function (e) {
    var that = this 
    //改变省份时候进行
    if (e.detail.column === 0) {
      var province_id = this.data.provinceIdArr[e.detail.value]
      util.loadCity({hideloading:true,province_id:province_id},function (res) {
        var cityArr = []
        res.data.forEach(function (v) {
          cityArr.push(v.short_name)
        })
        that.setData({
          'provinceCityArr[1]':cityArr
        })
      })
    }
  },
  bindSalaryChange:function (e) {
    // console.log(e.detail.value)
    var that = this
    this.setData({
      'formExpect.salary': that.data.salaryArr[e.detail.value].toLowerCase()
    })
    this.putExpect()
  },




  /**
   * 跳转编辑
   *
   */
  editLabel:function () {
    var that = this
    wx.navigateTo({
    url:'../editLabel/editLabel?type=person&label='+that.data.labelIdArr.join(',')
    })
  },
  //有id传入时为编辑，无id传入时为添加
  editEducation:function (e) {
    wx.navigateTo({
      url:'../editEducation/editEducation?'+tool.jsonToUrl(e.currentTarget.dataset.datajson),
    })
  },
  editExperience:function (e) {
    console.log(e);
    wx.navigateTo({
      url:'../editExperience/editExperience?'+tool.jsonToUrl(e.currentTarget.dataset.datajson),
    })
  },

  //有id传入时为编辑，无id传入时为添加
  addEducation:function () {
    wx.navigateTo({
    url:'../editEducation/editEducation'
    })
  },
  addExperience:function () {
    wx.navigateTo({
      url:'../editExperience/editExperience'
    })
  }

})