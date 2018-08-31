const { rgb2yiqDistance } = require('./YIQ')
const { rgbDistance, blend } = require('./RGB')
const log = require('./log')

function diff(img1Buffer, img2Buffer, { threshold = 0.1 } = {}) {
  const out = {
    data: Buffer.from(img1Buffer)
  }

  const length = img1Buffer.length
  const totalPixel = length / 4
  let diffPixels = 0

  for (let i = 0; i < length; i = i + 4) {
    pixel1 = [img1Buffer[i], img1Buffer[i + 1], img1Buffer[i + 2]]
    pixel2 = [img2Buffer[i], img2Buffer[i + 1], img2Buffer[i + 2]]
    const distance = rgbDistance(pixel1, pixel2)

    if (distance > threshold) {
      highlight(out.data, i, distance)
      diffPixels++
    }
  }

  return Object.assign(out, calcDiff(totalPixel, diffPixels))
}

function highlight(data, position, alpha) {
  const red = [255, 0, 0, 255]
  // const vivid = [128, 244, 232, 255]
  red.map((value, i) => {
    data[position + i] = blend(value, alpha, data[position + i])
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
