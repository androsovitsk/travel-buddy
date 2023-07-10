import { isFuture, isToday } from 'date-fns'

/**
 * Function that return whether a date is today or is a future date
 * @param {Date} value - the date to check
 */
const isDateTodayOrInTheFuture = (value: Date) =>
  isToday(value) || isFuture(value)

export default isDateTodayOrInTheFuture
