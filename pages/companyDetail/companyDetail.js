// pages/companyDetail/companyDetail.js
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyInfo:{},
    host:app.globalData.host,
    companyWithJob:[],
    dayAgoArr:[],
    imgArr:false,
    host:app.globalData.host
  },
  onLoad:function(options){
    // options.id
    //模拟获取的id
    // options.id ? options.id : options.id = 300
    var id = options.id
    var that = this
    util.loadCompanyImg({_company_id:id},function (res) {
      // console.log(res);
      if (res.status === 0) {
        //成功
        var imgArr = []
        res.data.activity ?　res.data.activity.forEach(v=>{
          imgArr.push(v.pic)
          // console.log(v.pic);
        }) : false
        res.data.environment ?　res.data.environment.forEach(v=>{
          imgArr.push(v.pic)
          // console.log(v.pic);
        }) : false
        if (imgArr != false) {
          that.setData({
            imgArr:imgArr
          })
        }
      }else{
        // console.log(res);
      }

    })


    util.loadCompanyDetail({ id: id }, function (res){

      that.setData({
        companyInfo:res.data
      })
      WxParse.wxParse('article', 'html', that.data.companyInfo.brief, that);
    })
    util.loadCompanyWithJob({ company_id:id},function(res){
      if(JSON.stringify(res.data) == "{}"){return false}      
      that.setData({
        companyWithJob:  res.data
      })
    })
  },
  positionGoLink:function(e){
    wx.navigateTo({
      url: '../positionDetail/positionDetail?id='+e.detail
    })
  }

})