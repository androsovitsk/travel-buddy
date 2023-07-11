import areAllParametersProvided from './areAllParametersProvided'
import { omit } from 'ramda'
import testQueryParameters from '../fixtures/testQueryParameters'

describe('areAllParametersProvided', () => {
  it('should return false when destinations is missing in the parameters', () => {
    const result = areAllParametersProvided(
      omit(['destinations'], testQueryParameters)
    )

    expect(result).toStrictEqual(false)
  })

  it('should return false when numberOfPassengers is missing in the parameters', () => {
    const result = areAllParametersProvided(
      omit(['numberOfPassengers'], testQueryParameters)
    )

    expect(result).toStrictEqual(false)
  })

  it('should return false when selectedDate is missing in the parameters', () => {
    const result = areAllParametersProvided(
      omit(['selectedDate'], testQueryParameters)
    )

    expect(result).toStrictEqual(false)
  })

  it('should return true when the query parameters are all provided', () => {
    const result = areAllParametersProvided(testQueryParameters)

    expect(result).toStrictEqual(true)
  })
})
