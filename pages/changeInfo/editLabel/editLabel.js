// pages/changeInfo/editLabel/editLabel.js
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelArr:[],
    label:[],
    myLabel:[],
    type:'',
    canIsubmit:false

  },
  canIsubmit:function () {
    this.data.myLabel.length + this.data.label.length ? this.setData({canIsubmit:true}) : this.setData({canIsubmit:false})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    // console.log(this.data.form.userid);
    util.getUserId(function (id) {
      that.setData({
        'userid':id
      })
    })
    //模拟
    options = {
      type:'person',
      // label:'49,60,62,64,73,384'
    }
    options['type'] == 'person' ? wx.setNavigationBarTitle({title:'编辑我的特长'}) : ''
    // options['label'] = options['label'].split(',').map(v=>{
      // return Number(v)
    // })
    that.setData({
      ...options
    })


    util.loadPersonLabel(false,function (res) {
      that.setData({
        labelArr:res.data
      })
    })

    that.refreshMyPersonLabel()

    // util.loadMyPersonLabel(false,function (res) {
    //   //要处理自己添加的
    //   var myLabel = [],
    //   label = []
    //   res.data != false ? res.data.forEach(v=>{
    //       v.parent_id == 0 ? myLabel.push(v) : label.push(v.id)
    //   }) : false

    //   that.setData({
    //     label:label,
    //     myLabel:myLabel
    //   })
    // })
  },
  delTag:function (e) {
    var that = this
    let id = e.currentTarget.dataset.id
    util.delTag({id:id},function (res) {
      // that.refreshMyPersonLabel()
      if (res.status === 0) {
        //成功
        let myLabel = that.data.myLabel
        Object.keys(myLabel).forEach(index=>{
          return myLabel[index].id == id ? myLabel.splice(index,1) : false
        })
        that.setData({
          myLabel:myLabel
        })
        that.selectComponent('#toast')._timer("删除成功")
      }
      that.canIsubmit()
    })
    
  },

  chooseTag:function (e) {
    var that = this
    let id = e.currentTarget.dataset.id
    var label = this.data.label
    if (label.length >= 5 && label.indexOf(id) == -1) {
      //最多5个标签
      that.selectComponent('#toast')._timer("最多选5个特长，可以新建哦！")
      return false 
    }
    if (label.indexOf(id) == -1) {
      //不存在就添加
      label.push(id)
    }else{
      //存在就删除
      label.splice(label.indexOf(id),1)
    }
    that.setData({
      label:label
    })
    that.canIsubmit()
  },
  addTag:function (e) {
    var that = this
    // console.log(e);
    if (!e.detail) {that.selectComponent('#toast')._timer('不能为空哦!');return false}
    let params = {
      label_name:e.detail,
      label_type:1,
      level:2,
      parent_id:0
    }
    util.addTag(params,function (res) {
      // that.refreshMyPersonLabel()
      // {status: 0, msg: "success", data: "390"}
      if (res.status === 0) {
        //成功
        var myLabel = that.data.myLabel
        myLabel.push({id:res.data,label_name:e.detail})
        that.setData({
          myLabel:myLabel
        })
        that.selectComponent('#toast')._timer("新增成功")
      }
      that.canIsubmit()
    })
    
  },
  refreshMyPersonLabel:function () {
    var that = this
    util.loadMyPersonLabel(false,function (res) {
      //要处理自己添加的
      var myLabel = [],
      label = []
      res.data != false ? res.data.forEach(v=>{
          v.parent_id == 0 ? myLabel.push(v) : label.push(v.id)
      }) : false

      that.setData({
        label:label,
        myLabel:myLabel
      })

      that.canIsubmit()
    })
  },
  prompt:function () {
    this.selectComponent('#prompt').prompt({
      title:'新建我的特长'
    })
  },
  submit:function () {
    var that = this
    var myLabelIdArr = []
    that.data.myLabel.forEach(v=>{
      myLabelIdArr.push(v.id)
    }) 
    var json = {'label_ids':that.data.label.concat(myLabelIdArr)}
    util.setTags(json,function () {
      let pages = getCurrentPages(),
      prev = pages[pages.length-2]
      prev.refresh()
      wx.navigateBack({
        delta:1
      })
    })
  }
})