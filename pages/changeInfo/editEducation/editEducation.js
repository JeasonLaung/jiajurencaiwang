// pages/changeInfo/editEducation/editEducation.js
const tool = require('../../../utils/tool')
const util = require('../../../utils/util')
const check = require('../../../utils/check')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIsubmit:false,
    form:{
      degree:'',
      from:'',
      to:'',
      major:'',
      school:'',
      userid:''
      // id:'',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //模拟options
    // options = tool.urlToJson('to=2006-01-01&id=59&from=1970-01-01&degree=asd&major=asd&school=asd')
    // console.log(options);
    if (JSON.stringify(options)!='{}') {
      that.setData({
        form : options
      })
      wx.setNavigationBarTitle({
        title: '编辑教育经验'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '新增教育经验'
      })
    }

    util.getUserId(function (res) {
      that.setData({
        'form.userid':res
      })

      that.canIsubmit()
    })
  },
  schoolInput:function (e) {
    this.setData({'form.school':e.detail.value})

    this.canIsubmit()
  },
  degreeInput:function (e) {
    this.setData({'form.degree':e.detail.value})

    this.canIsubmit()
  },
  majorInput:function (e) {
    this.setData({'form.major':e.detail.value})

    this.canIsubmit()
  },
  fromChange:function (e) {
    this.setData({'form.from':e.detail.value})

    this.canIsubmit()
  },
  toChange:function (e) {
    this.setData({'form.to':e.detail.value})

    this.canIsubmit()
  },
  canIsubmit:function (e) {
    return check.check(this.data.form) ? this.setData({canIsubmit:true}) : this.setData({canIsubmit:false})
  },
  submit:function () {
    if (!this.data.canIsubmit) {return false}
    var that = this
    wx.showLoading('请稍候...')
    let pages = getCurrentPages()
    let prev = pages[pages.length - 2]
    if (that.data.form.id) {
      //id存在就是修改
      util.updateEducation(that.data.form,function (res) {
        wx.hideLoading()
        prev.refresh()
        wx.navigateBack({
          delta:-1
        })
      })
    }else{
      util.addEducation({...that.data.form,id:that.data.form.userid},function (res) {
        wx.hideLoading()
        prev.refresh()
        wx.navigateBack({
          delta:-1
        })
      })
    }
  },
  delete:function () {
    wx.showLoading('请稍候...')
    let pages = getCurrentPages()
    let prev = pages[pages.length - 2]
    var id = this.data.form.id
    var userid = this.data.form.userid
    util.delEducation({id:id,userid:userid},function () {
        wx.hideLoading()
        prev.refresh()
        wx.navigateBack({
          delta:-1
        })
    })
  }
})