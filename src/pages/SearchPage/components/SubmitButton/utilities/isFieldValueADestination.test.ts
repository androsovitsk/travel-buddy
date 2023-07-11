import isFieldValueADestination from './isFieldValueADestination'
import testSearchFormValues from '../../../fixtures/testSearchFormValues'

describe('isFieldValueADestination', () => {
  it('should return false when the field value is null', () => {
    const result = isFieldValueADestination(null)

    expect(result).toStrictEqual(false)
  })

  it('should return false when the field value is not an object', () => {
    const result = isFieldValueADestination(1)

    expect(result).toStrictEqual(false)
  })

  it('should return false when the field value does not have a lastChangeWasInternal property', () => {
    // @ts-ignore
    const result = isFieldValueADestination({ testProperty: 1 })

    expect(result).toStrictEqual(false)
  })

  it('should return true when the field value is a destination', () => {
    const result = isFieldValueADestination(
      testSearchFormValues['thisIsTheFirstRandomizedBinding']
    )

    expect(result).toStrictEqual(true)
  })
})
