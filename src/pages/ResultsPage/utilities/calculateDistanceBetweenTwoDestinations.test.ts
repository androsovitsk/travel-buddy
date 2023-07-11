import calculateDistanceBetweenTwoDestinations from './calculateDistanceBetweenTwoDestinations'
import testDestinationData from '../fixtures/testDestinationData'

describe('calculateDistanceBetweenTwoDestinations', () => {
  it('should calculate a distance between two cities using the Haversine formula', () => {
    const firstDestinationData = testDestinationData[0]
    const secondDestinationData = testDestinationData[1]

    const result = calculateDistanceBetweenTwoDestinations(
      firstDestinationData.lat,
      firstDestinationData.lon,
      secondDestinationData.lat,
      secondDestinationData.lon
    )

    expect(result).toStrictEqual(660)
  })
})
