const fs = require('fs')

const path = require('path')

// const data = fs.readFileSync(filePath, 'utf-8')

// console.info(data.split('\n').length - 1)
// console.info(data.toString().split('\n').length - 1)
// fs.readFile(filePath, 'utf-8', (err, data) => {
//   if (err) {
// return console.error(err)
//   }
//   console.log(data)
// })

module.exports = function (dirPath, extname, callback) {
  fs.readdir(dirPath, (err, list) => {
    if (err) {
      return callback(err)
    }
    const result = list.filter((item) =>
      path.extname(item) === `.${extname}`
    )
    callback(null, result)
  })
}
