import IDestinationFieldContextValue from '../../DestinationPlanner/types/IDestinationFieldContextValue'
import { equals, isNil } from 'ramda'

/**
 * Function that returns whether a field value is a destination value
 * @param {number | Date | IDestinationFieldContextValue | null} fieldValue - the fieldValue to check
 */
const isFieldValueADestination = (
  fieldValue: number | Date | IDestinationFieldContextValue | null
) =>
  !isNil(fieldValue) &&
  equals(typeof fieldValue, 'object') &&
  fieldValue.hasOwnProperty('lastChangeWasInternal')

export default isFieldValueADestination
