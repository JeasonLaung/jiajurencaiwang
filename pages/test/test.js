// pages/test/test.js
const cookie = require('../../utils/cookie')
Page({
  prompt:function(e){
    this.selectComponent('#prompt').confirm({
      title:'添加标签',
      message:''
    })
  },
  /**
   * 页面的初始数据
   */
   changeTitle:function () {
    if (this.data.title == '你的名字') {
      this.setData({
      title:"我的名字"
     })
    }else{
      this.setData({
      title:"你的名字"
     })
    }
     
   },
  data: {
    title:"期待工作岗位",
    range:
    [{"school_name":"湖南工程职业技术学院","school_id":128},{"school_name":"湖南生物机电职业技术学院","school_id":127},{"school_name":"湖南外贸职业学院","school_id":143},{"school_name":"湖南交通职业技术学院","school_id":134}],
    range2:
    [[{"school_name":"湖南工程职业技术学院","school_id":128},{"school_name":"湖南生物机电职业技术学院","school_id":127},{"school_name":"湖南外贸职业学院","school_id":143},{"school_name":"湖南交通职业技术学院","school_id":134}],[{"school_name":"湖南工程职业技术学院","school_id":128},{"school_name":"湖南生物机电职业技术学院","school_id":127},{"school_name":"湖南外贸职业学院","school_id":143},{"school_name":"湖南交通职业技术学院","school_id":134}]],
// allschool:{"湖南省":{"长沙市":[{"school_name":"湖南工程职业技术学院","school_id":128},{"school_name":"湖南生物机电职业技术学院","school_id":127},{"school_name":"湖南外贸职业学院","school_id":143},{"school_name":"湖南交通职业技术学院","school_id":134},{"school_name":"湖南科技职业学院","school_id":129},{"school_name":"长沙南方职业学院","school_id":54},{"school_name":"湖南信息职业技术学院","school_id":58},{"school_name":"中南林业科技大学涉外学院","school_id":61},{"school_name":"湖南都市职业学院","school_id":67},{"school_name":"湖南女子学院","school_id":69},{"school_name":"长沙理工大学","school_id":74},{"school_name":"长沙环境保护职业技术学院","school_id":77},{"school_name":"长沙学院","school_id":80}],"娄底市":[{"school_name":"娄底职业技术学院","school_id":142}],"衡阳市":[{"school_name":"衡阳师范学院","school_id":135},{"school_name":"湖南环境生物职业技术学院","school_id":39}],"湘潭市":[{"school_name":"湖南理工职业技术学院","school_id":47},{"school_name":"湖南城建职业技术学院","school_id":45},{"school_name":"湖南工程学院","school_id":50},{"school_name":"湖南软件职业学院","school_id":52}],"益阳市":[{"school_name":"湖南工艺美术职业学院","school_id":81}],"株洲市":[{"school_name":"湖南汽车工程职业学院","school_id":150}],"永州市":[{"school_name":"九嶷职业技术学院","school_id":154}],"常德市":[{"school_name":"湖南文理学院","school_id":64}]},"湖北":{"武汉":[{"school_name":"湖北交通职业技术学院","school_id":148}]},"江西省":{"赣州市":[{"school_name":"江西应用技术职业学院","school_id":100},{"school_name":"江西环境工程职业学院","school_id":99}],"南昌":[{"school_name":"江西现代职业技术学院","school_id":113}],"南昌市":[{"school_name":"江西工业职业技术学院","school_id":111},{"school_name":"江西传媒职业学院","school_id":109},{"school_name":"江西师范大学科技学院","school_id":124},{"school_name":"江西泰豪动漫职业学院","school_id":115},{"school_name":"江西青年职业学院","school_id":103},{"school_name":"南昌理工大学","school_id":104},{"school_name":"江西农业大学南昌商学院","school_id":105},{"school_name":"江西科技师范大学","school_id":106},{"school_name":"东华理工大学","school_id":107},{"school_name":"江西工业贸易职业技术学院","school_id":108},{"school_name":"南昌影视传播职业学院","school_id":110},{"school_name":"江西外语外贸职业学院","school_id":112},{"school_name":"江西制造职业技术学院","school_id":114},{"school_name":"南昌工程学院","school_id":122},{"school_name":"江西先锋软件职业技术学院","school_id":123},{"school_name":"江西农业大学职业师范学院","school_id":125},{"school_name":"江西应用科技学院","school_id":126}],"九江市":[{"school_name":"南昌大学共青学院","school_id":119},{"school_name":"九江职业大学","school_id":116},{"school_name":"九江学院","school_id":117},{"school_name":"共青科技职业学院","school_id":118}],"吉安市":[{"school_name":"吉安职业技术学院","school_id":101}],"景德镇市":[{"school_name":"江西陶瓷工艺美术职业技术学院","school_id":10},{"school_name":"景德镇学院","school_id":120},{"school_name":"景德镇陶瓷大学","school_id":121}],"丰城市":[{"school_name":"江西洪州职业学院","school_id":102}]},"广东省":{"惠州市":[{"school_name":"惠州城市职业学院","school_id":55},{"school_name":"惠州学院","school_id":57}],"广州市":[{"school_name":"广州城建技工学校","school_id":34},{"school_name":"广州大学华软软件学院","school_id":40},{"school_name":"广州城建职业学院","school_id":31},{"school_name":"广州涉外经济职业技术学院","school_id":26},{"school_name":"广州大学松田学院","school_id":41},{"school_name":"广州科技职业技术学院","school_id":38},{"school_name":"私立华联大学","school_id":95},{"school_name":"广东技术师范学院天河学院","school_id":29},{"school_name":"广州工商学院","school_id":30},{"school_name":"中山大学南方学院","school_id":36},{"school_name":"广州南洋理工职业学院","school_id":37},{"school_name":"广州现代信息工程职业技术学院","school_id":43},{"school_name":"广东工业大学华立学院","school_id":44},{"school_name":"广东工商职业技术学院","school_id":65},{"school_name":"广东省华立技师学院","school_id":70},{"school_name":"广州科技贸易职业学院","school_id":82},{"school_name":"广州市广播电视大学","school_id":84},{"school_name":"广州市白云工商技师学校","school_id":85},{"school_name":"广东技术师范学院","school_id":91},{"school_name":"广州商学院","school_id":93},{"school_name":"广州市轻工技师学院","school_id":96}],"清远市":[{"school_name":"清远职业技术学院","school_id":63}],"东莞市":[{"school_name":"东莞职业技术学院","school_id":46},{"school_name":"广东科技学院","school_id":48}],"深圳市":[{"school_name":"深圳大学","school_id":49}],"河源市":[{"school_name":"河源职业技术学院","school_id":62}],"肇庆市":[{"school_name":"广东理工学院","school_id":66}],"云浮市":[{"school_name":"罗定职业技术学院","school_id":72}],"湛江市":[{"school_name":"岭南师范学院","school_id":73}],"珠海市":[{"school_name":"北京师范大学珠海分院","school_id":76},{"school_name":"珠海艺术职业学院","school_id":98}],"佛山市":[{"school_name":"顺德职业技术学院","school_id":87},{"school_name":"广东东软学院","school_id":88}]},"湖北省":{"武汉市":[{"school_name":"武汉软件工程职业学院","school_id":139},{"school_name":"湖北商贸学院","school_id":144},{"school_name":"武汉工程科技学院","school_id":152},{"school_name":"中南民族大学","school_id":131},{"school_name":"武昌理工学院","school_id":141},{"school_name":"武汉工程大学","school_id":151},{"school_name":"长江职业学院","school_id":136},{"school_name":"湖北轻工职业技术学院","school_id":145},{"school_name":"文华学院","school_id":149},{"school_name":"武汉工程大学邮电与信息工程学院","school_id":130},{"school_name":"华中师范大学","school_id":155},{"school_name":"江汉大学","school_id":137},{"school_name":"湖北第二师范学院","school_id":132},{"school_name":"武汉职业技术学院","school_id":146},{"school_name":"武汉工商学院","school_id":147},{"school_name":"武汉科技大学城市学院","school_id":138},{"school_name":"武汉传媒学院","school_id":156}],"咸宁市":[{"school_name":"湖北科技学院艺术与设计学院","school_id":140}],"武汉":[{"school_name":"武汉华夏理工学院","school_id":153}]},"福建省":{"厦门市":[{"school_name":"厦门软件职业技术学院","school_id":15}]},"四川省":{"成都市":[{"school_name":"成都艺术职业学院","school_id":21},{"school_name":"四川现代职业学院","school_id":27},{"school_name":"四川长江职业学院","school_id":28},{"school_name":"成都信息工程大学银杏酒店管理学院","school_id":32},{"school_name":"四川工商学院","school_id":33},{"school_name":"西华大学","school_id":35},{"school_name":"四川托普信息技术职业学院","school_id":42},{"school_name":"四川艺术职业学院","school_id":51},{"school_name":"四川商务职业学院","school_id":53},{"school_name":"成都农业科技职业学院城乡建设分院","school_id":56},{"school_name":"四川电影电视学院","school_id":59}],"德阳市":[{"school_name":"四川工程职业技术学院","school_id":60},{"school_name":"四川建筑职业技术学院","school_id":68}]},"重庆省":{"重庆市":[{"school_name":"重庆师范大学涉外商贸学院","school_id":71},{"school_name":"重庆房地产职业学院","school_id":75},{"school_name":"重庆电讯职业学院","school_id":78},{"school_name":"重庆工程职业技术学院","school_id":79},{"school_name":"重庆建筑工程职业学院","school_id":83},{"school_name":"重庆第二师范学院","school_id":86},{"school_name":"重庆科创职业学院","school_id":89},{"school_name":"重庆文理学院","school_id":90},{"school_name":"重庆航天职业技术学院","school_id":92},{"school_name":"四川外语学院重庆南方翻译学院","school_id":94},{"school_name":"重庆工程学院","school_id":97}]}},
    abc:123,
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    proArr:[],
    cityArr:[],
    schools:[],
  },

  change:function (e) {
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gogogo = function () {
      console.log(123);
    }
    // this.setData({
    //   proArr:Object.keys(this.data.allschool),
    //   cityArr:Object.keys(this.data.allschool[this.data.proArr[0]]),
    //   schools:this.data.allschool[this.data.proArr[0]][this.data.cityArr[0]]
    // })
    // console.log(Object.keys(this.data.allschool));
    // let proArr,cityArr,schools = []
    // proArr = Object.keys(this.data.allschool)
    // // console.log(Object.keys(this.data.allschool[this.data.proArr[0]]));
    // cityArr = Object.keys(this.data.allschool[proArr[0]])
    // schools = this.data.allschool[proArr[0]][cityArr[0]]
    // this.setData({
    //   proArr,
    //   cityArr,
    //   schools
    // })
    // let    collegeProvinceArr = [],
    // collegeCityArr = [],
    // collegeArr = []

  },
  inputAction:function(e){
    console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  addTags:function (e) {
    this.setData({
      string:e.detail
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tell:function (e) {
    console.log(e);
  },
// 点击充值弹窗
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {

  },

  loginTypeChoose:function(e){
    console.log(e)
  },
  close_mask: function () {
    this.setData({
      showModal: false
    })
  } ,
  doit:function () {
    var rd = Math.floor(Math.random()*500)
    cookie.setCookie(String(rd),rd,50000)
  },
  getit:function () {
        console.log(cookie.getCookie(String(453)))
  },
  show:function () {
    this.gogogo()
  }
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  // openModal(){
  //   this.setData({
  //     showModal:true
  //   })
  // },

})