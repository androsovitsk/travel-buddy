import { useCallback } from 'react'
import IResultsAPIResponse from '../types/IResultsAPIResponse'
import areAllParametersProvided from '../../../utilities/areAllParametersProvided'
import areAllParametersValid from '../../../utilities/areAllParametersValid'
import findDestinationDataInDatabase from '../../../utilities/findDestinationDataInDatabase'
import calculateDistanceBetweenTwoDestinations from '../utilities/calculateDistanceBetweenTwoDestinations'
import { isNil } from 'ramda'

/**
 * React hook that mocks a result checking API request.
 */
const useResultsEndpoint = () => {
  /**
   * Callback function that calculates the results. It throws back an error if something
   * was wrong with the provided query parameters.
   * @param {object} queryParameters - the query parameters to work with
   */
  return useCallback(
    (queryParameters: { [key: string]: any }): Promise<IResultsAPIResponse> => {
      return new Promise((resolve, reject) => {
        /** If query parameters are null throw an error that something was wrong with the encoding. */
        if (isNil(queryParameters)) {
          return reject(
            new Error(
              `The provided query parameters are not correctly encoded.`
            )
          )
        }

        /** If not all required parameters are provided throw an error about it. */
        if (!areAllParametersProvided(queryParameters)) {
          return reject(
            new Error(
              `The parameters 'destinations', 'numberOfPassengers' and 'selectedDate' must be provided in the query parameters.`
            )
          )
        }

        /** If parameters are not in their correct format throw an error about it. */
        if (!areAllParametersValid(queryParameters)) {
          return reject(
            new Error(
              `The parameters 'destinations', 'numberOfPassengers' and 'selectedDate' must be valid.`
            )
          )
        }

        setTimeout(() => {
          const destinations = queryParameters.destinations as string[]
          const distances = []

          /** Throw an error if Dijon is included to showcase the error handling ability. */
          if (destinations.includes('Dijon')) {
            return reject(new Error('Oops! Something went wrong!'))
          }

          for (let i = 0; i < destinations.length - 1; i++) {
            const firstDestination = findDestinationDataInDatabase(
              destinations[i]
            )

            const secondDestination = findDestinationDataInDatabase(
              destinations[i + 1]
            )

            /** If any of the city names are not in the database throw an error about it. */
            if (isNil(firstDestination) || isNil(secondDestination)) {
              return reject(new Error('The provided city name is not valid.'))
            }

            const distanceBetweenTwoDestinations =
              calculateDistanceBetweenTwoDestinations(
                firstDestination.lat,
                firstDestination.lon,
                secondDestination.lat,
                secondDestination.lon
              )

            distances.push(distanceBetweenTwoDestinations)
          }

          return resolve({
            destinations,
            distances,
            numberOfPassengers: parseInt(queryParameters.numberOfPassengers),
            selectedDate: queryParameters.selectedDate
          })
        }, 1000)
      })
    },
    []
  )
}

export default useResultsEndpoint
