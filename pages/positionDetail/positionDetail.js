// pages/positionDetail/positionDetail.js
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取职位的详细数据
    positionDetail: false,//{}
    //host 用来获取主域名
    host:'',
    //公司id 用来获取HR和公司详情
    _company_id:'',
    //HR详细信息
    // HRDetail:false,
    HRDetail:false,//{hr_position:'经理',hr_name:'是是是'}
    jobId:'',
    collect:false,
    has_delivery:false,
    userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // options.id ? options.id : options.id = 300
    var that = this
    that.setData({
      host:app.globalData.host,
      jobId:options.id
    })
    util.loadCurrent(false,function (res) {
      if (res.status === 0) {
        let userId = res.data.id
        that.setData({userId})
        //查看是否收藏了
        util.loadMyCollect({id : options.id},function (res) {
          res.count == 0 ? false : res.data.forEach(v=>{
            v.id == options.id ? that.setData({collect:true}) : false
          })
        })
      }
    })
    
    //获取职位详情
    util.loadPositionDetail({ id: options.id},function(res){
      that.setData({
        positionDetail:res.data,
        _company_id: res.data.company_id,
        has_delivery:res.data.has_delivery ? true : false
      })
      WxParse.wxParse('article', 'html', that.data.positionDetail.description, that);

      //获取HR
      util.loadHRDetail({ _company_id: that.data._company_id }, function (res) {
        if (res.data != false){
          that.setData({
            //HR默认就一个
            HRDetail: res.data[0]
          })
        }
      })
    })
  },
  companyDetail:function (e) {
    wx.navigateTo({
      url:'../companyDetail/companyDetail?id='+e.currentTarget.dataset.id
    })
  },
  collectJob:function () {
    var that = this
    if (!that.data.userId) {
      that.selectComponent("#toast")._timer('请先登录')
      return false
    }
    //还没收藏
    if (!that.data.collect) {
      util.collectJob({job_id:this.data.jobId},function (res) {
        if(res.status === 0){
          // 成功
          that.setData({
            collect:true
          })
        }
      })
    }else{
      //已经收藏就取消
      util.cancelCollectJob({id:this.data.jobId},function (res) {
        if(res.status === 0){
          // 成功
          that.setData({
            collect:false
          })
        }
      })
    }

  },
  deliveryJob:function () {
    var that = this
    if (!that.data.userId) {
      that.selectComponent("#toast")._timer('请先登录')
      return false
    }
    if (that.data.has_delivery) {return false}
    util.deliveryJob({company_id:that.data._company_id,job_id:that.data.jobId},function (res) {
      if (res.status === 0) {
        //成功
        that.setData({
          has_delivery:true
        })
      }
    })
  },
  openChat:function () {
    var that = this 
    if (!that.data.userId) {
      that.selectComponent("#toast")._timer('请先登录')
      return false
    }
    util.loadCurrent(false,function (res) {
      if(res.status === 0){
        util.chatOpen({type:'personal',opt_id:that.data._company_id},function (res) {
          if(res.status === 0){
            wx.navigateTo({
              url:"/pages/chat/chat?id="+that.data._company_id
            })
          }else{
            that.selectComponent("#toast")._timer('打开聊天平台有误')
          }
        })
      }else{
        that.selectComponent("#toast")._timer('请先登录')
      }
    })
  },
  goToLogin:function (e) {
    // console.log(e)
    wx.navigateTo({
      url:"/pages/login/login"
    })
  }

})