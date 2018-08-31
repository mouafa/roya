const path = require('path')
/* npm */
var fs = require('fs')
var PNG = require('pngjs').PNG
/* lib */
const convert = require('../lib/ntsc')

const resolve = file => path.resolve(__dirname, `../img.ignore/${file}`)

var img = fs
  .createReadStream(resolve('_in.png'))
  .pipe(new PNG())
  .on('parsed', doneReading)

function doneReading() {
  // console.log('img', img.data.length / 4 / 356)
  const buffer = img.data
  const ouput = Buffer.alloc(buffer.length)
  const length = buffer.length
  let time = 0
  // console.log('input', buffer)
  let out = []

  convert(img.data, [1, 1, 0])

  img
    .pack()
    .pipe(fs.createWriteStream(resolve('_out.png')))
    .on('finish', () => console.log('done'))
}
