import findDestinationDataInDatabase from './findDestinationDataInDatabase'

describe('findDestinationDataInDatabase', () => {
  it('should return the destination data when it can be found in the database', () => {
    const result = findDestinationDataInDatabase('Paris')

    expect(result).toStrictEqual({
      name: 'Paris',
      lat: 48.856614,
      lon: 2.352222
    })
  })

  it('should return null when the destination can not be found in the database', () => {
    const result = findDestinationDataInDatabase('NotAValidCityName')

    expect(result).toStrictEqual(null)
  })
})
