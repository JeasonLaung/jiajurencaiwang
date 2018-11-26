// 数据绑定机制(直接绑定在主页面上)
const util = require('../../../utils/util')
const cookie = require('../../../utils/cookie')
const bindMePage = (obj,data) =>{
	//onload
	obj.meOnLoad = function () {
		util.loadCurrent(false,function (res) {
			obj.setData({
				'me.img':util.host+res.data.base_logo,
				'me.name':res.data.base_name
			})
			// console.log(res);
		})
		util.loadMyAccount(false,function (res) {
			let {
				perfect_resume_id,
				growth_value,
				resume_progress,
				score
			} = res.data
			obj.setData({
				'me.lv':perfect_resume_id,
				'me.point':growth_value,
				'me.pool':Math.floor((100/resume_progress)*growth_value),
				'me.percent':resume_progress,
				'me.score':score
			})
		})
	}


	//退出
	obj.logout = function () {
		cookie.clearCookie()
		wx.reLaunch({
			url:'/pages/index/index'
		})
	}


	// // methods 方法
	// //e.g
	// obj.methodaaa = function () {
	// 	console.log(123);
	// }


	// // data 数据绑定
	// //e.g
	// obj.setData({
	// 	abcde:123
	// })
	

}
module.exports.bindMePage = bindMePage