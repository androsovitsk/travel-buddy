import convertDegreeToRadian from './convertDegreeToRadian'

describe('convertDegreeToRadian', () => {
  it('should convert the degree to radian', () => {
    const result = convertDegreeToRadian(60)

    const expectedResult = Math.PI / 3
    expect(result).toStrictEqual(expectedResult)
  })
})
