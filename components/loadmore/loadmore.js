// components/loadmore/loadmore.js
Component({
  properties:{
    showLoad:{
      type:Boolean,
      value:false
    },
    message:{
      type:String,
      value: '正在加载更多...'
    },
    iconPath:{
      type:String,
      value:''
    }
  }
})