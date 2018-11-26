// pages/changeInfo/editExperience/editExperience.js
const app = getApp()
const util = require('../../../utils/util')
const check = require('../../../utils/check') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:util.formatTime(new Date(),'-',1),
    canIsubmit:false,
    form:{
      company:'',
      description:'',
      from:'',
      // id:'',//只有编辑的时候有
      title:'',
      to:'',
      userid:''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    if (JSON.stringify(options)!='{}') {
      options['description'] = options['description'].replace(/<br\/>/g,'\r')
      this.setData({
        form : options
      })
      wx.setNavigationBarTitle({
        title: '编辑工作经历'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '新增工作经历'
      })
    }
    
    var that = this
    // console.log(this.data.form.userid);
    util.getUserId(function (id) {
      that.setData({
        'form.userid':id
      })
    })
    this.refreshSubmit()
  },

  refreshSubmit:function () {
    this.setData({
      canIsubmit:check.check(this.data.form)
    })
  },
  companyInput:function (e) {
    this.setData({
      'form.company' : e.detail.value
    })
    this.refreshSubmit()
  },
  positionInput:function (e) {
    this.setData({
      'form.title' : e.detail.value
    })
    this.refreshSubmit()
  },
  fromChange:function (e) {
    this.setData({
      'form.from' : e.detail.value
    })
    this.refreshSubmit()
  },
  toChange:function (e) {
    this.setData({
      'form.to' : e.detail.value
    })
    this.refreshSubmit()
  },
  descriptionInput:function (e) {
    this.setData({
      'form.description' : e.detail.value
    })
    this.refreshSubmit()
  },

  toBack:function () {
    var that = this
    wx.hideLoading()
    var pages = getCurrentPages()
    var prev = pages[pages.length - 2]
    prev.refresh()
    wx.navigateBack({
      delta:1
    })
  },

  submit:function () {
    var that = this
    if (!that.data.canIsubmit) {return false}
    wx.showLoading({
      title:'请稍候...'
    })
    if (that.data.form['id']) {
      util.updateExperience(that.data.form,function () {
          that.toBack()
      })
    }else{
      that.data.form['id'] = that.data.form['userid']
      // delete that.data.form['userid']
      util.addExperience(that.data.form,function () {
          that.toBack()
      })
    }
  },
  delete:function () {
    var that = this 
    wx.showLoading({
      title:'请稍候...'
    })
    util.delExperience({userid:this.data.form.userid,id:this.data.form.id},function () {
      that.toBack()
    })
  }


})