const { rgbDistance, rgbDistanceTuned } = require('../lib/RGB')

const white = { rgb: [255, 255, 255], yiq: [1, 0, 0] }
const black = { rgb: [0, 0, 0], yiq: [0, 0, 0] }
const red = { rgb: [255, 0, 0], yiq: [0.29889531, 0.59597799, 0.21147017] }
const blue = { rgb: [0, 255, 0], yiq: [0.58662247, -0.2741761, -0.52261711] }
const green = { rgb: [0, 0, 255], yiq: [0.11448223, -0.32180189, 0.31114694] }

describe('RGB | rgbDistance', () => {
  it('distance bitween white and white', () => {
    expect(rgbDistance(white.rgb, white.rgb)).toEqual(0)
  })
  it('distance bitween black and black', () => {
    expect(rgbDistance(black.rgb, black.rgb)).toEqual(0)
  })
  it('distance bitween green and green', () => {
    expect(rgbDistance(green.rgb, green.rgb)).toEqual(0)
  })
  it('distance bitween white and black', () => {
    const distance = rgbDistance(white.rgb, black.rgb)
    expect(distance).toEqual(1)
  })
  it.only('distance bitween red and blue', () => {
    const distance = rgbDistance(red.rgb, blue.rgb)
    expect(distance).toEqual(1)
  })
  it('distance bitween blue and green', () => {
    const distance = rgbDistance(blue.rgb, green.rgb)
    expect(distance).toEqual(1)
  })
  it('distance bitween green and red', () => {
    const distance = rgbDistance(green.rgb, red.rgb)
    expect(distance).toEqual(1)
  })
})

describe.only('RGB | rgbDistanceTuned', () => {
  it('distance bitween white and white', () => {
    expect(rgbDistanceTuned(white.rgb, white.rgb)).toEqual(0)
  })
  it('distance bitween black and black', () => {
    expect(rgbDistanceTuned(black.rgb, black.rgb)).toEqual(0)
  })
  it('distance bitween green and green', () => {
    expect(rgbDistanceTuned(green.rgb, green.rgb)).toEqual(0)
  })
  it('distance bitween white and black', () => {
    const distance = rgbDistanceTuned(white.rgb, black.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.8)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween red and blue', () => {
    const distance = rgbDistanceTuned(red.rgb, blue.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.8)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween blue and green', () => {
    const distance = rgbDistanceTuned(blue.rgb, green.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.8)
    expect(distance).toBeLessThanOrEqual(1)
  })
  it('distance bitween green and red', () => {
    const distance = rgbDistanceTuned(green.rgb, red.rgb)
    expect(distance).toBeGreaterThanOrEqual(0.7)
    expect(distance).toBeLessThanOrEqual(1)
  })
})
