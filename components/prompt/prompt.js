Component({
	properties:{

	},
	data:{
		zindex:false,
		//type='prompt'

		string:'',//输出字符串
		stringLength:'',//字符串字数
		maxLength:15,//最大字符串
		cancel:false,//取消字符串

		//type='alert'
		message:'', // 显示字符串

		prompt:false,//是否显示
		masking:true,//是否显示蒙版
		type:'prompt',//['alert','prompt','confirm']


		confirm:false,//确定文本
		cancel:false//取消文本
	},
	methods:{
		alert:function (options) {
			this.setData({
				...options,
				type:'alert',
				prompt:true
			})
		},
		prompt:function (options) {
			this.setData({
				...options,
				type:'prompt',
				prompt:true
			})
		},
		confirm:function (options) {
			this.setData({
				...options,
				type:'confirm',
				prompt:true
			})
		},
		_prompt:function (options) {
			this.setData({
				...options,
				prompt:true
			})
		},
		_refreshInput:function (e) {
			this.setData({
				string:e.detail.value,
				stringLength:e.detail.value.length
			})
		},
		_yes:function () {
			if (this.data.type == 'prompt') {
				this.triggerEvent('yes',this.data.string)
			}else{
				this.triggerEvent('yes')
			}
			this.setData({
				string:'',
				prompt:false,
				stringLength:0
			})
		},
		_no:function (e) {
			this.setData({
				string:'',
				prompt:false,
				stringLength:0
			})
		},
		_reset:function (e) {
			this.setData({
				string:'',
				stringLength:0
			})
		},
		tell(e){
			console.log(e);
		}
	}
})