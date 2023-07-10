import { isEmpty, isNil, isNotNil } from 'ramda'
import { isDate } from 'date-fns'
import isDateTodayOrInTheFuture from './isDateTodayOrInTheFuture'
import IDestinationFieldContextValue from '../pages/SearchPage/components/DestinationPlanner/types/IDestinationFieldContextValue'

/**
 * Function that checks whether the provided value is in a valid format
 * @param {any} value - the value to check
 */
const isAValidValue = (value: any) => {
  switch (typeof value) {
    case 'number':
      return value > 0
    case 'string':
      return !isEmpty(value)
    case 'object':
      if (isNil(value)) {
        return false
      }

      return isDate(value)
        ? isDateTodayOrInTheFuture(value as Date)
        : !isEmpty((value as IDestinationFieldContextValue).value)
    default:
      return isNotNil(value)
  }
}
export default isAValidValue
