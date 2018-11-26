const util = require('../../../utils/util')
const check = require('../../../utils/check')
Page({
	data:{
		wait:0,
		timer:false,
		phone:'',
		code:'',
		canIreset:false,
		canIsubmit:false,
		password:'',
		repassword:'',
		oldpassword:'',
		username:''
	},
	onLoad:function () {
		var that = this
		util.getUserId(function (id,res) {
			let username = res.username.replace(/^(1[0-9]{2})([0-9]{4})([0-9]{4})/g,function ($1,$2,$3,$4) {
				return $2 + '****' + $4	
			})
			that.setData({
				username
			})
		})
	},
	
	phoneInput:function (e) {
		this.setData({phone:e.detail.value})
	},
	phoneCode:function (e) {
		this.setData({code:e.detail.value})
	},
	oldpasswordInput:function (e) {
		this.setData({oldpassword:e.detail.value})
	},
	repasswordInput:function (e) {
		this.setData({repassword:e.detail.value})
	},
	passwordInput:function (e) {
		this.setData({password:e.detail.value})
	},
	repasswordBlur:function (e) {
		var that = this
		if(this.data.password != this.data.repassword){
			that.selectComponent('#toast')._timer("两次密码不一致")
			this.setData({
				canIsubmit:false
			})
			return false
		}
		this.setData({
			canIsubmit:true
		})
	},
	resetAction:function () {
		var that = this,
		oldpassword = this.data.oldpassword,
		password = this.data.password,
		repassword = this.data.repassword
		if (oldpassword == false) {
			that.selectComponent('#toast')._timer("旧密码不能为空")
			return false
		}
		if (!password) {
			that.selectComponent('#toast')._timer("新密码不能为空")
			return false
		}
		if (password != repassword) {
			that.selectComponent('#toast')._timer("确认密码不一致")
			return false
		}
		util.updatePersonPassword({password:oldpassword,new_password:password},function (res) {
			if (res.status === 0) {
				that.selectComponent('#toast')._timer("密码更改成功")
				setTimeout(function () {
					wx.navigateBack({
						delta:1
					})
				},1000)
				
			}else{
				that.selectComponent('#toast')._timer(res.msg)
			}
			
		})
	}
})