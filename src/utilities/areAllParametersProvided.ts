import { isNotNil } from 'ramda'

/**
 * Function that returns whether all required parameters are provided.
 * @param {object} queryParameters - the query parameters to check
 */
const areAllParametersProvided = (queryParameters: {
  [key: string]: any
}): boolean =>
  isNotNil(queryParameters.destinations) &&
  isNotNil(queryParameters.numberOfPassengers) &&
  isNotNil(queryParameters.selectedDate)

export default areAllParametersProvided
