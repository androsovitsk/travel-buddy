import { isDate } from 'date-fns'
import { all } from 'ramda'

/**
 * Function that returns whether all parameters are valid.
 * @param {object} queryParameters - the query parameters to check
 */
const areAllParametersValid = (queryParameters: {
  [key: string]: any
}): boolean =>
  /** Destinations should be an array of strings with at least 2 items */
  Array.isArray(queryParameters.destinations) &&
  queryParameters.destinations.length >= 2 &&
  all((current) => typeof current === 'string')(queryParameters.destinations) &&
  /** NumberOfPassengers should be a number */
  typeof parseInt(queryParameters.numberOfPassengers) === 'number' &&
  /** SelectedDate should be a date */
  isDate(new Date(queryParameters.selectedDate))

export default areAllParametersValid
