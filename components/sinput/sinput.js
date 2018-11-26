Component({
  properties:{
    placeholder:{
      type:String,
      value:''
    },
    value:{
      type:String,
      value:''
    },
    maxlength:{
      type:String,
      value:''
    },
    type:{
      type:String,
      value:'text'
    },
    password:{
      type:Boolean,
      value:false
    }
  },
  data:{
    resetShow:false,
    
  },
  methods:{
    _inputAction: function (e) {
      if (e.detail.value.length > 0) {
        this.setData({
          resetShow:true
        })
      }
      else{
        this.setData({
          resetShow:false
        })
      }
        
      this.triggerEvent('input', e.detail)
    },
    _resetAction:function(e){
      this.setData({
        value:'',
        resetShow:false
      })
      // console.log(e)
      this.triggerEvent('reset',{value:''})
    },
    _tapAction: function(e) {
      // this.setData({
      //   resetShow: true
      // })
      this.triggerEvent('tap', e)
    },
    _focusAction: function(e){
      if (e.detail.value.length > 0) {
        this.setData({
          resetShow:true
        })
      }
      else{
        this.setData({
          resetShow:false
        })
      }
      this.triggerEvent('focus', e)
    },
    _blurAction:function(e){
      // this.setData({
      //   resetShow: false
      // })
      this.triggerEvent('blur',e.detail)
    }
  }
})