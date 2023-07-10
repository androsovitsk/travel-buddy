import { useCallback } from 'react'
import useGetDestinationsInContext from './useGetDestinationsInContext'
import ISearchFormValues from '../types/ISearchFormValues'

/**
 * Hook that creates sorted object entries from the destinations found in the Formik context
 */
const useGetSortedDestinationEntries = () => {
  const getDestinationsInContext = useGetDestinationsInContext()

  return useCallback(
    (values: ISearchFormValues) => {
      const destinations = getDestinationsInContext(values)

      return Object.entries(destinations).sort(
        (firstEntry, secondEntry) => firstEntry[1].order - secondEntry[1].order
      )
    },
    [getDestinationsInContext]
  )
}

export default useGetSortedDestinationEntries
