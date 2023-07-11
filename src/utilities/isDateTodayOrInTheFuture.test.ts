import { startOfToday, startOfTomorrow, startOfYesterday } from 'date-fns'
import isDateTodayOrInTheFuture from './isDateTodayOrInTheFuture'

describe('isDateTodayOrInTheFuture', () => {
  it('should return false for past dates', () => {
    const result = isDateTodayOrInTheFuture(startOfYesterday())

    expect(result).toStrictEqual(false)
  })

  it('should return true for today', () => {
    const result = isDateTodayOrInTheFuture(startOfToday())

    expect(result).toStrictEqual(true)
  })

  it('should return true for future dates', () => {
    const result = isDateTodayOrInTheFuture(startOfTomorrow())

    expect(result).toStrictEqual(true)
  })
})
