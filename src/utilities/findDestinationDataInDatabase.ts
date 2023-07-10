import cities from '../assets/cities.json'
import IDestinationData from '../types/IDestinationData'
import { equals } from 'ramda'

/**
 * Function that returns the desired city's data from the database.
 * @param {string} name - the city name to check
 */
const findDestinationDataInDatabase = (
  name: string
): IDestinationData | null => {
  const foundDestination = cities.find((current) => equals(current[0], name))

  if (foundDestination) {
    return {
      name: foundDestination[0] as string,
      lat: foundDestination[1] as number,
      lon: foundDestination[2] as number
    }
  }

  return null
}

export default findDestinationDataInDatabase
