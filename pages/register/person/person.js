// const util = require('/utils/util')
const moment = require('../../../utils/moment.js')
const util = require('../../../utils/util')
const check = require('../../../utils/check')
const dict = {
	"birth_year":"出生日期",
	"age":"出生日期",
	"birth_month":"出生日期",
	"degree":"学历",
	"email":"邮箱",
	"experience":"工作经验",
	"gender":"性别",
	"logo":"头像",
	"name":"姓名",
	"_school_id":"学校",
	"_school_name":"学校",
	"_school_major_id":"届数及专业",
	"career":"期待岗位",
	"city":"工作地点",
	"salary":"期待薪酬",
	'undefined':"内容",
	"ability":"起码选择一个标签，",
	"phone":"手机号",
	"captcha":"验证码",
	"password":"密码",
	// "invitation_code":"邀请码"
}
				// captcha:'',
				// password:'',
				// invitation_code:''
Page({
	data: {
		registerSuccess:false,
		host:util.host,
		currentTab:0,
		loadArr:[0,0,0,0,0],
		endDate:'',
		sex:'',

		form:{
			info:{
				//基础信息
				logo:'',
				name:'',
				gender:'',
				age:'',
				birth_month:'',
				birth_year:'',
				degree:'',
				experience:'',
				email:''			
			},
			college:{
				_school_id:'',//"128"
				_school_major_id:'',//183
				_school_name:'',//湖南工程职业技术学院,
				major:'',
				_province:'',
				_city:''
			},
			position:{
				career:'',//设计师助理
				city:'',//梧州
				salary:''//0k-3k

			},
			ability:{
				// label_ids
				ability:false
				// custom:[]
			},
			phone:{
				//直接post
				phone:'',
				captcha:'',
				password:'',
				// invitation_code:''

			}
		},
		//tabBar
		tabBarArr:[{title:"基本信息",icon:"resume"},{title:"院校绑定",icon:"college"},{title:"期待工作",icon:"experience"},{title:"个人能力",icon:"ability"},{title:"绑定手机",icon:"phone"}],

		//信息页
		sexArr:['男','女'],
		experienceArr:['应届毕业生','一年以内','1-3年','3-5年','5-10年'],
		degreeArr:['大专','本科','硕士','博士','其他'],
		
		//院校页
		collegeProvinceArr:[],
		collegeCityArr:[],
		collegeArr:[],
		allschool:[],
		tempIndex:[0,0,0],
		schoolYearArr:[],
		schoolYear:'',
		majorArr:'',
		majorIdArr:'',
		major:'',

		//岗位页
		jobTypeArr:[],
		salaryArr:['0-3k','3k-6k','6k-10k','10k-15k','15k-20k'],
		positionProvinceArr:[],
		positionProvinceIdArr:[],
		positionCityArr:[],

		//能力页
		labelArr:[],
		label:[],
		myLabel:[],

		//验证码也
		codeTime:0,
		codeTimer:0,
		codeTip:'获取短信验证码',
		repassword:''

	},
	onLoad:function (opts) {
		this.setData({
			endDate:new Date().subYear(18).format('yyyy-MM-dd')
		})



		//需要删除
		// this.onLoadCollege()
		// this.onLoadPosition()
		// this.onLoadAbility()
	},

	//tabBar分发(减轻页面数据负担)
	onPageChange:function (e) {

		var that = this;
		if (e.type == "change") {
			that.setData({
				currentTab: e.detail.current
			}); 
		}else if(e.type == "tap"){
			if (e.currentTarget.dataset.index < that.data.currentTab) {
				that.setData({
					currentTab:e.currentTarget.dataset.index
				}); 
			}else{
				return false
			}
			
		}
		
		switch(this.data.currentTab){
			case 1:
				// console.log(123);
				this.onLoadCollege()
				break
			case 2:
				this.onLoadPosition()
				break
			case 3:
				this.onLoadAbility()
				break
			case 4:
				break
			default:
				break
		}
	},
	onRepasswordInput:function (e) {
		let repassword=e.detail.value
		this.setData({repassword})
	},

	/*
	 *
	 * 手机验证页
	 *
	 */
	getCode:function () {
		var that = this
		if (that.data.codeTime > 0) {
			return false
		}else{
			//点击
			// if(!that.data.form.phone.phone){
			// 	that.selectComponent('#toast')._timer('请输入手机号')
			// 	return false
			// }else if(!this.checkPhone()){
			// 	that.selectComponent('#toast')._timer('手机号错误')
			// 	return false
			// }
			let invitation_code = getApp().globalData.invitation_code
			if(invitation_code){that.setData({'form.phone.invitation_code':invitation_code})}
			that.setData({codeTime:60})
			util.personRegisterCaptcha({phone:that.data.form.phone.phone},function () {
				
			})
			that.selectComponent('#toast')._timer('发送成功')
		}

		that.data.codeTimer = setInterval(function () {
			if (that.data.codeTime <= 0) {
				clearInterval(that.data.codeTimer);
				that.setData({codeTip:'重新获取验证码'})
			}else{
				that.setData({codeTime:--that.data.codeTime})
			}
		}, 1000);
	},



	/*
	 *
	 * 个人能力
	 *
	 */
	onLoadAbility:function () {
	 	var that = this
	 	if (this.data.loadArr[3]) {return false}
	 	this.setData({loadArr:[1,1,1,1,0]})
	 	util.loadPersonLabel(false,function (res) {
	 		that.setData({
	 			labelArr:res.data
	 		})
	 	})
	 },
	 chooseTag:function (e) {
	 	var that = this
		let id = e.currentTarget.dataset.id
		var label = this.data.label
		if (label.length >= 5 && label.indexOf(id) == -1) {
		  //最多5个标签
		  that.selectComponent('#toast')._timer("最多选5个特长，可以新建哦！")
		  return false 
		}
		if (label.indexOf(id) == -1) {
		  //不存在就添加
		  label.push(id)
		}else{
		  //存在就删除
		  label.splice(label.indexOf(id),1)
		}
		that.setData({
		  label:label,
		  'form.ability.ability':label==false?false:label
		})
	 },
	 addTag:function (e) {
	 	var that =this
	 	if (!e.detail) {that.selectComponent('#toast')._timer('不能为空哦!');return false}
	 	// console.log(e.detail);return false
	 	var params = {label_type: 1, label_name: e.detail, level: 2, parent_id: 0}
	 	var myLabel = that.data.myLabel
	 	var label = that.data.label
	 	util.addTag(params,function (res) {
	 		if (res.status ===0 ){
	 			myLabel.push({label_name:e.detail,id:res.data})
	 			label.push(res.data)
	 			that.setData({
	 				myLabel,
	 				label,
	 				'form.ability.ability':label==false?false:label
	 			})
	 			that.selectComponent('#toast')._timer('添加成功')
	 		}else{
	 			that.selectComponent('#toast')._timer('添加失败')
	 		}
	 	})
	 	
	 },
	  delTag:function (e) {
	 	var that =this
	 	var id = e.currentTarget.dataset.id
	 	var myLabel = this.data.myLabel
	 	var label = this.data.label
	 	// console.log(e.detail);return false
	 	var params = {id}
	 	util.delTag(params,function (res) {
	 		if (res.status === 0) {
	 			Object.keys(myLabel).forEach(k=>{
	 				myLabel[k].id == id ? myLabel.splice(k,1) : false
	 			}) 
	 			Object.keys(label).forEach(k=>{
	 				label[k] == id ? label.splice(k,1)  : false
	 			}) 
	 			that.setData({myLabel,label,'form.ability.ability':label==false?false:label})
	 			that.selectComponent("#toast")._timer("删除成功")
		 	}else{
		 		that.selectComponent("#toast")._timer("删除失败")
		 	}
	 	})
	 },
	 prompt:function () {
	 	var that = this
	 	that.selectComponent('#prompt').prompt({
	 		title:'添加标签',
	 		confirm:'添加'
	 	})
	 },

	/*
	 *
	 * 工作
	 *
	 */
	 onLoadPosition:function () {
	 	var that = this
	 	if (this.data.loadArr[2]) {return false}
	 	this.setData({loadArr:[1,1,1,0,0]})
	 	util.loadJobType(false,function (res) {
	 		if (res.status === 0 ) {
	 			let jobTypeArr = res.data !=false ? [...res.data.map(v=>{return v.job_name})] : ['暂无']
	 			that.setData({jobTypeArr})
	 		}else{
	 			that.setData({jobTypeArr:['暂无']})
	 		}
	 	})
	 	util.loadProvince(false,function (res) {
	 		if (res.status === 0 ) {
	 			let positionProvinceArr = res.data !=false ? [...res.data.map(v=>{return v.short_name})] : ['暂无']
	 			let positionProvinceIdArr = res.data !=false ? [...res.data.map(v=>{return v.id})] : ['暂无']
	 			util.loadCity({province_id:positionProvinceIdArr[0]},function (res) {
	 				let positionCityArr
	 				if (res.status === 0) {
	 					positionCityArr = res.data != false ? [...res.data.map(v=>{return v.short_name})] : ['暂无']
	 				}else{
	 					positionCityArr = ['暂无']
	 				}
	 				that.setData({positionProvinceArr,positionProvinceIdArr,positionCityArr})
	 				
	 			})
	 			
	 		}else{
	 			that.setData({positionProvinceArr:['暂无']})
	 		}
	 	})
	 },
	 onProvinceChange:function (e) {
	 	var that = this
	 	util.loadCity({province_id:this.data.positionProvinceIdArr[e.detail.value]},function (res) {
	 		if (res.status === 0 ) {
	 			let positionCityArr = res.data !=false ? [...res.data.map(v=>{return v.short_name})] : ['暂无']
	 			that.setData({positionCityArr})
	 		}else{
	 			that.setData({positionCityArr:['暂无']})
	 		}
	 	})
	 },
	 onCityChange:function (e) {
	 	// console.log(e.detail.value);
	 	let value = e.detail.value[1] != null ? e.detail.value[1] : 0
	 	// console.log(value);
	 	let city = this.data.positionCityArr[value]
	 	this.setData({'form.position.city':city})	
	 },








	/**
	  *	学校
	  *
	*/


	onCollegeColumnChange:function (e) {
		// var all = this.data.allschool
		// var cpa = this.data.collegeProvinceArr
		// var cca = this.data.collegeCityArr
		var tempIndex = this.data.tempIndex
		// console.log(e);
		tempIndex[e.detail.column] = e.detail.value
		this.setData({
			tempIndex
		})
		switch(e.detail.column){
			case 0:
			//更改省
				// console.log(this.data.allschool[Object.keys(this.data.allschool)[e.detail.value]]);
				var collegeCityArr = Object.keys(this.data.allschool[Object.keys(this.data.allschool)[e.detail.value]])
				// console.log(collegeCityArr);
				this.setData({collegeCityArr})
				break
			case 1:
			//更改市
				//现在现在的省
				let pros = this.data.collegeProvinceArr,
				pro = pros[tempIndex[0]],
				citys = this.data.collegeCityArr,
				city = citys[tempIndex[1]]
				let collegeArr = []
				this.data.allschool[pro][city].forEach(v=>{
					collegeArr.push(v.school_name)
				})
				// let collegeCityArr = this.data.allschool[Object.keys(Object.keys(this.data.allschool)[tempIndex[0]])[tempIndex[1]]]
				// let collegeArr = all[Object.keys(cpa)[tempIndex[1]]][Object.keys(cca)[tempIndex[2]]]
				this.setData({
					collegeArr
				})
		}
	},
	onLoadCollege:function () {
		var that = this
		if (this.data.loadArr[1]) { return false}
		this.setData({'loadArr':[1,1,0,0]})
		//if
		util.loadAllSchool(false,function (res) {
			let allschool = res.data,
			collegeProvinceArr = Object.keys(allschool),
			collegeCityArr = Object.keys(allschool[collegeProvinceArr[0]]),
			collegeArr = []
			allschool[collegeProvinceArr[0]][collegeCityArr[0]].forEach(v=>{collegeArr.push(v.school_name) })
			
			that.setData({
				collegeProvinceArr,
				collegeCityArr,
				collegeArr,
				allschool
			})
		})
	},
	onCollegeChange:function (e) {
		this.setData({majorArr:[],majorIdArr:[],schoolYearArr:[],schoolYear:'','form.college._school_major_id':'','form.college.major':''})
		let that = this,
		arr = this.data.tempIndex,
		pro = this.data.collegeProvinceArr[arr[0]],
		city = this.data.collegeCityArr[arr[1]],
		school = this.data.allschool[pro][city][arr[2]],
		school_name = school.school_name,
		school_id = school.school_id

		this.setData({
			'form.college._school_name':school_name,
			'form.college._school_id':school_id,
			'form.college._province':pro,
			'form.college._city':city,
			'schoolYear':''
		})
		//选择成功显示届数
		util.loadSchoolYear({school_id},function (res) {
			//成功
			if (res.status === 0) {
				res.data != false ? that.setData({schoolYearArr:res.data}) : that.setData({schoolYearArr:['暂无']})
			}else{
				that.setData({schoolYearArr:['']})
			}
		})
	},
	loadMajor:function (res) {
		var that = this 
		that.setData({'form.college.major':'','form.college._school_major_id':''})
		util.loadMajor({year:that.data.schoolYear,school_id:that.data.form.college._school_id},function (res) {
			if (res.status === 0) {
				//成功
				let majorArr = [...res.data.map(v=>{return v.name})],
				majorIdArr = [...res.data.map(v=>{return v.id})]

				that.setData({majorArr,majorIdArr})
			}else{
				that.setData({majorArr:[''],majorIdArr:['']})
			}
		})
	},
	onMajorChange:function (e) {
		this.setData({
			'form.college._school_major_id':this.data.majorIdArr[e.detail.value],
			'form.college.major':this.data.majorArr[e.detail.value]
		})
		
	},



	onChange:function(e) {
		var that = this,
		data = that.data,
		to = e.currentTarget.dataset.to,
		from = e.currentTarget.dataset.from,
		value = e.detail.value == '暂无' ? '' : e.detail.value,
		after = e.currentTarget.dataset.after
		// console.log(after);

		that.setData({
			[to.split('.').length == 1 ? to : 'form.'+to]: !from ? value : that.data[from][value]
		});
		after ? this[after]() : false
	},
	onBirthChange:function (e) {
		var that = this,
		date = new Date(e.detail.value),
		birth_year = date.getFullYear(),
		birth_month = date.getMonth()

		that.setData({
			birth:e.detail.value,
			'form.info.birth_year':birth_year,
			'form.info.birth_month':birth_month+1,
			'form.info.age':new Date().getFullYear() - birth_year
		})
	},
	onSexChange:function (e) {
		var tell_me = ["male",'female']
		this.setData({
			'form.info.gender':tell_me[e.detail.value],
			sex:this.data.sexArr[e.detail.value]
		})
		
	},
	onInput:function (e) {
		//指针,指向相对应的data数据
		var to = 'form.' + e.currentTarget.dataset.to
		this.setData({
			[to]:e.detail.value
		})
	},
	upload:function () {
		var that = this
		util.uploadFace().then(function(res) {
			if (JSON.parse(res.data).status == 0) {
				that.setData({
					'form.info.logo':JSON.parse(res.data).data.filename
				})
			}else{
				that.selectComponent("#toast")._timer('上传图片失败！')
			}
			
		}).catch(function () {
			that.selectComponent("#toast")._timer('上传图片失败！')
		})
	},



	nextStep:function () {
		let steps = ['info','college','position','ability','phone']
		//检查相关的step表单是否填写完毕
		//看看收否为空，不然会抛出空的key
		let nonekey = check.throwNone(this.data.form[steps[this.data.currentTab]])
		//各种验证
		
		var tab = this.data.currentTab

		// if(!this.checkEmail()){return false}//邮箱验证
		// if(!this.checkPassword()){return false}//密码验证
		// if(!this.checkPhone()){return false}//手机验证

		if (!nonekey) {
			//需要开
			// 第一暂
			switch(tab){
				case 0:
					if(!this.checkEmail()){return false}
					break
				case 4:
					let form = this.data.form
					// if (check.check(info)) {}
					//检查全部数据完整性
					// for(var i in form){
					// 	if(check.throwNone(form[i])){
					// 		this.selectComponent("#toast")._timer(check.throwNone(form[i])+"不能为空")
					// 		return false
					// 	}
					// }
					if(!this.checkPassword()){
						this.selectComponent("#toast")._timer("确认密码与密码不匹配")
						return false
					}
					if(!this.checkPhone()){
						this.selectComponent("#toast")._timer("手机号错误")
						return false
					}
					// if(!this.data.registerSuccess){
					// 	this.selectComponent("#toast")._timer("验证码不正确")
					// 	return false
					// }

					//验证码验证后操作
					var that = this
					that.checkCaptcha(function (res) {
						//成功
						that.setData({
							currentTab:++that.data.currentTab
						})
						util.Register(that.data.form)
						//注册成功
						wx.setStorageSync('personRegister',that.data.form)

					},function () {
						//失败
						that.selectComponent("#toast")._timer("验证码错误")
					})
					return false


					break
			}
			//填写完整
			this.setData({
				currentTab:++this.data.currentTab
			})
			this.onPageChange()
		}else{
			//填写不完整，对key进行命名，toast弹出就错误
			this.selectComponent("#toast")._timer(dict[nonekey]+"不能为空")
			return
		}
		
	},
	checkEmail:function () {
		if (!check.checkEmail(this.data.form.info.email)) {
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
	checkPhone:function () {
		return /^1[0-9]{10}/.test(this.data.form.phone.phone)
	},
	checkCaptcha:function (callback,fail) {
		var that = this
		util.personRegisterAction(that.data.form.phone,function (res) {
			if (res.status ===0) {
				//成功
				getApp().globalData.userId = res.data.id
				that.setData({
					//注册成功
					registerSuccess:true
				})
				callback(res)
			}else{
				fail?fail():false
			}
		})
	},





// // tab切换开始
//	 swiperTab: function (e) {
//		 var that = this;
//		 that.setData({
//			 currentTab: e.detail.current
//		 });
//	 },
//	 clickTab: function (e) {
//		 var that = this;
//		 if (this.data.currentTab === e.target.dataset.current) {
//			 return false;
//		 } else {
//			 that.setData({
//				 currentTab: e.target.dataset.current
//			 })
//		 }
//	 },
//	 goto:function () {
//	 	var that = this
//	 	var id = Number(that.data.id)+1
//	 	wx.navigateTo({
//	 		url:'./person?id='+id
//	 	})
//	 }
// tab切换结束

})