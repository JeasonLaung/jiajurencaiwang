Component({
  properties:{
  	title:{
  		type:String,
  		value:''
  	},
  	position:{
  		type:String,
  		value:'bottom'//'bottom'/'top'
  	},
  	duration:{
  		type:Number,
  		value:2000
  	}
  },
  data:{
  	show:false,
  	timer:false
  },
  methods:{
  	_timer:function (title) {
      var title = title ? title : this.data.title
  		var that = this
  		var duration = that.data.duration
  		clearTimeout(that.data.timer)
  		that._show(title)
  		that.data.timer = setTimeout(function () {
  			that._hide()
        clearTimeout(that.data.timer)
  		},duration);
  	},
  	_hide:function () {
  		var that = this
  		that.setData({
  			show:false
  		})
  	},
  	_show:function(title) {
  		this.setData({
  			show:true,
        title:title
  		})
  	}
  }
})