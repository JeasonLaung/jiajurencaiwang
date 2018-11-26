const util = require("../../utils/util")
Component({
  properties:{
    changeTag:{
      type:Boolean,
      value:true
    },
    tabIndex:{
      type:Number,
      value:0
    }
  },
  lifetimes:{
    attached:function () {
      var that = this
      util.getUserId(function (id) {
        
      })
      wx.onSocketMessage(function (res) {
        // console.log(JSON.parse(res.data.toUtf8()))

        if (JSON.parse(res.data).cmd == 'getRencentUserlist') {
          let userlist = JSON.parse(res.data).userlist

          userlist.forEach(v=>{
            // console.log(v.newest_msg);
             v.newest_msg = v.newest_msg.replace(/&lt;img(.+?)&gt;/g,'[图片]')
              // v.newest_msg = v.content.toUtf8()
              //替换img为图片
              //去掉其他标签
              // v.content.replace(/&lt;img(.+?)&gt;/g,'[图片]')
              // &lt;img src="/upload-files/user/20181123/e0d115827949f60a26473014125493ed.jpg"/&gt;

            // v.content ? (function () {
            //   console.log(v.content);
            //   v.content.replace(/&lt;img(.+?)&gt;/g,'[图片]')
            //   v.content = v.content.toUtf8()
            //   //替换img为图片
              
            //   //去掉其他标签
            //   // v.content.replace(/&lt;img(.+?)&gt;/g,'[图片]')
            //   // &lt;img src="/upload-files/user/20181123/e0d115827949f60a26473014125493ed.jpg"/&gt;
              
            // })() : false
          })
          that.setData({
            userlist:userlist ? userlist : []
          })
          }
        
      })
      
    },
    ready:function () {

    },
    detached:function () {
      
    }
  },
  data:{
    userlist:[],
    host:util.host,
    myCollectArr:[],
    myDeliveryArr:[],
    myVisitorArr:[],
    myOfferArr:[]

  },
  methods:{
    gocLink:function (e) {
      wx.navigateTo({
        url:'/pages/companyDetail/companyDetail?id='+e.detail
      })
    },
    goLink:function (e) {
      wx.navigateTo({
        url:'/pages/positionDetail/positionDetail?id='+e.detail
      })
    },
    tapToChange:function (e) {
      // console.log(e.currentTarget.dataset.id);
      let id = e.currentTarget.dataset.id
      // this.setData({
      //   tabIndex:id
      // })
      //伪装成event
      this.tabChange({detail:{current:Number(id)}})
    },
    //分发
    tabChange:function (e) {
      var that = this
      // console.log(e.detail.current);

      that.setData({
        tabIndex:e.detail.current
      })
      //分发
      switch(e.detail.current){
        case 0:
          util.loadVisitor(false,function (res) {
              if(res.status === 0){
                // console.log(res.data);
                that.setData({
                  myDeliveryArr:res.data
                })
              }
          })
          break
        case 1:
          util.loadDelivery(false,function (res) {
              if(res.status === 0){
                // console.log(res.data);
                that.setData({
                  myDeliveryArr:res.data
                })
              }
          })
          break
        case 2:
        // console.log('yes');
        // console.log(this.data.tabIndex);
          util.loadMyCollect(false,function (res) {
              if(res.status === 0){
                // console.log(res.data);
                that.setData({
                  myCollectArr:res.data
                })
              }
          })
          break
        case 3:
          util.loadOffer(false,function (res) {
            if(res.status === 0){
                // console.log(res.data);
                that.setData({
                  myOfferArr:res.data
                })
              }
          })
          break
      }
      
    },
    getMsgTime:function () {
      
    },
    nopic:function (e) {
    // console.log(e); 
    },
    goTalk:function (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url:'/pages/chat/chat?id='+id
      })
    },
    changePage:function () {
      if (this.data.changeTag) {
        this.setData({
          changeTag:false
        })
      }else{
        this.setData({
          changeTag:true
        })
      }
    }
  }
})