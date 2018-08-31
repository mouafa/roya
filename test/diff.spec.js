const diff = require('../lib/diff')

const black = [0, 0, 0, 255]
const white = [255, 255, 255, 255]
const red = [255, 0, 0, 255]
const green = [0, 255, 0, 255]
const blue = [0, 0, 255, 255]

const light = Buffer.from(Array(6 * 4).fill(255))
const dark = Buffer.from(Array(6 * 4).fill(0))
const bnw = Buffer.from([].concat(black, white, black, white, black, white))
const mix = Buffer.from([].concat(black, white, green, red, blue, black))

describe('Main | blendAlpha', () => {
  it(`diff between two light image`, () => {
    const result = diff(light, light)
    expect(result.match).toEqual(1)
    expect(result.missmatch).toEqual(0)

    const same = light.compare(result.data) == 0
    expect(same).toEqual(true)
  })

  it(`diff between two dark image`, () => {
    const result = diff(dark, dark)
    expect(result.match).toEqual(1)
    expect(result.missmatch).toEqual(0)

    const same = dark.compare(result.data) == 0
    expect(same).toEqual(true)
  })

  it(`diff between light and dark image`, () => {
    const result = diff(light, dark)
    expect(result.match).toEqual(0)
    expect(result.missmatch).toEqual(1)

    const same = light.compare(result.data) == 0
    expect(same).toEqual(false)
  })

  it(`diff between bnw and dark image`, () => {
    const result = diff(bnw, dark)
    expect(result.match).toEqual(0.5)
    expect(result.missmatch).toEqual(0.5)

    const same = bnw.compare(result.data) == 0
    expect(same).toEqual(false)
  })

  it(`diff between bnw and light image`, () => {
    const result = diff(bnw, light)
    expect(result.match).toEqual(0.5)
    expect(result.missmatch).toEqual(0.5)

    const same = bnw.compare(result.data) == 0
    expect(same).toEqual(false)
  })

  it(`diff between bnw and mix image`, () => {
    const result = diff(bnw, mix)
    expect(result.match).toBeGreaterThan(0.3)
    expect(result.match).toBeLessThan(0.4)
    expect(result.missmatch).toBeGreaterThan(0.6)
    expect(result.missmatch).toBeLessThan(0.7)

    const same = bnw.compare(result.data) == 0
    expect(same).toEqual(false)
  })
})
