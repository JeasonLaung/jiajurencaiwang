const socket = require("../../utils/socket.js")
const util = require("../../utils/util.js")
Page({
	data:{
		company_id:"",
		host:util.host,
		to_name:'',
		to_username:'',
		to_logo:'',
		history:[],
		own_username:'',
		own_logo:'',
		text:'',
		emojiArr:'',
		showEmoji:false,
		showFastMsg:false,
		scrollTop:'',
		scrollTopNum:99999,
		replyArr:[],
		timesofchange:0,
		onloaded:false,
		scrollAnimation:false
	},
	onLoad:function (options) {
		wx.showLoading({
			title:'加载中'
		})
		// console.log('我进入了chat');
		var that = this
		let company_id = options['id'] ? options['id'] : 286



		that.setData({
			company_id,
			emojiArr:range(1,19)
		})
		// getApp().connectSocket()
		util.getUserId(function (id,data) {
			// console.log('我在获取用户id');
			that.setData({
				own_username:data.username,
				own_logo:data.base_logo
			})
		})
		wx.onSocketMessage(function (res) {
			// console.log('我接受到信息了');
			// console.log(res);
			// wx.showLoading({
			// 	title:'加载中'
			// })
			switch(JSON.parse(res.data)['cmd']){
				case 'getRencentUserlist':
					that.getHistory()
					break;
				case 'getHistory':

					let data = JSON.parse(res.data)
					 wx.setNavigationBarTitle({
						title:data.to_info.name.toUtf8()
					})
					 var picArr = [],
					 picIndex = 0
					data.history.forEach(v=>{
						let content = v['content'].toUtf8().replace(/<div>([\S\s]*?)<\/div>/g,($1,$2)=>$2)
						content = content.replace(/style=['|"](.+?)['|"]/g,"")
						v['content'] = content.replace(/<img src=['|"](.+?)['|"]/g,($1,$2)=>{
							//排除表情
							if (!/static\/face\/(.+?)\.gif/g.test($2)) {
								picArr.push(that.data.host+$2)
								v['picIndex'] = picIndex++
							}
							
							return '<img style="height:auto;width:100%" src="'+that.data.host+$2+'"'
						})
					})
					// console.log(data.history)
					that.setData({
						to_name:data.to_info.name.toUtf8(),
						to_logo:data.to_info.logo,
						picArr,
						
					})
					// console.log(that.data.history.length, data.history.length);
					if (that.data.history.length != data.history.length) {
						that.setData({
							history:data.history,
							scrollTop:that.data.scrollTopNum+100*data.history.length + 'rpx',
						})
					}
					
					
					// console.log('我第'+ ++that.data.timesofchange +'设置了scrollTop');
					
					break
				case 'fromMsg':
					//获取对方信息
					that.setData({
						to_username:JSON.parse(res.data).to_phone
					})
					break

			}
			// wx.hideLoading()

			// if(JSON.parse(res.data)['userlist']){
			// 	that.getHistory()
			// }
			// if(JSON.parse(res.data)['history']){
				// console.log(res.data.toUtf8());
				
			// }
		})
		util.loadPersonReply({hideLoading:true},function (res) {
			// console.log('我在搜索个人快捷句');
			that.setData({
				replyArr:res.status === 0 ? res.data : []
			})
			
		})
	},
	scrollAction:function (e) {
		if (this.data.onloaded) {return false}
		// console.log('我在做运动');
		// console.log(e);
		this.setData({
			onloaded:true,
			scrollTop:this.data.scrollTopNum+100*this.data.history.length + 'rpx',
		})
	},
	openPic:function (e) {
		if(e.currentTarget.dataset.picindex!=-1){
			// console.log(e);
			let index = e.currentTarget.dataset.picindex
			// console.log(this.data.picArr[index]);
			wx.previewImage({
				current:this.data.picArr[index],
				urls:this.data.picArr
			})
		}
	},
	sendPic:function () {
		var that = this
		util.uploadFace().then(function(res) {
			if (JSON.parse(res.data).status == 0) {
				let msg = {to: that.data.company_id, cmd: "message", content:'<img src="'+JSON.parse(res.data).data.filename+'"/>'}
				// console.log(msg);
				getApp().sendMsg(JSON.stringify(msg),function () {
					//发送成功刷新一波history
					that.getHistory()
					that.closeAll()
				})
					
			}else{
				that.selectComponent("#toast")._timer('发送图片失败！')
			}
			
		}).catch(function () {
			that.selectComponent("#toast")._timer('发送图片失败！')
		})
	},
	getHistory:function () {
		var that = this 
		let msg = {"cmd": "getUserHistory", "to": that.data.company_id}
		getApp().sendMsg(JSON.stringify(msg))
	},
	addFastMsgAction:function (e) {
		var that = this
		let params = {
			content:e.detail,
			type:1
		}
		util.addPersonReply(params,function (res) {
			if (res.status === 0) {
				util.loadPersonReply(false,function (res) {
					that.setData({
						replyArr:res.status === 0 ? res.data : []
					})
					that.openFastMsg()
				})
			}
			
			
		})
		
	},
	addFastMsg:function () {
		this.closeAll()
		this.selectComponent("#prompt").prompt({
			title:'添加快捷常用语',
			message:'请输入常用语',
			yes:'添加',
			zindex:10000,
			maxLength:30
		})
	},
	sendFastMsg:function (e) {
		var that = this
		let msg = {to: that.data.company_id, cmd: "message", content:e.currentTarget.dataset.msg}
		getApp().sendMsg(JSON.stringify(msg),function () {
			//发送成功刷新一波history
			that.getHistory()
			that.closeAll()
		})
	},
	sendText:function () {
		var that = this
		if (!that.data.text) {return false}
		let msg = {to: that.data.company_id, cmd: "message", content: that.data.text}
		getApp().sendMsg(JSON.stringify(msg),function () {
			//发送成功刷新一波history
			that.getHistory()
			that.setData({
				text:''
			})
		})
	},

	sendEmoji:function (e) {
		var that = this
		let msg = {to: that.data.company_id, cmd: "message", content: e.currentTarget.dataset.url}
		getApp().sendMsg(msg,function () {
			that.setData({
				showEmoji:false
			})
			//发送成功刷新一波history
			that.getHistory()
		})
	},
	refreshText:function (e) {
		this.setData({
			text:e.detail.value
		})
	},
	openEmoji:function () {
		this.setData({
			showEmoji:true,
			showFastMsg:false
		})
	},
	openFastMsg:function () {
		if (!this.data.showFastMsg) {
			this.setData({
				showFastMsg:true,
				showEmoji:false
			})
		}else{
			this.setData({
				showFastMsg:false
			})
		}
		
	},
	closeAll:function () {
		this.setData({
			showFastMsg:false,
			showEmoji:false
		})
	}
		// getApp().connectSocket()
		// wx.onSocketOpen(function () {
		// 	getApp().sendMsg('{cmd: "getUserHistory", to: "286"}')
		// })
		// socket.onmessage(function (res) {
		// 	// wx.setNavigationBarTitle({
		// 		// title:res.to_info.name
		// 	// })
		// 	console.log(res);
		// 	that.setData({
		// 		// history:res.history
		// 	})
		// })
})


function range() {
	switch(arguments.length){
		case 0:
			return false
			break
		case 1:
			var end = parseInt(arguments[0])
			var arr = []
			for(var i = 0;i < end; i++){
				arr[i] = i
			}
			return arr
			break
		case 2:
			var begin = parseInt(arguments[0])
			var end = parseInt(arguments[1])
			var arr = []
			for(var i = 0;i < end; i++){
				arr[i] = i + begin
			}
			return arr
			break
	}
}