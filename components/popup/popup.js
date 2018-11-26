Component({
  properties:{
    position:{
      type:String,
      value:'bottom'
    },
    show:{
      type: Boolean,
      value: false
    },
    left:{
      type:String,
      value:''
    },
    right: {
      type: String,
      value: ''
    },
    bottom: {
      type: String,
      value: ''
    },
    top: {
      type: String,
      value: ''
    },
  },
  data:{

  },
  methods:{
    closeModal: function () {
      // console.log(this.data)
      this.setData({
        show: false
      })
      this.triggerEvent('hide')
    }
  }
  

})

