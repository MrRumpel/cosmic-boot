const { argv } = process
const method = argv[3] ? argv[3] : 'GET'
const url = argv[3] ? argv[3] : argv[2]
const tls = require('tls')
const socket = tls.connect({ host: url.split('/')[2], port: 443 })
socket.write(`${method} ${url} HTTP/1.1\r\ncontent-length:1\r\n`)
const start = Date.now()
const timer = setInterval(() => {
  const sec = Math.round((Date.now() - start) / 1000)
  console.info(`Test in process: ${sec}s`)
  if (sec > 10) {
    console.info('result: Slow HTTP headers vulnerability')
    // socket.write('1\r\n')
    // clearInterval(timer)
  }
}, 1000)
socket.on('end', () => {
  const sec = Math.round((Date.now() - start) / 1000)
  console.log(sec)
  if (sec < 11) console.info('result: fixed Slow HTTP headers vulnerability')

})
