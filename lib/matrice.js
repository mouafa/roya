function transform(matrix = [], vector = []) {
  validate(matrix, vector)
  return matrix.map((row, i) => {
    return row.reduce((acc, x, j) => {
      return acc + x * vector[j]
    }, 0)
  })
}

function validate(matrix = [], vector = []) {
  if (process.env.NODE_ENV === 'production') return true

  if (!Array.isArray(matrix) || !Array.isArray(vector)) throw Error('both matrix and vector must be arrays')
  const rows = vector.length

  let ok = arrayOfNumber(vector)
  if (!ok) throw Error('all vector elements must be number')

  ok = matrix.every(row => Array.isArray(row) && row.length === rows)
  if (!ok) throw Error('Number of cols in matrix need to match number of rows in vector')

  ok = matrix.every(row => arrayOfNumber(row))
  if (!ok) throw Error('all matrix elements must be number')

  return ok
}

function arrayOfNumber(array) {
  return array.every(i => typeof i === 'number')
}

module.exports = transform
