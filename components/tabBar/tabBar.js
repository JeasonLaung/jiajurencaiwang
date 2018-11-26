Component({
  properties:{
    tabBarActive:{
      type:Number,
      value:0
    },
    tabBarArr:{
      type:Array,
      value:[
        {
          "title":"职位",
          "iconClass":"icon-position",
          "iconStyle":""
        },
        {
          "title":"公司",
          "iconClass":"icon-company",
          "iconStyle": ""
        },
        {
          "title":"登录",
          "iconClass":"icon-username",
          "iconStyle": ""
        }
      ]
    }
  },
  data:{
    
  },
  methods:{
    changeTabBar:function(e){
      if(e.currentTarget.dataset.noAction){
        this.triggerEvent('changeTabBar', e.currentTarget.dataset.index)
        return false;
      }
      this.setData({
        tabBarActive: e.currentTarget.dataset.index
      })
      this.triggerEvent('changeTabBar', e.currentTarget.dataset.index)
    }
  }
})