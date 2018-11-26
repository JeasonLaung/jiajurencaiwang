const cookie = require('cookie.js')
const upload = (opts = {}) => {
	let {
		url,
		formData,
		success,
		fail,
		name
	} = opts
	
	return new Promise((resolve,reject) =>{
		wx.chooseImage({
			success (res) {
				wx.showLoading({
					title:'上传中...'
				})
				const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
					url: url, 
					header:{
						"Content-Type":'multipart/form-data',
						"Cookie":cookie.getCookie('session') ? cookie.getCookie('session') : ''
					},
					filePath: tempFilePaths[0],
					name: name?name:'file',
					formData: {
						...formData
					},
					success (res){
						wx.hideLoading()
						resolve(res)
					},
					fail(res){
						wx.hideLoading()
						reject(res)
					}
				})
			},
			fail () {
				wx.hideLoading()
			}
		})
	})
}

// https://m.v2.51renc.com/api/v2/company/upload_user_avatar
const uploadFace = () =>{
	return upload({
		url:'https://m.v2.51renc.com/api/v2/company/upload_user_avatar',
		formData:{field:'logo'}
	})
}
const uploadCompanyFace = () =>{
	let url = "https://m.v2.51renc.com/api/v2/company/company_upload"
	return upload({
		url,
		formData:{field:'logo'}
	})
}
const uploadHrFace = () =>{
	let url = "https://m.v2.51renc.com/api/v2/company/company_upload"
	return upload({
		url,
		formData:{field:'hr'}
	})
}
const uploadProject = ()=>{
	return upload({
		url:'https://m.v2.51renc.com/api/v2/company/upload_ku_surface',
		formData:{qiniu_key:'ku_surface'},
		name:'pic'
	})
}
module.exports = {
	uploadHrFace,
	uploadCompanyFace,
	uploadFace,
	uploadProject
}