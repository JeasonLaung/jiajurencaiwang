const cookie = require('./cookie')
const tool = require('./tool')
/**
 * 判断请求状态是否成功
 * 参数：http状态码
 * 返回值：[Boolen]
 */
const isHttpSuccess = status => {
  return status >= 200 && status < 300 || status === 304;
}

const requests = (options = {}) =>{
	let {
		url,
		data,
		header,
		method,
		dataType,
		responseType,
		success,
		fail,
		complete,
		login
	} = options;

	if (cookie.getCookie('session')) {// 获取内存session
		header = {
			...header,
			"Cookie": cookie.getCookie('session')
		}
	}
	return new Promise((resolve,reject) => {
		wx.request({
			url,
			data,
			method,
			header,
			dataType,
			responseType,
			success(res){
				const isSuccess = isHttpSuccess(r.statusCode)
					if (isSuccess) {  // 成功的请求状态
						if (login) { // 是否为网站登录的请求
							//此处自定义
							if (res.data.status == 0) {// 登录成功
								var deadtime = tool.toJson(res.header['Set-Cookie'],';')['Max-Age']
								var session = tool.toJson(res.header['Set-Cookie'],';')['KID']
								cookie.setCookie('session','KID='+session,deadtime)
							}
						}

						resolve(res.data) //返回结果
						
					} else {
						reject({
							msg: `网络错误:${res.statusCode}`,
							detail: res
						});
					}
			},
			fail(error){
				reject(error)
			},
			complete
		})
	})
}