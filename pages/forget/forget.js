const util = require('../../utils/util')
const check = require('../../utils/check')
Page({
	data:{
		wait:0,
		timer:false,
		phone:'',
		code:'',
		canIreset:false,
		canIsubmit:false,
		password:'',
		repassword:''
	},
	submit:function () {
		let that = this,
		phone = this.data.phone,
		captcha = this.data.code
		if (!phone) {
			that.selectComponent('#toast')._timer("请输入手机号")
			return false
		}
		if (!captcha) {
			that.selectComponent('#toast')._timer("请输入验证码")
			return false
		}
		if (!check.checkPhone(this.data.phone)) {
			that.selectComponent('#toast')._timer("手机号不正确")
			return false
		}

		util.checkCaptcha({phone,captcha},function (res,bool) {
			if (bool) {
				//成功
				that.setData({
					canIreset:true
				})
			}else{
				that.selectComponent('#toast')._timer("验证码错误")
			}
		})
	},
	sendCode:function () {
		var that = this
		//等待时禁止操作

		if (this.data.wait > 0) {
			// that.selectComponent('#toast')._timer("请输入手机号")
			return false
		}  
		if (!this.data.phone) {
			that.selectComponent('#toast')._timer("请输入手机号")
			return false
		}
		if (!check.checkPhone(this.data.phone)) {
			that.selectComponent('#toast')._timer("手机号不正确")
			return false
		}
		util.personRegisterCaptcha({
			phone: that.data.phone,
			action: "reset"
		},function (res) {
			that.selectComponent('#toast')._timer("发送成功")
		})
		this.setData({
			wait:10,
		})
		that.data.timer = setInterval(function () {
			that.setData({
				wait:that.data.wait-1
			})
			if (that.data.wait <= 0) {
				clearInterval(that.data.timer)
			}
		},1000)
	},
	phoneInput:function (e) {
		this.setData({phone:e.detail.value})
	},
	phoneCode:function (e) {
		this.setData({code:e.detail.value})
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
		phone = this.data.phone,
		password = this.data.password
		if (!this.data.canIsubmit) {
			that.selectComponent('#toast')._timer("两次密码不一致")
			return false
		}
		util.resetPassword({phone,password},function (res) {
			if (res.status === 0) {
				that.selectComponent('#toast')._timer("密码更改成功")
				setTimeout(function () {
					wx.navigateBack({
						delta:999
					})
				},1000)
				
			}else{
				that.selectComponent('#toast')._timer("密码修改超时")
				that.setData({
					canIreset:false
				})
			}
			
		})
	}
})