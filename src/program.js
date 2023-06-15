const http = require('http')
const { argv } = process

// 处理响应的回调函数
var callback = function (response) {
  // 不断更新数据
  // var body = ''
  response.setEncoding('utf8').on('data', function (data) {
    // body += data
    console.log(data)
  })

  // response.on('end', function () {
  //   // 数据接收完成
  //   console.log(body)
  // })
}
// 向服务端发送请求
var req = http.request(argv[2], callback)
req.end()
