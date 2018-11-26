Component({
  properties:{
    placeholder:{
      type:String,
      value:'请输入'
    },
    top:{
      type:String,
      value:'',
    }
  },
  data:{
    focus:false,
    hasValue:false,
    value:'',
    resetShow:false
  },
  methods:{
    _inputAction:function(e){
      // console.log(e.detail.value)
      // if(e.detail.value){
      //   this.setData({
      //     hasValue:true
      //   })
      // }else{
      //   this.setData({
      //     hasValue:false
      //   })
      // }
      this.triggerEvent('search', e.detail.value)
    },
    _focusAction:function(){
      this.setData({
        resetShow:true,
        focus:true
      })
    },
    _blurAction: function () {
      this.setData({
        resetShow: false,
        focus: false
      })
    },
    _resetAction:function(e){
     
      this.setData({
        value:'',
        hasValue:false
      })
      this.triggerEvent('reset',e)
    }
    // focusAction:function(){
    //   this.setData({
    //     focus:true
    //   })
    // },
    // blurAction: function (e) {
    //   this.setData({
    //     focus: false
    //   })
    // },
    // inputAction:function(e){
    //   this.triggerEvent('search',e.detail.detail.value)
    //   // console.log(e)
    //   if (e.detail.detail.value){
    //     this.setData({
    //       hasValue:true
    //     })
    //   }
    //   if (!e.detail.detail.value) {
    //     this.setData({
    //       hasValue: false
    //     })
    //   }
    //   console.log()
    //   this.setData({
    //     temp_value: e.detail.detail.value
    //   })
    // },
    // resetAction(e){
    //   console.log(e)
    //   this.triggerEvent('reset',e)
    // }
  }
})