import { useCallback } from 'react'
import IFindCitiesAPIResponse from '../types/IFindCitiesAPIResponse'
import { equals, isEmpty } from 'ramda'
import findDestinationsThatContainText from '../utilities/findDestinationsThatContainText'

/**
 * React hook that mocks a city suggestion fetching API request.
 */
const useFindCitiesEndpoint = () => {
  return useCallback(
    async (destinationName: string): Promise<IFindCitiesAPIResponse> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          /** Throw an error if fail is included to showcase the error handling ability. */
          if (equals(destinationName.toLowerCase(), 'fail')) {
            return reject(
              new Error('Oops! Failed to search with the keyword.', {
                cause: destinationName
              })
            )
          }

          const foundDestinations =
            findDestinationsThatContainText(destinationName)

          /** Throw an error if there are no destinations found */
          if (isEmpty(foundDestinations)) {
            return reject(
              new Error('Oops! Nothing was found for the keyword.', {
                cause: destinationName
              })
            )
          } else {
            const formattedDestinations = foundDestinations.map((current) => ({
              name: current[0],
              lat: current[1],
              lon: current[2]
            }))

            return resolve({
              query: destinationName,
              options: formattedDestinations
            })
          }
        }, 1000)
      })
    },
    []
  )
}

export default useFindCitiesEndpoint
