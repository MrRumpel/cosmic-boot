const mymodule = require('./mymodule')
const { argv } = process
const dirPath = argv[2]
const extname = argv[3]
function cb (err, result) {
  if (err) { console.error(err) } else { result.map(item => console.info(item)) }
}
mymodule(dirPath, extname, cb)
