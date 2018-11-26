const util = require('../../../utils/util')
const check = require('../../../utils/check')
const dict = {
	'logo':'企业图片',
	'name':'企业名称',
	'brief_name':'企业简称',
	'city':'企业城市',
	'province':'企业省份',

}
Page({
	data:{
		tabBarArr:[{title:"基本信息",icon:"resume"},{title:"HR信息",icon:"hr"},{title:"发布岗位",icon:"experience"},{title:"福利待遇",icon:"money"},{title:"绑定手机",icon:"phone"}],
		currentTab:0,
		host:util.host,
		form:{
			info:{
				logo:'',
				name:'',
				brief_name:'',
				province:'',
				city:''

			},
			hr:{

			},
			position:{

			},
			welfare:{

			},
			phone:{

			}
		}
	},
	onPageChange:function (e) {
		this.setData({
			currentTab:e.detail.current
		})
	},
	upload:function () {
		var that= this
		util.uploadCompanyFace().then(function (res) {
						if (JSON.parse(res.data).status == 0) {
				that.setData({
					'form.info.logo':JSON.parse(res.data).data.url
				})
			}else{
				that.selectComponent("#toast")._timer('上传图片失败！')
			}
			
		}).catch(function () {
			that.selectComponent("#toast")._timer('上传图片失败！')
		})
	},
	onCityChange:function (e) {
		let province = e.detail.json_arr[0].name,
		city = e.detail.json_arr[1].name
		this.setData({
			'form.info.province':province,
			'form.info.city':city	
		})
	},
	onInput:function (e) {
		//指针,指向相对应的data数据
		var to = 'form.' + e.currentTarget.dataset.to
		this.setData({
			[to]:e.detail.value
		})
	},
	nextStep:function() {
		let steps = ['info','hr','position','welfare','phone']
		let nonekey = check.throwNone(this.data.form[steps[this.data.currentTab]])
		var tab = this.data.currentTab
		if (!nonekey) {
			switch(tab){
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;

			}

			this.setData({
				currentTab:tab+1
			})
		}else{
			//填写不完整，对key进行命名，toast弹出就错误
			this.selectComponent("#toast")._timer(dict[nonekey]+"不能为空")
			return
		}
	},
	checkEmail:function (e) {
		 // console.log(e);
		if (!check.checkEmail(e.detail.value)) {
			//检查email失败
			this.selectComponent('#toast')._timer("邮箱地址不正确")
			return false
		}
		return true
	},
	checkPassword:function () {
		// console.log(e);
		var that = this
		var repw = this.data.repassword
		var pw = this.data.form.phone.password
		if(repw == ''){return false}
		return pw != repw ? (function () {
			that.selectComponent('#toast')._timer('确认密码与密码不匹配')
			return false
		})() : true  
		
	},
	checkPhone:function (e) {
		var that = this,
		tab = this.data.currentTab
		if (e) {
			//离开判断
			if(!/^1[0-9]{10}/.test(e.detail.value)){
				that.selectComponent('#toast')._timer('手机号码不正确')
				return false
			}
		}else{
			let checkObj
			// 数据判断
			switch(tab){
				case 1:
					//hr
					checkObj = that.form.hr.hr_mobile
					break
				// case 2:
				// 	checkObj = that.form
			}
			//离开判断
			if(!/^1[0-9]{10}/.test(e.detail.value)){
				that.selectComponent('#toast')._timer('手机号码不正确')
				return false
			}
		}
		
		
	},
	checkCaptcha:function (callback,fail) {
		var that = this
		util.personRegisterAction(that.data.form.phone,function (res) {
			if (res.status ===0) {
				//成功
				getApp().globalData.userId = res.data.id
				that.setData({
					registerSuccess:true
				})
				callback(res)
			}else{
				fail?fail():false
			}
		})
	},
})