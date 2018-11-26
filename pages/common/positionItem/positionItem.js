// pages/common/positionItem/positionItem.js
const util = require("../../../utils/util.js")
const app = getApp()
Component({

  properties:{
    dataArr:{
      type:Array,
      value:[]
    },
    dayAgoArr:{
      type: Array,
      value: []
    }
  },
  data:{
    host:app.globalData.host
  },
  /**
   * 页面的初始数据
   */
  // data: {
  //   loadHide:true,
  //   dateAgoArr:[]
  // },
  // onLoad:function(){
  //   //先处理dayAgo
  //   var dateAgoArr = []
  //   this.data.dataArr.forEach(v=>{
  //     dateAgoArr.push(util.dayAgo(v.created))
  //   })
  //   this.setData({
  //     dateAgoArr: this.data.dateAgoArr.concat(dateAgoArr)
  //   })
  // },
  methods:{
    _positionGoLink:function(e){
      // console.log(e)
      this.triggerEvent('goLink', e.currentTarget.dataset.pid)
      this.triggerEvent('gocLink', e.currentTarget.dataset.cid)
    }
  }


  // data:{
    // imageHeight:100,
  // array: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  // imgArr:[false,false,false,false]
  // }
  // onPageScroll:function(res){
  //   console.log(res)
    // 图片高度
    // index = parseInt(res.scrollTop/this.data.imageHeight)
    // imgArr[index] = true
    // 在wxml中判断是否为真，真的时候才加载

  // }

  // onReachBottom:function(){
  //   var that = this
  //   //记载完毕后关闭
  //   this.setData({
  //     loadHide:false
  //   })

  //   //模拟加载完毕
  //   setTimeout(function(){
  //     that.setData({
  //       loadHide: true
  //     })
  //   },2000)
  // }

})