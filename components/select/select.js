Component({
	properties:{
		//展示全部选项,默认只显示最后一个的值
		show:{
			type:Boolean,
			value:false
		},
		pvalue:Array,
		split:{
			type:String,
			value:'，'
		},
		//父页强行赋值
		value:{
			type:String,
			value:''
		},
		title:{
			type:String,
			value:'',
			// observer:function (newword,oldword,fatherpath) {}
		},
		range:{
			type:Array,
			value:[],
			observer:function (n,o,p) {
				this._Ready(n,o,p)
			}
			
		},

		//普通选择
		//作json处理,传入数组不需要
		key:{
			type:String,
			value:''
		},

		//multiSeletor
		keys:{
			type:Array,
			value:[]
		},

		//优先级最高，可以取代任何range
		mode:{
			type:String,//[selector,multiSelector,date,time,region]
			value:'selector'
		}
	},
	data:{
		//普通
		//json处理后的range
		_range:[],
		_index:0,
		_value:'',

		//多部件选择器
		//json处理后的range
		// _multi_range:[]//最后统一用_range

	},
	lifetimes:{
		ready:function () {
			this._Ready()
		}

	},

	methods:{
		_bindcancel:function (e) {
			this.triggerEvent('cancel',e.detail)
		},
		_bindchange:function (e) {
			let res = {},
			key = this.data.key
			switch(this.data.mode){
				case 'selector':
					let _index = e.detail.value,
					
					_range = !key ? this.data.range : this.data._range,
					_value = _range[_index]
					this.setData({
						_index,
						_value
					})
					//事件返回数据
					res = !key ? {index:Number(_index),value:_value} : {...this.data.range[_index],index:Number(_index),value:_value}
					break
				case 'multiSelector':

					let show = this.data.show,
					keys = this.data.keys,
					_index_arr = e.detail.value,
					_multi_range=!keys ? this.data.range : this.data._range,
					_last_index = _index_arr[_index_arr.length-1] || 0,
					_last_value = _multi_range[_multi_range.length-1][_last_index],
					value_arr = Object.keys(_index_arr).map(k=>_multi_range[k][_index_arr[k]])

					// console.log(_multi_range);
					this.setData({
						_value:!show ? _last_value : value_arr.join(this.data.split)
					})
					res = {index:e.detail.value,value:_last_value,value_arr:value_arr}
					if (keys != false) {
						
						let json_arr = Object.keys(_index_arr).map(k=>this.data.range[k][_index_arr[k]])
						res['json_arr'] = json_arr
					}
					break
				default:
					res = e.detail
					break
			}		



			this.triggerEvent('change',res)
		},
		_bindcolumnchange:function (e) {
			let range = this.data.range,
			keys = this.data.keys,
			col = e.detail.column,
			val = e.detail.value,
			res = keys == false ? {value:range[col][val]} : range[col][val]
			// console.log(res);
			this.triggerEvent('columnchange',{position:e.detail,...res})
		},

		_Ready:function () {
			//key
			let key = this.data.key,
			range = this.data.range,
			mode = this.data.mode
			//多列selector
			if (mode == 'multiSelector') {
				let keys = this.data.keys
				// console.log(keys);
				if(keys == false){
					//没有的话直接安数组处理
					this.setData({
						_range:range
					})
					return false
				}

				// //json输出数组到_range
				let _multi_range = []

				//k:第几行
				Object.keys(range).forEach(k=>{
					//v为每列的数组
					var _some_range = range[k].map(v=>{
						return v[keys[k]]
					})
					_multi_range.push(_some_range)
				})
				// console.log(_multi_range);
				this.setData({
					_range:_multi_range
				})
				return 
			}
			
			//普通selector
			if(!key){
				//没有的话直接安数组处理
				this.setData({
					_range:range
				})
				return false
			}
			//安json处理, 不过时间起码慢两三倍
			//传入的json
			//衍生json
			let _json = {},
			//页面渲染的range

			_range = [...range.map(v=>v[key])]
			this.setData({
				_range
			})


			// return new Promise((resolve,reject)=>{
			// 	resolve()
			// })
		}

	}
})