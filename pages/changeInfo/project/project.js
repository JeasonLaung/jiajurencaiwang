const util = require("../../../utils/util")
const tool = require("../../../utils/tool")
Page({
	data:{
		project:true,
		// type:'post',//['post展示','add添加','edit编辑']
	},
	refresh:function () {
		var that = this
		util.loadPersonProject(false,function (res) {
			if (res.status === 0) {
				res.data != false ? that.setData({project:res.data}) : that.setData({project:false})
			}
		})
	},
	onLoad:function () {
		var that = this
		// 请输入带有kujiale.com的域名
		that.refresh()
	},
	addProject:function () {
		wx.navigateTo({
			url:'../editProject/editProject'
		})
	},
	delProject:function (e) {
		var that = this
		util.delPersonProject({
			ku_work_id:e.currentTarget.dataset.id
		},function (e) {
			wx.showToast({
				title:'删除成功'
			})
			that.refresh()
		})
	},
	editProject:function (e) {
		// console.log(e);
		// return
		console.log(tool.jsonToUrl(e.currentTarget.dataset.json))

		//需要处理一下等号和问号和and号
		var json = tool.jsonToUrl(tool.encodeUrl(tool.take(e.currentTarget.dataset.json,['id','title','work_url','signedUrl','surface_pic'])))
		wx.navigateTo({
			url:'../editProject/editProject?' + json
		})
	}
})