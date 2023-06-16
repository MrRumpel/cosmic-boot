const https = require('node:https')
const { argv } = process
const url = argv[3] ? argv[3] : argv[2]
const testList = [
  '/test/path/base',
  '%2e%2e%2f',
  '%2e%2e/',
  '..%2f',
  '%2e%2e%5c',
  '..%5c',
  '%252e%252e%255c',
  '..%255c',
  '..%c0%af',
  '..%c1%9c'
]
testList.forEach((item) => {
  const req = https.request(url + item, (res) => {
    if (res.statusCode === 404) {
      console.info('result: fixed Path Base vulnerability ' + url + item)
    } else {
      console.info('result: Path Base vulnerability ' + url + item)
    }
  })
  req.on('error', (e) => {
    console.error(e.message)
  })
  req.end()
})
