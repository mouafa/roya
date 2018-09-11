const methods = require('./methods')
const { highlight, blendAlpha } = require('./util')
const log = require('./log')

const defaultOptions = {
  threshold: 0.1,
  highlightFade: true,
  highlightColor: [255, 0, 0],
  transparent: false,
  overlapse: false,
  method: 'rgb'
}

function diff(img1Buffer, img2Buffer, option = {}) {
  option = Object.assign({}, defaultOptions, option)
  const method = methods[option.method] ? methods[option.method] : methods[defaultOptions.method]

  const out = {
    data: Buffer.from(img1Buffer)
  }

  const length = img1Buffer.length
  const totalPixel = length / 4
  let diffPixels = 0

  for (let i = 0; i < length; i = i + 4) {
    pixel1 = [img1Buffer[i], img1Buffer[i + 1], img1Buffer[i + 2]]
    pixel2 = [img2Buffer[i], img2Buffer[i + 1], img2Buffer[i + 2]]
    const distance = method(pixel1, pixel2)

    if (distance > option.threshold) {
      diffPixels++

      if (option.overlapse) {
        replace(out.data, i, pixel2)
      } else {
        const alpha = option.highlightFade ? distance : 1
        // highlight(out.data, i, alpha, option.highlightColor)
        replace(out.data, i, blendAlpha([...option.highlightColor, alpha], pixel1))
      }
    } else {
      if (option.transparent) {
        replace(out.data, i, blendAlpha([...pixel1, 0]))
      }
    }
  }

  return Object.assign(out, calcDiff(totalPixel, diffPixels))
}

function replace(data, position, values) {
  values.forEach((value, i) => {
    data[position + i] = value
  })
}

function calcDiff(totalPixel, diffPixels) {
  // log('calcDiff', totalPixel, diffPixels)

  const missmatch = diffPixels / totalPixel
  const match = 1 - missmatch
  const missmatchAmount = missmatch * 100
  const matchAmount = match * 100

  return { missmatch, match, missmatchAmount, matchAmount }
}

module.exports = diff
