const trimAll = function (str) {
  return str.replace(/\s/g,"")
}
const toJson = (str,s) => {
  var temp = {}
  var arr = str.split(s)
  for(var i in arr){
    temp[trimAll(arr[i].split('=')[0])] = trimAll(arr[i].split('=')[1])
  }
  delete temp[""]
  return temp
}
//坑爹情况一，微信ajax不会自己处理params的数组，要自己解决
const parseUrlParams = (params, delNull = false) => {
  // params -> json
  var urlQuery = ''
  Object.keys(params).forEach(k => {
    switch (typeof params[k]) {
      case 'object'://只能处理数组，对象的话不搞
        if (params[k] == false || params[k] == null) {
          //删除空数组操作，默认空数组还是会直接添加
          if (delNull == false) {
            urlQuery += k + '[]=&'
          }
        } else {
          try {
            params[k].forEach(v => {
              urlQuery += k + '[]=' + v + '&'
            })
          }
          catch (e) {
            // console.error('请不要在参数上带一个json对象')
          }
        }
        break
      case 'string':
      case 'number':
        urlQuery += k + '=' + params[k] + '&'
        break
      default://undefined
        urlQuery += k + '=&'
        break
    }
  })
  return "?" + urlQuery.slice(0, urlQuery.length - 1)
}


const urlToJson = url => {
  let temp = {}
  url.replace(/([^?&]+)=([^?&]+)/g, function(s, v, k) {
      temp[v] = decodeURIComponent(k);
      return k + '=' +  v;
  });
  return temp
}
const jsonToUrl = json => {
  let temp = ''
  Object.keys(json).forEach(k=>{
    temp += k + '=' + json[k] + '&'
  })
  return temp.replace(/.$/,"")
}


const encodeUrl = o =>{
  if (typeof o =='string') {return encodeURIComponent(o)}
  if (typeof o =='number') {return o}
  var temp = {}
  Object.keys(o).forEach(k=>{
    temp[k] = encodeUrl(o[k])
  })
  return temp
}

const decodeUrl = o =>{
  if (typeof o =='string') {return decodeURIComponent(o)}
  if (typeof o =='number') {return o}
  var temp = {}
  Object.keys(o).forEach(k=>{
    temp[k] = decodeUrl(o[k])
  })
  return temp
}
const take = (o,arr) => {
  var temp = {}
  arr.forEach(k=>{
    if (o[k] != undefined) {
      temp[k] = o[k]
    }
  })
  return temp
}
function tounicode(data)
{
   if(data == '') return '请输入汉字';
   var str =''; 
   for(var i=0;i<data.length;i++)
   {
      str+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16);
   }
   return str;
}
function tohanzi(data)
{
    if(data == '') return '请输入十六进制unicode';
    data = data.split('\\u');
    var str ='';
    for(var i=0;i<data.length;i++)
    {
        str+=String.fromCharCode(parseInt(data[i],16).toString(10));
    }
    return str;
}
module.exports = {
  tounicode,
  tohanzi,
  take,
  encodeUrl,
  decodeUrl,
  jsonToUrl,
  urlToJson,
  toJson,
  parseUrlParams
}