function threshold(value) {
  return Math.min(value, 1)
}

function toPrime(value) {
  return value / 255
}

function fromPrime(value) {
  return value * 255
}

function blendAlphaValue(C, A, BG = 255) {
  return Math.trunc((C - BG) * A + BG)
}

function blendAlpha([R, G, B, A]) {
  // if (A > 1) A = toPrime(A)
  return [R, G, B].map(C => blendAlphaValue(C, A))
}

function blendColors([R1, G1, B1, A1 = 1], [R2, G2, B2, A2 = 1], preserveAlpha = false) {
  // if (A1 > 1) A1 = toPrime(A1)
  // if (A2 > 1) A2 = toPrime(A2)

  A = (1 - A1) * A2 + A1
  R = ((1 - A1) * A2 * R2 + A1 * R1) / A
  G = ((1 - A1) * A2 * G2 + A1 * G1) / A
  B = ((1 - A1) * A2 * B2 + A1 * B1) / A
  if (preserveAlpha) return [R, G, B, A]
  return blendAlpha([R, G, B, A])
}

function highlight(data, position, alpha = 1, { color } = { color: [255, 0, 0] }) {
  // color[3] = alpha

  const currentColor = [data[position], data[position + 1], data[position + 2]]
  // const blended = blendColors(color, currentColor)
  const blended = currentColor.map((bg, i) => {
    c = color[i]
    return blendAlphaValue(c, alpha, bg)
  })

  blended.map((value, i) => (data[position + i] = value))
}

module.exports = {
  threshold,
  toPrime,
  fromPrime,
  blendColors,
  blendAlpha,
  highlight
}
