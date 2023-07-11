import areQueryParametersInTheCorrectFormat from './areQueryParametersInTheCorrectFormat'
import { omit } from 'ramda'
import testQueryParameters from '../fixtures/testQueryParameters'

describe('areQueryParametersInTheCorrectFormat', () => {
  it('should return false when query parameters are null', () => {
    const result = areQueryParametersInTheCorrectFormat(null)

    expect(result).toStrictEqual(false)
  })

  it('should return false when not all query parameters are provided', () => {
    const result = areQueryParametersInTheCorrectFormat({
      ...omit(['destinations'], testQueryParameters)
    })

    expect(result).toStrictEqual(false)
  })

  it('should return false when not all query parameters are valid', () => {
    const result = areQueryParametersInTheCorrectFormat({
      ...omit(['destinations'], testQueryParameters),
      destinations: {}
    })

    expect(result).toStrictEqual(false)
  })

  it('should return true when all query parameters are in their correct format', () => {
    const result = areQueryParametersInTheCorrectFormat(testQueryParameters)

    expect(result).toStrictEqual(true)
  })
})
