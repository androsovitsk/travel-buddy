import findDestinationsThatContainText from './findDestinationsThatContainText'
import testDestinationData from '../../../../../../ResultsPage/fixtures/testDestinationData'

describe('findDestinationsThatContainText', () => {
  it('should return the destinations that contain the given text', () => {
    const testDestination = testDestinationData[0]

    const result = findDestinationsThatContainText(testDestination.name)
    
    expect(result).toStrictEqual([
      [testDestination.name, testDestination.lat, testDestination.lon]
    ])
  })
})
