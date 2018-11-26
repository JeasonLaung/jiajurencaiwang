//index.js
//获取公共函数集util
const util = require("../../utils/util.js") 
const mePage = require("../templates/me/me.js")
const cookie = require("../../utils/cookie.js")

//获取应用实例
const app = getApp()

Page({
  data: {
    me:{},

    host: app.globalData.host,
    //登录状态管理
    logined:false,

    //导航栏活跃
    tabBarActive: 0,

    tabBarArr: [],


    /*
     *   岗位数据
     *
     */
    // 职位那里的top
    positionTop: '',
    //设置职位top
    positionScrollTop: '',
    //加载更多-没有更多
    loadingDiv: false,
    nomore: false,
    timer: null,
    searchString: '',
    loading: false,
    showModal: false,

    //类别bar选择
    typeBarArr: ["推荐", "全国", "岗位", "要求"], //负责修改arr
    typeBarIndex: -1,    //负责修改index
    tempTypeBarIndex: -1,//缓存当前的index



    //推荐或最新(1:推荐，0:最新)
    recommend: 1,

    //岗位种类
    jobTypeArr: [],
    jobType: [],

    //要求
    demand: ['', '', ''],
    demandArr: util.init.demandArr,


    //标签点数组
    badgeArr: [0, 0, 0, 0],

    //弹出窗口选择
    // popupIndex = tempTypeTabIndex
    popupAllowed: true,

    //职位信息
    positionArr: [],
    positionDayAgo: [],



    /**
     * 公司数据库
     * 
     */
    companyArr: [],
    //懒加载
    companyLazyArr:[],
    companyNoMore:false,
    companyLoadingDiv:true,
    companyTop:0,
    companyTimer:false,
    //防止重复request
    companyLoading:false,

    /**
     * 登录数据库
     * 
     */
    showLoginType:false




  },








  /**
   * 导航栏
   * 
   */
  changeTabBar: function (e) {
    this.setData({
      tabBarActive: e.detail,
      companyArr:[],
      positionArr:[],
      tempTypeBarIndex:-1
    })

    if (e.detail >= 0) {
      //分发tabbarindex 的onload
      switch (e.detail) {
        case 0:
          if (this.data.companyArr == false){
            this.positionOnLoad()
          }
          break
        case 1:
          if (this.data.companyArr == false){
            this.companyOnLoad()
          }
          break
        case 2:
          if (cookie.getCookie('session')) {

          }else{
            this.loginOnload()
          }
          break
        case 3:
            this.meOnLoad()
          break
        case 4:
          break
      }
    }
  },

  positionOnLoad:function () {
    var that = this



    //更新职位
    this.refreshPage()


    var that = this
    //获取城市
    if (app.globalData.queryPosition['city']) {
      that.setData({
        'typeBarArr[1]': app.globalData.queryPosition['city']
      })
    } else {
      that.setData({
        'typeBarArr[1]': '全国'
      })
    }

    //获取岗位类别
    util.loadJobType({}, function (res) {
      that.setData({
        jobTypeArr: res.data
      })
    })
    //设置标签值
    var jobTypeArr = util.deepCopy(app.globalData.queryPosition['position'])
    if (jobTypeArr != false) {
      that.setData({
        'badgeArr[2]': jobTypeArr.length
      })
    } else {
      that.setData({
        'badgeArr[2]': 0
      })
    }
  },



  /*
   *登录状态
   * 
   */
   checkLogin:function() {
      var that = this
      //获取当前用户
      util.loadCurrent(false,function(res){
        //登录成功
        if (res.status === 0) {
          //公司个人都是这个login的所以要注意在这里就要将其类型分开
          app.globalData.LOGINED = true
          //设置首页的tabBar
          that.setData({ 
            'tabBarArr': util.init.loginedTabBarArr,
            'logined':true
          })
          getApp().connectSocket()
        }else{
          //没有登录
          that.setData({ 
            'tabBarArr': util.init.unloginedTabBarArr,
            'logined':false
          })
        }
      })      
   },



  //钩子函数
  onReachBottom: function () {
  },

  onHide: function () {
    // console.log(123)
  },
  onShow:function(){
    // console.log(app.globalData.tabBarArr)
  },

  onLoad: function (options) {
    var that = this
    mePage.bindMePage(that)
    //获取当前用户
    that.checkLogin()
    that.positionOnLoad()
    util.Register({
      info:{
        //基础信息
        logo:'',
        name:'',
        gender:'',
        age:'',
        birth_month:'',
        birth_year:'',
        degree:'',
        experience:'',
        email:''      
      },
      college:{
        _school_id:'',//"128"
        _school_major_id:'',//183
        _school_name:'',//湖南工程职业技术学院,
        major:'',
        _province:'',
        _city:''
      },
      position:{
        career:'',//设计师助理
        city:'',//梧州
        salary:''//0k-3k

      },
      ability:{
        // label_ids
        ability:false
        // custom:[]
      },
      phone:{
        //直接post
        phone:'',
        captcha:'',
        password:'',
        // invitation_code:''

      }
    })

  },





  //各个模块


  //TypeTabBar
  //获取当前index
  getTypeBarIndex: function (e) {
    var that = this
    // 跳转选择城市界面
    if (e.detail == 1) {
      wx.navigateTo({
        url: '../common/city/city',
        complete: function () {
          that.setData({
            typeBarIndex: -1
          })
        }
      })
    }

    //这个关于popup的index操作
    that.setData({
      //重新打开popupAllowed许可
      popupAllowed: true,
      tempTypeBarIndex: e.detail
    })
  },

  //关闭popup的动作
  //重置index为-1
  resetTypeBar: function () {
    this.setData({
      typeBarIndex: -1,
    })
  },




  //positionScroll
  positionScroll: function (e) {
    this.setData({
      positionTop: e.detail.scrollTop
    })
  },
  //去职位详情页
  positionGoLink: function (e) {

    // console.log(e)
    wx.navigateTo({
      url: '../positionDetail/positionDetail?id=' + e.detail,
    })
  },
  //回到顶部
  positionBackTop: function () {
    this.setData({
      positionScrollTop: 0
    })

  },

  //refreshPage更新获取的职位
  refreshPage: function () {

    var that = this

    //重置nomore
    that.setData({
      nomore: false
    })

    app.globalData.queryPosition['start'] = 1
    //首次打开先获取一下职位
    util.loadPosition(app.globalData.queryPosition, function (res) {
      //获取返回数据个数判断是否小于nomore
      if (res.data.length < Number(app.globalData.queryPosition['pageRows'])) {
        that.setData({
          nomore: true
        })
      }
      var dayAgo = []
      res.data.forEach(v => {
        dayAgo.push(util.dayAgo(v.created))
      })
      //存储职位信息
      that.setData({
        positionArr: res.data,
        positionDayAgo: dayAgo,
        loadingDiv: true
      })
    })
  },
  //当道底部时自动向上提100rpx，显示loadmore
  ReachBottom: function (e) {
    // if(this.data.loading){
    //   console.log(e)
    //   this.setData({
    //     positionSrcollTop:e.detail.scrollTop+100+'rpx'
    //   })
    // }
  },
  //loadmore加载跟多获取的职位
  loadMorePage: function (e) {
    //没有更多了
    if (this.data.nomore) { return }
    //不重复加载两次
    // if (this.data.loading){return}
    var that = this
    this.setData({
      loading: true
    })

    //职位loadmore
    ++app.globalData.queryPosition['start']
    util.loadPosition(app.globalData.queryPosition, function (res) {

      //获取返回数据个数判断是否小于nomore
      if (res.data.length < Number(app.globalData.queryPosition['pageRows'])) {
        that.setData({
          nomore: true
        })
      }

      var dayAgo = []
      res.data.forEach(v => {
        dayAgo.push(util.dayAgo(v.created))
      })
      //存储职位信息
      that.setData({
        //关闭loading
        loading: false,
        positionArr: that.data.positionArr.concat(res.data),
        positionDayAgo: that.data.positionDayAgo.concat(dayAgo)
      })
    })//职位loadmore
  },


  //推荐或最新选择
  //最新
  newChoose: function (e) {
    //本来就是最新不做任何操作
    if (!this.data.recommend) { return false }
    this.setData({
      recommend: 0,
      'typeBarArr[0]': '最新',
      tempTypeBarIndex: -1,
      typeBarIndex: -1,
      popupAllowed: false
    })
    app.globalData.queryPosition['recommend'] = 0

    //执行refresh
    this.refreshPage()

  },
  //推荐
  recommendChoose: function () {
    //本来就是推荐不做任何操作
    if (this.data.recommend) { return false }
    this.setData({
      recommend: 1,
      'typeBarArr[0]': '推荐',
      tempTypeBarIndex: -1,
      typeBarIndex: -1,
      popupAllowed: false
    })
    app.globalData.queryPosition['recommend'] = 1


    //执行refresh
    this.refreshPage()

  },
  resetRecommend: function () {
    this.resetTypeBar()
  },



  //岗位
  jobTypeChoose: function (e) {
    var jobType = this.data.jobType || []
    var index = jobType.indexOf(e.target.dataset['position'])
    //如果已经存在就删除该岗位
    if (index != -1) {
      jobType.splice(index, 1)
    } else {
      //否则就添加
      jobType.push(e.target.dataset['position'])
    }
    //存储最后数据存入全局和局部函数
    this.setData({
      jobType: jobType,
      'badgeArr[2]': jobType.length
    })
  },
  resetJobType: function () {
    this.setData({
      jobType: [],
      'badgeArr[2]': 0
    })
  },
  jobTypeSubmit: function () {
    //赋值全局变量
    app.globalData.queryPosition['position'] = util.deepCopy(this.data.jobType)
    //关闭popup许可
    this.setData({
      typeBarIndex: -1,
      popupAllowed: false,
      tempTypeBarIndex: -1
    })

    //执行refresh
    this.refreshPage()
  },
  //关闭jobTypepopup的动作
  hideJobTypePopup: function () {
    var jobType = util.deepCopy(app.globalData.queryPosition['position'])
    //重置typebar
    this.resetTypeBar()
    // 重新获取全局变量里面的positionarr 赋值 jobType 因为以全局的为准
    this.setData({
      jobType: jobType,
      'badgeArr[2]': jobType.length

    })

  },

  //要求
  demandChoose: function (e) {
    var demand = util.deepCopy(this.data.demand)
    var query = e.target.dataset['query']
    var index = e.target.dataset['index']
    demand[index] = query
    this.setData({
      demand: demand,
      'badgeArr[3]': this.getTrueLength(demand)
    })
  },
  resetDemand: function (e) {
    var demand = util.deepCopy(this.data.demand)
    var index = e.target.dataset['index']
    demand[index] = ''
    this.setData({
      demand: demand,
      'badgeArr[3]': this.getTrueLength(demand)
    })
  },
  demandSubmit: function () {
    app.globalData.queryPosition['degree'][0] = this.data.demand[0]
    app.globalData.queryPosition['experience'][0] = this.data.demand[1]
    app.globalData.queryPosition['salary'][0] = this.data.demand[2]
    this.setData({
      typeBarIndex: -1,
      popupAllowed: false,
      tempTypeBarIndex: -1
    })
    //执行refresh
    this.refreshPage()
  },
  hideDemandPopup: function () {
    var demand = ['', '', '']
    demand[0] = app.globalData.queryPosition['degree'][0] || ''
    demand[1] = app.globalData.queryPosition['experience'][0] || ''
    demand[2] = app.globalData.queryPosition['salary'][0]
    this.setData({
      demand: demand,
      typeBarIndex: -1,
      'badgeArr[3]': this.getTrueLength(demand)
    })
  },
  getTrueLength: function (arr) {
    var x = 0
    arr.forEach(v => {
      if (v != false && v != null) {
        x++;
      }
    })
    return x
  },

  //search
  search: function (e) {
    var that = this
    //每次都clear一次保证能够等用户输入完1秒钟之后搜索
    clearTimeout(that.data.timer)
    that.data.timer = null
    // if(!e.detail){return false}
    if (that.data.timer == null || !that.data.timer) {
      that.data.searchString = e.detail
      that.data.timer = setTimeout(function () {
        app.globalData.queryPosition['key_word'] = that.data.searchString
        that.refreshPage()
        clearTimeout(that.data.timer)
        that.data.timer = null
      }, 1000)//延时一秒触发搜索
    } else {
      that.data.searchString = e.detail
    }
  },
  resetSearch: function () {
    app.globalData.queryPosition['key_word'] = ''
    this.refreshPage()
  },





  /*
   * 公司
   *
   */
  companyOnLoad: function () {
    var that = this
    this.refreshCompany()
  },
  
  //公司loadmore
  loadMoreCompany: function () {
    var that = this
    //防止nomore开启后继续进行搜索
    if (that.data.companyNoMore) {return false;}
    //防止重复操作
    if (that.data.companyLoading) { return; } else { that.data.companyLoading = true}

    ++app.globalData.queryCompany['page']
    util.loadCompany(app.globalData.queryCompany, function (res){
      if (res.data.data.length < app.globalData.queryCompany.pagesize) {

        that.setData({
          companyNoMore: true,
          companyLoadingDiv: false
        })
        
      }
      that.data.companyLoading = false
      that.setData({
        companyArr: that.data.companyArr.concat(res.data.data)
      })
    })
  },
  //刷新refresh公司
  refreshCompany: function () {
    var that = this
    //重置
    that.setData({
      companyNoMore: false,
      companyLoadingDiv: true
    })
    app.globalData.queryCompany['page'] = 1
    util.loadCompany(app.globalData.queryCompany, function (res) {
      //没有更多
      if (res.data.data.length < app.globalData.queryCompany.pagesize){
        that.setData({
          companyNoMore:true,
          companyLoadingDiv:false
        })
      }
      that.setData({
        companyArr: res.data != false ? res.data.data : []
      })
    })
  },
  //回到头
  companyBackTop:function(){

  },

  //搜索公司
  companySearch:function(e){
    var that = this
    if (e.detail == false) { that.refreshCompany();return;}
    clearTimeout(that.data.companyTimer)
    that.data.companyTimer = null
    if (!that.data.companyTimer || that.data.companyTimer == null) {
      that.data.companyTimer = setTimeout(function(){
        util.searchCompany({ keyword: e.detail }, function (res){
          if (res.data.data.length < app.globalData.queryCompany.pagesize || JSON.stringify(res.data.data) == "{}") {
            that.setData({
              companyNoMore: true,
              companyLoadingDiv: false
            })
          }
          that.setData({
            companyArr:res.data.data
          })
        })
        console.log(e)
        
      },500)
    }
  },
  //公司详情
  companyGoLink:function(e){
    wx.navigateTo({
      url: '../companyDetail/companyDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 登录
   * 
   */
  
  //登录页面
  loginOnload:function(){
    this.setData({
      tabBarActive:2
    })
  },
  loginTypeChoose:function(e){
    var that = this
    wx.navigateTo({
      url: '../login/login?type='+e.currentTarget.dataset.type

    })
  },
  closeLoginType:function(){
    this.setData({
      showLoginType: false,
      tabBarActive:0
    })
    this.positionOnLoad()
  },







  tell: function (e) {
    console.log(e)
  }

})
