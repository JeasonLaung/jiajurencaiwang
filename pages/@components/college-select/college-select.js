const loadAllSchool = require('../../../utils/util').loadAllSchool
Component({
	properties:{
		title:String,
		show:Boolean,
		split:String

	},
	data:{
		allSchool:[],
		province:[],
		city:[],
		college:[],
		index:[]
	},
	lifetimes:{
		ready:function () {
			this._refresh()
		}
	},
	methods:{
		_refresh:function () {
			var that = this
			if (that.data.province != false) {
				let allSchool = this.data.allSchool,
				province = this.data.nowProvince,
				city = Object.keys(allSchool[province]),
				college = allSchool[province][city[0]].map(v=>v['school_name'])
				this.setData({
					city,college
				})
				return 
			}
			loadAllSchool(false,function (res) {
				if (res.status === 0) {
					let	allSchool = res.data,
					//先设置默认状态
					//省
					province = Object.keys(allSchool),
					city = Object.keys(allSchool[province[0]]),
					college = allSchool[province[0]][city[0]].map(v=>v['school_name'])
					that.setData({
						province,city,college,allSchool
					})
				}
			})
		},
		_bindchange:function (e) {
		// 	this._refresh()
		// console.log(e);
		// console.log(e);
			let detail = e.detail,
			index = detail.index,
			allSchool=this.data.allSchool,
			province = this.data.province[index[0]],
			city = this.data.city[index[1]],
			school = allSchool[province][city][index[2]],
			res = {
				...detail,
				...school
			}
			this.triggerEvent('change',res)
		},
		_bindcancel:function () {

			// this.setData({
			// 	city:Object.keys()
			// })
		},
		_columnchange:function (e) {
			// console.log(e);
			var that = this
			// console.log(e.detail);
			let value = e.detail.value,
			allSchool = that.data.allSchool
			switch(e.detail.position.column){
				//改变省
				case 0:
				// console.log(allSchool[value]);
					var city = Object.keys(allSchool[value])
					that.setData({
						city,
						college:allSchool[value][city[0]].map(v=>v['school_name']),
						nowProvince:value
					})
					break
				//改变市
				case 1:
					let nowProvince = this.data.nowProvince
					if (!nowProvince) {return false}
					// console.log(allSchool)
					// console.log(value)
					// console.log(nowProvince);
					// console.log(allSchool[nowProvince]);
					// console.log(value)
					// console.log(allSchool[nowProvince][value]);
					that.setData({
						college:allSchool[nowProvince][value].map(v=>v['school_name'])
					})
			}
		}
	}
})