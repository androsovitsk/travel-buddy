import isAValidValue from './isAValidValue'
import { startOfToday, startOfTomorrow, startOfYesterday } from 'date-fns'
import IDestinationFieldContextValue from '../pages/SearchPage/components/DestinationPlanner/types/IDestinationFieldContextValue'

describe('isAValidValue', () => {
  it('should return false for undefined values', () => {
    const result = isAValidValue(undefined)

    expect(result).toStrictEqual(false)
  })

  it('should return false for null values', () => {
    const result = isAValidValue(null)

    expect(result).toStrictEqual(false)
  })

  it('should return false for a number that is 0', () => {
    const result = isAValidValue(0)

    expect(result).toStrictEqual(false)
  })

  it('should return false for a number that is lower than 0', () => {
    const result = isAValidValue(-1)

    expect(result).toStrictEqual(false)
  })

  it('should return true for a number that is higher than 0', () => {
    const result = isAValidValue(1)

    expect(result).toStrictEqual(true)
  })

  it('should return false for an empty string', () => {
    const result = isAValidValue('')

    expect(result).toStrictEqual(false)
  })

  it('should return true for a non-empty string', () => {
    const result = isAValidValue('test')

    expect(result).toStrictEqual(true)
  })

  it('should return false for a date that is before today', () => {
    const result = isAValidValue(startOfYesterday())

    expect(result).toStrictEqual(false)
  })

  it('should return true for a date that is today', () => {
    const result = isAValidValue(startOfToday())

    expect(result).toStrictEqual(true)
  })

  it('should return false for a number that is after today', () => {
    const result = isAValidValue(startOfTomorrow())

    expect(result).toStrictEqual(true)
  })

  it('should return false for a destination that has an empty value', () => {
    const result = isAValidValue({
      value: '',
      order: 0,
      lastChangeWasInternal: true
    } as IDestinationFieldContextValue)

    expect(result).toStrictEqual(false)
  })

  it('should return true for a destination that has a value', () => {
    const result = isAValidValue({
      value: 'test',
      order: 0,
      lastChangeWasInternal: true
    } as IDestinationFieldContextValue)

    expect(result).toStrictEqual(true)
  })
})
