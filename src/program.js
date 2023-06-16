const http = require('http')
const { argv } = process

async function get (url) {
  http.get(url, res => {
    res.setEncoding('utf8')
    let body = ''
    res.on('data', (chunk) => { body += chunk })
    res.on('end', () => console.info(body))
  })
}

get(argv[2]).then(() => get(argv[3]).then(() => get(argv[4])))
