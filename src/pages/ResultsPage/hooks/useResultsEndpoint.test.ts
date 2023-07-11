import { renderHook } from '@testing-library/react'
import useResultsEndpoint from './useResultsEndpoint'
import { omit } from 'ramda'
import testQueryParameters from '../../../fixtures/testQueryParameters'
import testResultsAPIResponse from '../fixtures/testResultsAPIResponse'

describe('useResultsEndpoint', () => {
  it('should throw an encoding error when query parameters are null', async () => {
    expect.assertions(1)

    try {
      const { result } = renderHook(() => useResultsEndpoint())
      await result.current(null)
    } catch (error) {
      expect(error.message).toStrictEqual(
        'The provided query parameters are not correctly encoded.'
      )
    }
  })

  it('should throw a parameter missing error when not all query parameters are provided', async () => {
    expect.assertions(1)

    try {
      const { result } = renderHook(() => useResultsEndpoint())
      await result.current(omit(['destinations'], testQueryParameters))
    } catch (error) {
      expect(error.message).toStrictEqual(
        "The parameters 'destinations', 'numberOfPassengers' and 'selectedDate' must be provided in the query parameters."
      )
    }
  })

  it('should throw an invalid parameter error when not all query parameters are valid', async () => {
    expect.assertions(1)

    try {
      const { result } = renderHook(() => useResultsEndpoint())
      await result.current({ ...testQueryParameters, numberOfPassengers: NaN })
    } catch (error) {
      expect(error.message).toStrictEqual(
        `The parameters 'destinations', 'numberOfPassengers' and 'selectedDate' must be valid.`
      )
    }
  })

  it('should throw an unexpected error when Dijon is involved in the calculation', async () => {
    expect.assertions(1)

    try {
      const { result } = renderHook(() => useResultsEndpoint())

      await result.current({
        ...testQueryParameters,
        destinations: ['Paris', 'Dijon']
      })
    } catch (error) {
      expect(error.message).toStrictEqual(`Oops! Something went wrong!`)
    }
  })

  it('should return the correct results', async () => {
    const { result } = renderHook(() => useResultsEndpoint())

    expect(await result.current(testQueryParameters)).toStrictEqual(
      testResultsAPIResponse
    )
  })
})
