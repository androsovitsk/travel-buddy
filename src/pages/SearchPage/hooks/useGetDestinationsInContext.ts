import { omit } from 'ramda'
import { useCallback } from 'react'
import ISearchFormValues from '../types/ISearchFormValues'
import IDestinationFieldContextValue from '../components/DestinationPlanner/types/IDestinationFieldContextValue'

/**
 * Hook that returns only the destinations from the Formik context
 */
const useGetDestinationsInContext = () => {
  return useCallback(
    (values: ISearchFormValues) =>
      omit(
        ['numberOfPassengers', 'selectedDate'],
        values as unknown
      ) as IDestinationFieldContextValue[],
    []
  )
}

export default useGetDestinationsInContext
