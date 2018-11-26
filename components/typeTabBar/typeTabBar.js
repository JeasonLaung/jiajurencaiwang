Component({
  properties:{
    type_arr:{
      type:Array,
      value: ["推荐","全国","岗位","要求"]
    },
    activeIndex: {
      type: Number,
      value:-1
    },
    badge_arr:{
      type:Array,
      value:[0,0,0,0]
    }
  },
  data:{
    
    
  },
  methods:{
    activeAction:function(e){
      var index = e.currentTarget.dataset.index
      //重复点击消失
      if (this.data.activeIndex === index){
        this.setData({
          activeIndex: -1
        })
        this.triggerEvent('click', -1)
        return;
      }
      //首次点击记录index并传出
      this.triggerEvent('click', index)
      this.setData({
        activeIndex:index
      })
    }
  }
})