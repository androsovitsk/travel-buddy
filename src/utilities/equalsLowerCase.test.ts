import equalsLowerCase from './equalsLowerCase'

describe('equalsLowerCase', () => {
  it('should return false when the two strings are not identical when both are in lower casing', () => {
    const result = equalsLowerCase('First', 'Second')

    expect(result).toStrictEqual(false)
  })

  it('should return true when the two strings are identical when both are in lower casing', () => {
    const result = equalsLowerCase('eQuAL', 'EqUal')

    expect(result).toStrictEqual(true)
  })
})
