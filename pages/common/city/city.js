const util = require('../../../utils/util.js')
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hot:[
      {
        name:"常用",
        arr:["佛山",""]
      },
      {
        name:"热门",
        arr: ["全国", "北京", "上海", "杭州", "深圳", "广州", "成都", "南京", "武汉", "天津", "西安","苏州"]
      }
    ],



    provinces:[],
    cities:[],
    hotShow:true,//热门显示
    provinceActiveId:0,
    activeCityName:'全国'
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.globalData.loadProvince(this.provinceFunction)
    util.loadProvince({},this.provinceFunction)

    //获取全局已经选定的城市
    var city = app.globalData.queryPosition['city']
    if(!city){
      this.setData({
        activeCityName: '全国'
      })
    }else{
      this.setData({
        activeCityName: city
      })
    }
    
    

  },
  //隐藏时把开的都关掉
  onHide:function(){
    
  },

  // 调用省函数
  provinceFunction:function(res){
    this.setData({
      provinces:res.data
    })
  },

  //调用城市函数
  cityFunction:function(e){
    // console.log(e)
    var that = this
    //防止重复点击
    // if (e.target.dataset.province_id == that.provinceActiveId) {
    //   return;
    // }
    that.setData({
      //获取点击的省份，加个active
      provinceActiveId: e.target.dataset.province_id,
      hotShow:false
    })
    
    util.loadCity({ province_id: e.target.dataset.province_id},
     function(res){
      that.setData({
        cities:res.data
      })
    })
  },
  //热门的展示
  openHotShow:function(){
    this.setData({
      hotShow:true,
      provinceActiveId:0
    })
  },

  //选择城市-》存入全局变量，因为跨页
  chooseCity:function(e){
    var city = e.target.dataset['name']
    this.setData({
      activeCityName: city
    })
    if (city == '全国'){
      app.globalData.queryPosition['city'] = ''
      app.globalData.queryPosition['location'] = ''
    }else{
      app.globalData.queryPosition['city'] = city
      app.globalData.queryPosition['location'] = city
    }



    //选定完毕返回到主页
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      'typeBarArr[1]':city
    })
    prevPage.refreshPage()

    wx.navigateBack({
      delta:1
    })
  }
  
  

})