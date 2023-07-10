import { isNotNil } from 'ramda'
import areAllParametersProvided from './areAllParametersProvided'
import areAllParametersValid from './areAllParametersValid'

/**
 * Function that returns whether query parameters are in the correct format.
 * @param {object} queryParameters - the query parameters to check
 */
const areQueryParametersInTheCorrectFormat = (queryParameters: {
  [key: string]: any
}) =>
  isNotNil(queryParameters) &&
  areAllParametersProvided(queryParameters) &&
  areAllParametersValid(queryParameters)

export default areQueryParametersInTheCorrectFormat
