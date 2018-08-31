const { threshold, toPrime } = require('./util')

function rgbDistance([R1, G1, B1], [R2, G2, B2]) {
  const deltaSum = toPrime(R1 - R2) ** 2 + toPrime(G1 - G2) ** 2 + toPrime(B1 - B2) ** 2
  return threshold(Math.sqrt(deltaSum))
}

function rgbDistanceTuned([R1, G1, B1], [R2, G2, B2]) {
  const deltaSum = 2 * toPrime(R1 - R2) ** 2 + 4 * toPrime(G1 - G2) ** 2 + 3 * toPrime(B1 - B2) ** 2
  const distance = Math.sqrt(deltaSum) / 3
  return threshold(distance)
}

module.exports = {
  rgbDistance,
  rgbDistanceTuned
}
