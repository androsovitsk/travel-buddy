import { useCallback } from 'react'
import useGetSortedDestinationEntries from '../../../hooks/useGetSortedDestinationEntries'
import ISearchFormValues from '../../../types/ISearchFormValues'

/**
 * React hook that returns the destination bindings (UUID's) from the Formik context while
 * keeping them sorted
 */
const useGetSortedDestinationBindings = () => {
  const getSortedDestinationEntries = useGetSortedDestinationEntries()

  return useCallback(
    (values: ISearchFormValues) => {
      const sortedDestinationEntries = getSortedDestinationEntries(values)

      return sortedDestinationEntries.reduce(
        (previous, current) => [...previous, current[0]],
        []
      ) as string[]
    },
    [getSortedDestinationEntries]
  )
}

export default useGetSortedDestinationBindings
