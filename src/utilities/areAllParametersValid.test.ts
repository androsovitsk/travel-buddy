import areAllParametersValid from './areAllParametersValid'
import testQueryParameters from '../fixtures/testQueryParameters'

describe('areAllParametersValid', () => {
  it('should return false when destinations is not an array', () => {
    const result = areAllParametersValid({
      ...testQueryParameters,
      destinations: {}
    })

    expect(result).toStrictEqual(false)
  })

  it('should return false when destinations is an array with only one value', () => {
    const result = areAllParametersValid({
      ...testQueryParameters,
      destinations: ['Paris']
    })

    expect(result).toStrictEqual(false)
  })

  it('should return false when destinations are not just strings', () => {
    const result = areAllParametersValid({
      ...testQueryParameters,
      destinations: ['Paris', 'Lyon', 3]
    })

    expect(result).toStrictEqual(false)
  })

  it('should return false when numberOfPassengers is not a number', () => {
    const result = areAllParametersValid({
      ...testQueryParameters,
      numberOfPassengers: 'IAmNotANumber'
    })

    expect(result).toStrictEqual(false)
  })

  it('should return true when all parameters are valid', () => {
    const result = areAllParametersValid(testQueryParameters)

    expect(result).toStrictEqual(true)
  })
})
