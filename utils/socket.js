

const onmessage = function (callback) {
	wx.onSocketMessage(function (res) {
		let resp = JSON.parse(res.data.toUtf8())
		callback(resp)
	})
}
module.exports = {
	onmessage
}