import { renderHook } from '@testing-library/react'
import useFindCitiesEndpoint from './useFindCitiesEndpoint'
import testDestinationData from '../../../../../../ResultsPage/fixtures/testDestinationData'

describe('useFindCitiesEndpoint', () => {
  it("should throw a fail error when the keyword 'fail' is searched", async () => {
    expect.assertions(1)

    try {
      const { result } = renderHook(() => useFindCitiesEndpoint())
      await result.current('fail')
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('Oops! Failed to search with the keyword.', {
          cause: 'fail'
        })
      )
    }
  })

  it('should throw a no destinations found error when destinations for the keyword are not found', async () => {
    expect.assertions(1)

    const testCityName = 'ThereIsNoDestinationNameLikeThat'

    try {
      const { result } = renderHook(() => useFindCitiesEndpoint())
      await result.current(testCityName)
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('Oops! Nothing was found for the keyword.', {
          cause: testCityName
        })
      )
    }
  })

  it('should return the found destinations in the correct format', async () => {
    const testDestination = testDestinationData[0]

    const { result } = renderHook(() => useFindCitiesEndpoint())

    const foundDestinations = await result.current(testDestination.name)

    expect(foundDestinations).toStrictEqual({
      options: [testDestination],
      query: testDestination.name
    })
  })
})
