const check = (o,r) => {
	return typeof o == 'object' ?  checkArr(o) : o
	function checkArr(o) {
		for(var i in o){
			if(o[i] === false || o[i] === null || o[i] === undefined || o[i] === ""){
				return r ? i : false
			}
		}
		return true
  }
}
//抛出key
const throwNone = o =>{
	if (!o) {return true}
	let res = check(o,true)
	return  res === true ? false : res
}

const checkEmail = s =>{
	return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(s)
}

const checkPhone = s =>{
	return /^1[0-9]{10}$/.test(s)
}

module.exports = {
  check,
  throwNone,
  checkEmail,
  checkPhone
}