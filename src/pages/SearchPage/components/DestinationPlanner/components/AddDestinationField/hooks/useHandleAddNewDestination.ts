import useGetSortedDestinationEntries from '../../../../../hooks/useGetSortedDestinationEntries'
import { useCallback } from 'react'
import { useFormikContext } from 'formik'
import { v4 } from 'uuid'
import ISearchFormValues from '../../../../../types/ISearchFormValues'

/**
 * React hook that handles adding a new destination to the Formik context.
 */
const useHandleAddNewDestination = () => {
  const { values, setFieldValue } = useFormikContext<ISearchFormValues>()

  const getSortedDestinationEntries = useGetSortedDestinationEntries()

  return useCallback(() => {
    const destinationEntries = getSortedDestinationEntries(values)

    const lastOrderId =
      destinationEntries[destinationEntries.length - 1][1].order

    /** Generate a new UUID to use as a binding */
    const newDestinationBinding = v4()

    setFieldValue(newDestinationBinding, {
      value: '',
      order: lastOrderId + 1,
      lastChangeWasInternal: true
    })
  }, [values, getSortedDestinationEntries, setFieldValue])
}

export default useHandleAddNewDestination
