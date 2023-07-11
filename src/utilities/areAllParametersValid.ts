import { all, equals } from 'ramda'

// @ts-ignore
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
  !equals(parseInt(queryParameters.numberOfPassengers), NaN)

export default areAllParametersValid
