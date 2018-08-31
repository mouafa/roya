const { rgb2yiq, yiq2rgb, yiqDistance, rgb2yiqDistance, rgb2yiqDistanceTuned } = require('../lib/YIQ')

const white = { rgb: [255, 255, 255], yiq: [1, 0, 0] }
const black = { rgb: [0, 0, 0], yiq: [0, 0, 0] }
const red = { rgb: [255, 0, 0], yiq: [0.29889531, 0.59597799, 0.21147017] }
const blue = { rgb: [0, 255, 0], yiq: [0.58662247, -0.2741761, -0.52261711] }
const green = { rgb: [0, 0, 255], yiq: [0.11448223, -0.32180189, 0.31114694] }

describe('YIQ | convert RGB to YIQ properly', () => {
  it('should convert white properly', () => {
    expect(rgb2yiq(white.rgb)).toEqual(white.yiq)
  })

  it('should convert black properly', () => {
    expect(rgb2yiq(black.rgb)).toEqual(black.yiq)
  })

  it('should convert red properly', () => {
    expect(rgb2yiq(red.rgb)).toEqual(red.yiq)
  })

  it('should convert blue properly', () => {
    expect(rgb2yiq(blue.rgb)).toEqual(blue.yiq)
  })

  it('should convert green properly', () => {
    expect(rgb2yiq(green.rgb)).toEqual(green.yiq)
  })
})

describe('YIQ | convert YIQ to RGB properly', () => {
  it('should convert white properly', () => {
    expect(yiq2rgb(white.yiq)).toEqual(white.rgb)
  })

  it('should convert black properly', () => {
    expect(yiq2rgb(black.yiq)).toEqual(black.rgb)
  })

  it('should convert red properly', () => {
    expect(yiq2rgb(red.yiq)).toEqual(red.rgb)
  })

  it('should convert blue properly', () => {
    expect(yiq2rgb(blue.yiq)).toEqual(blue.rgb)
  })

  it('should convert green properly', () => {
    expect(yiq2rgb(green.yiq)).toEqual(green.rgb)
  })
})

describe('YIQ | convert YIQ to RGB back and forth properly', () => {
  it('should convert white properly', () => {
    expect(rgb2yiq(yiq2rgb(white.yiq))).toEqual(rgb2yiq(white.rgb))
  })

  it('should convert black properly', () => {
    expect(rgb2yiq(yiq2rgb(black.yiq))).toEqual(rgb2yiq(black.rgb))
  })

  it('should convert red properly', () => {
    expect(rgb2yiq(yiq2rgb(red.yiq))).toEqual(rgb2yiq(red.rgb))
  })

  it('should convert blue properly', () => {
    expect(rgb2yiq(yiq2rgb(blue.yiq))).toEqual(rgb2yiq(blue.rgb))
  })

  it('should convert green properly', () => {
    expect(rgb2yiq(yiq2rgb(green.yiq))).toEqual(rgb2yiq(green.rgb))
  })
})

describe('YIQ | yiqDistance', () => {
  it('distance bitween white and white', () => {
    expect(yiqDistance(white.yiq, white.yiq)).toEqual(0)
  })
  it('distance bitween black and black', () => {
    expect(yiqDistance(black.yiq, black.yiq)).toEqual(0)
  })
  it('distance bitween green and green', () => {
    expect(yiqDistance(green.yiq, green.yiq)).toEqual(0)
  })
  it.skip('distance bitween white and black', () => {
    expect(yiqDistance(white.yiq, black.yiq)).toEqual(1)
  })
  it('distance bitween red and blue', () => {
    const distance = yiqDistance(red.yiq, blue.yiq)
    expect(distance).toBeGreaterThanOrEqual(0)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween blue and green', () => {
    const distance = yiqDistance(blue.yiq, green.yiq)
    expect(distance).toBeGreaterThanOrEqual(0)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween green and red', () => {
    const distance = yiqDistance(green.yiq, red.yiq)
    expect(distance).toBeGreaterThanOrEqual(0)
    expect(distance).toBeLessThanOrEqual(1)
  })
})

describe('YIQ | rgb2yiqDistance', () => {
  it('distance bitween white and white', () => {
    expect(rgb2yiqDistance(white.rgb, white.rgb)).toEqual(0)
  })
  it('distance bitween black and black', () => {
    expect(rgb2yiqDistance(black.rgb, black.rgb)).toEqual(0)
  })
  it('distance bitween green and green', () => {
    expect(rgb2yiqDistance(green.rgb, green.rgb)).toEqual(0)
  })
  it('distance bitween white and black', () => {
    expect(rgb2yiqDistance(white.rgb, black.rgb)).toEqual(1)
  })
  it('distance bitween red and blue', () => {
    const distance = rgb2yiqDistance(red.rgb, blue.rgb)
    expect(distance).toEqual(1)
  })
  it('distance bitween blue and green', () => {
    const distance = rgb2yiqDistance(blue.rgb, green.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.9)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween green and red', () => {
    const distance = rgb2yiqDistance(green.rgb, red.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.9)
    expect(distance).toBeLessThanOrEqual(1)
  })
})

describe('YIQ | rgb2yiqDistanceTuned', () => {
  it('distance bitween white and white', () => {
    expect(rgb2yiqDistanceTuned(white.rgb, white.rgb)).toEqual(0)
  })
  it('distance bitween black and black', () => {
    expect(rgb2yiqDistanceTuned(black.rgb, black.rgb)).toEqual(0)
  })
  it('distance bitween green and green', () => {
    expect(rgb2yiqDistanceTuned(green.rgb, green.rgb)).toEqual(0)
  })
  it('distance bitween white and black', () => {
    const distance = rgb2yiqDistanceTuned(white.rgb, black.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.7)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween red and blue', () => {
    const distance = rgb2yiqDistanceTuned(red.rgb, blue.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.6)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween blue and green', () => {
    const distance = rgb2yiqDistanceTuned(blue.rgb, green.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.4)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween green and red', () => {
    const distance = rgb2yiqDistanceTuned(green.rgb, red.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.5)
    expect(distance).toBeLessThanOrEqual(1)
  })
})
