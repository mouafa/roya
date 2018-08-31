var fs = require('fs')
const path = require('path')
/* npm */
var fs = require('fs')
var PNG = require('pngjs').PNG
/* lib */
const diff = require('../lib/diff')

const resolve = file => path.resolve(__dirname, `../img.ignore/${file}`)

var img1 = fs
  .createReadStream(resolve('img1.png'))
  .pipe(new PNG())
  .on('parsed', doneReading)

var img2 = fs
  .createReadStream(resolve('img2.png'))
  .pipe(new PNG())
  .on('parsed', doneReading)

let done = 0
function doneReading() {
  done++
  if (done < 2) return
  console.time('diffing')
  const out = diff(img1.data, img2.data)
  console.timeEnd('diffing')

  console.log('out', out)

  const img = new PNG({
    width: img1.width,
    height: img1.height
  })
  img.data = out.data

  img
    .pack()
    .pipe(fs.createWriteStream(resolve('diff.png')))
    .on('finish', () => console.log('done'))
}
