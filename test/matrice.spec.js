const transform = require('../lib/matrice')

describe('matrice', () => {
  it('should tranform 2x2 matrix', () => {
    const matrix = [[2, 1], [-1, 2]]
    const vector = [2, 1]
    const expected = [5, 0]
    const result = transform(matrix, vector)
    expect(result).toEqual(expected)
  })

  it('should tranform 3x3 matrix', () => {
    const matrix = [[-5, 5, 4], [3, 8, 1], [0, 4, 0]]
    const vector = [2, 1, 5]
    const expected = [15, 19, 4]
    const result = transform(matrix, vector)
    expect(result).toEqual(expected)
  })

  it('should tranform 4x4 matrix', () => {
    const matrix = [[-5, 5, 4, 6], [3, 8, 1, 2], [0, 4, 0, -5], [6, -13, 8, 1]]
    const vector = [6, 0, 10, 5]
    const expected = [40, 38, -25, 121]
    const result = transform(matrix, vector)
    expect(result).toEqual(expected)
  })

  it('should throw error with invalid input', () => {
    const matrix = [[2, 1, 3], [-1, 2, 3]]
    const vector = [2, 1]
    expect(() => transform(matrix, vector)).toThrow(/match number of rows/)
  })

  it('should throw error with invalid input', () => {
    const matrix = [[2, 1], [-1, 2]]
    const vector = [2, 1, 3]
    expect(() => transform(matrix, vector)).toThrow(/match number of rows/)
  })

  it('should throw error with invalid matrix', () => {
    const matrix = [['a', 'b'], [-1, 2]]
    const vector = [2, 1]
    expect(() => transform(matrix, vector)).toThrow(/matrix .* number/)
  })

  it('should throw error with invalid matrix', () => {
    const matrix = [[2, 1], [-1, 2]]
    const vector = ['a', 'b']
    expect(() => transform(matrix, vector)).toThrow(/vector .* number/)
  })
})
