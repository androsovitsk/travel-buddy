import cities from '../../../../../../../assets/cities.json'
import IDestinationData from '../../../../../../../types/IDestinationData'

/**
 * Function that returns all destinations that contain the provided text.
 * @param {string} text - the text to search
 */
const findDestinationsThatContainText = (text: string): IDestinationData[] =>
  cities.filter((current) =>
    (current[0] as string).toLowerCase().includes(text.toLowerCase())
  ) as unknown as IDestinationData[]

export default findDestinationsThatContainText
