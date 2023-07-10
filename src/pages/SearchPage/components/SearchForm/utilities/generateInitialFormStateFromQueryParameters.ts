import IQueryParameters from '../../../../../types/IQueryParameters'
import { v4 } from 'uuid'

/**
 * Function that generates an initial form state from the decoded queery parameters.
 * It creates random UUID's (later on referred as bindings) for the destinations found.
 * @param {IQueryParameters} decodedQueryParameters - the query parameters to generate from
 */
const generateInitialFormStateFromQueryParameters = (
  decodedQueryParameters: IQueryParameters
) => {
  const initialValues = {}
  const initialTouched = {}

  initialValues['numberOfPassengers'] = parseInt(
    decodedQueryParameters.numberOfPassengers
  )

  initialValues['selectedDate'] = new Date(
    decodedQueryParameters.selectedDate as string
  )

  initialTouched['numberOfPassengers'] = true
  initialTouched['selectedDate'] = true

  const destinationsFromQueryParameters =
    decodedQueryParameters.destinations as string[]

  destinationsFromQueryParameters.forEach((current, index) => {
    const generatedDestinationKey = v4()

    initialValues[generatedDestinationKey] = {
      value: current,
      order: index,
      lastChangeWasInternal: true
    }

    initialTouched[generatedDestinationKey] = true
  })

  return { initialValues, initialTouched }
}

export default generateInitialFormStateFromQueryParameters
