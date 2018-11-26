const util = require('../../../utils/util')
Component({
	properties:{
		title:String,
		split:{
			type:String,
			value:'-'
		},
		show:{
			type:Boolean,
			value:false
		}
	},
	lifetimes:{
		attached:function () {
			
		},
		ready:function () {
			var that = this
			util.loadProvince(false,function (res) {
				if (res.status === 0) {
					that.setData({
						province:res.data
					})
					util.loadCity({province_id:res.data[0].id},function (resp) {
						that.setData({
							city:resp.data
						})
						// console.log(resp.data);
						// console.log(res.data);
						// that.selectComponent("#select")._Ready()

					})

				}else{
					that.setData({
						province:['暂无'],
						city:['暂无']
					})
				}
				
			})
			
		}
	},
	data:{
		province:[],
		city:[]
	},
	methods:{
		changeProvince:function (e) {
			// util.loadCity()
			if (e.detail.position.column == 0) {
				var that =this
				util.loadCity({province_id:e.detail.id},function (res) {
					if (res.status === 0) {
						that.setData({
							city:res.data
						})
						// console.log(res.data);
						// that.selectComponent("#select")._Ready()
					}else{
						that.setData({
							city:['暂无']
						})
					}
					
				})
			}
			return false
			
		},
		_bindchange:function (e) {
			this.triggerEvent('change',e.detail)
		}
	}
})