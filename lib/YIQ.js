const transform = require('./matrice')
const { threshold, toPrime, fromPrime } = require('./util')

function rgb2yiq(RGB) {
  const matrix = [[0.29889531, 0.58662247, 0.11448223], [0.59597799, -0.2741761, -0.32180189], [0.21147017, -0.52261711, 0.31114694]]
  // const matrix = [[0.299, 0.587, 0.114], [0.596, -0.274, -0.322], [0.211, 0.523, 0.312]]
  const RGBp = RGB.map(toPrime)
  const YIQ = transform(matrix, RGBp)
  // const Y = R * 0.29889531 + G * 0.58662247 + B * 0.11448223
  // const I = R * 0.59597799 - G * 0.2741761 - B * 0.32180189
  // const Q = R * 0.21147017 - G * 0.52261711 + B * 0.31114694

  return YIQ.map(threshold)
}

function yiq2rgb([Y, I, Q] = []) {
  const matrix = [[1, 0.956, 0.621], [1, -0.272, -0.647], [1, -1.106, 1.703]]
  // matrix = [[1, 0.95608445, 0.6208885], [1, -0.27137664, -0.6486059], [1, -1.10561724, 1.70250126]]
  return transform(matrix, [Y, I, Q])
    .map(threshold)
    .map(fromPrime)
    .map(i => Math.max(Math.round(i), 0))
    .map(Math.trunc)
}

function yiqDistance([Y1, I1, Q1], [Y2, I2, Q2]) {
  const deltaSum = (Y2 - Y1) ** 2 + (I2 - I1) ** 2 + (Q2 - Q1) ** 2
  return threshold(Math.sqrt(deltaSum))
}

function yiqDistanceTuned([Y1, I1, Q1], [Y2, I2, Q2]) {
  const deltaSum = 0.5053 * (Y2 - Y1) ** 2 + 0.299 * (I2 - I1) ** 2 + 0.1957 * (Q2 - Q1) ** 2
  return Math.sqrt(deltaSum)
}

// function yiqDistanceFixedPoint([Y1, I1, Q1], [Y2, I2, Q2]) {
//   const trunkY = Y => Math.trunc(Y * 255)
//   const trunkIQ = IQ => Math.min(Math.max(Math.trunc(IQ * 256 + 128), 0), 255)
//   const E = 129 * (trunkY(Y2) - trunkY(Y1)) ** 2 + 76 * (trunkIQ(I2) - trunkIQ(I1)) ** 2 + 50 * (trunkIQ(I2) - trunkIQ(I1)) ** 2
//   return E >> 8
// }

function rgb2yiqDistance(RGB1, RGB2) {
  const YIQ1 = rgb2yiq(RGB1)
  const YIQ2 = rgb2yiq(RGB2)
  return yiqDistance(YIQ1, YIQ2)
}

function rgb2yiqDistanceTuned(RGB1, RGB2) {
  const YIQ1 = rgb2yiq(RGB1)
  const YIQ2 = rgb2yiq(RGB2)
  return yiqDistanceTuned(YIQ1, YIQ2)
}

module.exports = {
  rgb2yiq,
  yiq2rgb,
  yiqDistance,
  yiqDistanceTuned,
  rgb2yiqDistance,
  rgb2yiqDistanceTuned
}
