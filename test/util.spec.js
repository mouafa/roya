const { toPrime, fromPrime, threshold, blendAlpha, blendColors, highlight } = require('../lib/util')

const white = { solid: [255, 255, 255, 1], trans: [255, 255, 255, 0], semi: [255, 255, 255, 0.5] }
const black = { solid: [0, 0, 0, 1], trans: [0, 0, 0, 0], semi: [0, 0, 0, 0.5] }
const red = { solid: [255, 0, 0, 1], trans: [255, 0, 0, 0], semi: [255, 0, 0, 0.5] }
const green = { solid: [0, 255, 0, 1], trans: [0, 255, 0, 0], semi: [0, 255, 0, 0.5] }
const blue = { solid: [0, 0, 255, 1], trans: [0, 0, 255, 0], semi: [0, 0, 255, 0.5] }

const primeMap = [{ value: 255, prime: 1 }, { value: 51, prime: 0.2 }, { value: 0, prime: 0 }]

describe('Util | toPrime', () => {
  primeMap.forEach(({ value, prime }) => {
    it(`should convert ${value} prime correctly`, () => {
      expect(toPrime(value)).toEqual(prime)
    })
  })
})

describe('Util | fromPrime', () => {
  primeMap.forEach(({ value, prime }) => {
    it(`should convert ${value} value correctly`, () => {
      expect(fromPrime(prime)).toEqual(value)
    })
  })
})

describe('Util | threshold', () => {
  it(`should return the same value`, () => {
    expect(threshold(0.5)).toEqual(0.5)
  })

  it(`should return threshold value`, () => {
    expect(threshold(1.1)).toEqual(1)
  })

  it.skip(`should return threshold value`, () => {
    expect(threshold(25, { max: 20 })).toEqual(20)
  })
})

describe('Util | blendColors and preserve alpha', () => {
  it(`blend solid white with trans black correctly`, () => {
    expect(blendColors(white.solid, black.trans, true)).toEqual(white.solid)
  })
  it(`blend trans white with solid black correctly`, () => {
    expect(blendColors(white.trans, black.solid, true)).toEqual(black.solid)
  })

  it(`blend semi white with semi black correctly`, () => {
    expect(blendColors(white.semi, black.semi, true)).toEqual([170, 170, 170, 0.75])
  })

  it(`blend semi blue with semi red correctly`, () => {
    expect(blendColors(blue.semi, red.semi, true)).toEqual([85, 0, 170, 0.75])
  })
})

describe("Util | blendColors don't preserve alpha", () => {
  it(`blend solid white with trans black correctly`, () => {
    expect(blendColors(white.solid, black.trans)).toEqual([255, 255, 255])
  })
  it(`blend trans white with solid black correctly`, () => {
    expect(blendColors(white.trans, black.solid)).toEqual([0, 0, 0])
  })

  it(`blend semi white with semi black correctly`, () => {
    expect(blendColors(white.semi, black.semi)).toEqual([191, 191, 191])
  })

  it(`blend semi blue with semi red correctly`, () => {
    expect(blendColors(blue.semi, red.semi)).toEqual([127, 63, 191])
  })
})

describe('Util | blendAlpha', () => {
  it(`blendAlpha light grey`, () => {
    expect(blendAlpha([170, 170, 170, 0.75])).toEqual([191, 191, 191])
  })

  it(`blendAlpha semi red`, () => {
    expect(blendAlpha(red.semi)).toEqual([255, 127, 127])
  })

  it(`blendAlpha semi green`, () => {
    expect(blendAlpha(green.semi)).toEqual([127, 255, 127])
  })

  it(`blendAlpha semi blue`, () => {
    expect(blendAlpha(blue.semi)).toEqual([127, 127, 255])
  })
})

describe('Util | highlight', () => {
  it(`highlight in the right position`, () => {
    const data = Array(4 * 4).fill(0)
    const clone = [...data]

    const position = 4 * 2 //3rd pixel
    const distance = 0.8 // diff should be between 0 and 1
    highlight(data, position, distance)

    const expected = [...data]
    expected[4 * 2] = expect.any(Number)
    expected[4 * 2 + 1] = expect.any(Number)
    expected[4 * 2 + 2] = expect.any(Number)
    expect(data[4 * 2]).not.toEqual(clone[4 * 2])
    expect(data).toEqual(expected)
  })
})
