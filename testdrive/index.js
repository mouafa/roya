var fs = require('fs')
const path = require('path')
/* npm */
var fs = require('fs')
var PNG = require('pngjs').PNG
/* lib */
const roya = require('../')

diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_default.png')
diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_higher_threshold.png', { threshold: 0.5 })
diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_yellow.png', { highlightColor: [255, 255, 0] })
diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_solid.png', { highlightFade: false })
diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_transparent.png', { transparent: true, highlightFade: false })
diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_overlapse.png', { overlapse: true, transparent: true })

diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_method_rgb.png', { method: 'rgb', highlightFade: false })
diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_method_rgbTuned.png', { method: 'rgbTuned', highlightFade: false })
diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_method_yiq.png', { method: 'yiq', highlightFade: false })
diff('./fixture/img1.png', './fixture/img2.png', './fixture/diff_method_yiqTuned.png', { method: 'yiqTuned', highlightFade: false })

function diff(inputImg1, inputImg2, outputImg, options = {}) {
  var img1 = fs
    .createReadStream(inputImg1)
    .pipe(new PNG())
    .on('parsed', doneReading)

  var img2 = fs
    .createReadStream(inputImg2)
    .pipe(new PNG())
    .on('parsed', doneReading)

  let done = 0
  function doneReading() {
    done++
    if (done < 2) return
    console.time(`diffing ${outputImg} took`)
    const out = roya(img1.data, img2.data, options)
    console.timeEnd(`diffing ${outputImg} took`)

    // console.log('out', out)

    const img = new PNG({
      width: img1.width,
      height: img1.height
    })
    img.data = out.data

    img
      .pack()
      .pipe(fs.createWriteStream(outputImg))
      .on('finish', () => console.log(`${outputImg} done`))
  }
}
