function threshold(value) {
  return Math.min(value, 1)
}

function blendAlphaValue(C, A, BG = 255) {
  return Math.trunc((C - BG) * A + BG)
}

function blendAlpha([R, G, B, A]) {
  return [R, G, B].map(C => blendAlphaValue(C, A))
}

function blendColors([R1, G1, B1, A1], [R2, G2, B2, A2], preserveAlpha = false) {
  A = (1 - A1) * A2 + A1
  R = ((1 - A1) * A2 * R2 + A1 * R1) / A
  G = ((1 - A1) * A2 * G2 + A1 * G1) / A
  B = ((1 - A1) * A2 * B2 + A1 * B1) / A
  if (preserveAlpha) return [R, G, B, A]
  return blendAlpha([R, G, B, A])
}

function toPrime(value) {
  return value / 255
}

function fromPrime(value) {
  return value * 255
}

module.exports = {
  threshold,
  toPrime,
  fromPrime,
  blendColors,
  blendAlpha
}
