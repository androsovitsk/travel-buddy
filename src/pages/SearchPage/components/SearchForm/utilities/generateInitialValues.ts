import { v4 } from 'uuid'

/**
 * Function that generates initial form values. It creates random UUID's (later on referred as bindings)
 * for the initial first and second destination.
 */
const generateInitialValues = () => {
  const firstDestinationGeneratedKey = v4()
  const secondDestinationGeneratedKey = v4()

  return {
    [firstDestinationGeneratedKey]: {
      value: '',
      order: 0,
      lastChangeWasInternal: true
    },
    [secondDestinationGeneratedKey]: {
      value: '',
      order: 1,
      lastChangeWasInternal: true
    },
    numberOfPassengers: 0,
    selectedDate: null
  }
}

export default generateInitialValues
