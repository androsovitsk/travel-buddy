import IResultsAPIResponse from '../types/IResultsAPIResponse'
import IResults from '../types/IResults'
import { omit, sum } from 'ramda'

/**
 * Function that converts a results API response to a locally used format.
 * @param {IResultsAPIResponse} response - the response to convert
 */
const convertResultsAPIResponse = (
  response: IResultsAPIResponse
): IResults => ({
  ...omit(['selectedDate'], response),
  totalDistance: sum(response.distances),
  selectedDate: new Date(response.selectedDate)
})

export default convertResultsAPIResponse
