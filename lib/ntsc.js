const { rgb2yiq, yiq2rgb } = require('./YIQ')

function convert(buffer, [YCoef, ICoef, QCoef] = [1, 1, 1]) {
  const length = buffer.length

  for (let i = 0; i < length; i = i + 4) {
    // time++

    slice = buffer.slice(i, i + 4)
    const [R, G, B] = slice
    const [Y, I, Q] = rgb2yiq([R, G, B])
    const [r, g, b] = yiq2rgb([Y * YCoef, I * ICoef, Q * QCoef])
    slice[0] = r
    slice[1] = g
    slice[2] = b

    // if (time > 5) break3
  }
  return buffer
}

module.exports = convert
