import { useCallback } from 'react'
import useGetSortedDestinationEntries from '../../../hooks/useGetSortedDestinationEntries'
import ISearchFormValues from '../../../types/ISearchFormValues'

/**
 * React hook that returns a callback function which is used for obtaining the values of
 * destinations, sorted by their form order.
 */
const useGetSortedDestinationValues = () => {
  const getSortedDestinationEntries = useGetSortedDestinationEntries()

  return useCallback(
    (values: ISearchFormValues) => {
      const sortedDestinationEntries = getSortedDestinationEntries(values)

      return sortedDestinationEntries.reduce(
        (previous, current) => [...previous, current[1].value],
        []
      ) as string[]
    },
    [getSortedDestinationEntries]
  )
}

export default useGetSortedDestinationValues
