// pages/changeInfo/editProject/editProject.js
const util = require("../../../utils/util")
const tool = require("../../../utils/tool")
const check = require("../../../utils/check")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      // id: ""//判断是否add的
      signedUrl: "",
      surface_pic: "",
      title: "",
      work_url:""
    },
    canIsubmit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    options = tool.decodeUrl(options)
    // options={
    //   "id":26,
    //   "_users_id":4450,
    //   "title":"456",
    //   "work_url":"https:\/\/www.kujiale.com\/huxing\/3FO4M6IQ2T6N?kpm=9V8.e83b2ccf533012ae.065eab4.1542423746587","surface_pic":"ku_surface\/1542423633.png","viewing_count":1,"modified":"2018-11-17 11:04:03","created":"2018-11-17 11:04:03","signedUrl":"http:\/\/user.qiniu.51renc.com\/ku_surface\/1542423633.png?e=1542428429&token=hsiAnXt1JXOFV4LWPTHexl-i-AnIg9WLRAr-anMA:zOu2sveBZztv7epkE-yrITAcNII="
    // }
    var that = this 
    util.getUserId(function (id) {
      userid:id
    })
    if (JSON.stringify(options)!='{}') {
      wx.setNavigationBarTitle({
        title:'编辑作品'
      })
      that.setData({
        form:options
      })
    }else{
      wx.setNavigationBarTitle({
        title:'新增作品'
      })
    }
    this.canIsubmit()
  },
  canIsubmit:function () {
    check.check(this.data.form) ? this.setData({canIsubmit:true}) : this.setData({canIsubmit:false})
  },
  edit:function () {
    var that = this 
    let pages = getCurrentPages()
    let prev = pages[pages.length-2]
    //检测作品链接是否合格，不合格return
    if (that.data.form.work_url.indexOf('https://www.kujiale.com/') == -1) {
      that.selectComponent("#toast")._timer('请输入带有https://www.kujiale.com/的完整网址')
      return false
    }
    if (that.data.form.title.length > 15) {
      that.selectComponent("#toast")._timer('标题不大于15字')
      return false
    }
    if (!that.data.canIsubmit) {return false}
    if (that.data.form.id) {
      util.updatePersonProject(that.data.form,function (res) {
        // res
        prev.refresh()
        wx.navigateBack({
          delta:1
        })

      })
    }else{
      util.addPersonProject(that.data.form,function (res) {
        // res
        if (res.status === 0) {
          prev.refresh()
          wx.navigateBack({
            delta:1
          })
        }else{

        }
      })
    }
    
  },
  upload:function () {
    var that = this 
    util.uploadProject().then(function (res) {
      // console.log(res);
      res = JSON.parse(res.data)
      if (res.status ===0) {
        //成功
        that.setData({
           'form.signedUrl':res.data.signedUrl,
           'form.surface_pic':res.data.fkey
        })
      }

      that.canIsubmit()
    })

  },
   urlChange:function (e) {
    // console.log(e);
     this.setData({
        'form.work_url':e.detail.value
     })
     this.canIsubmit()
   },
  titleChange:function (e) {
    // console.log(e);
     this.setData({
        'form.title':e.detail.value
     })
     this.canIsubmit()
   }
})