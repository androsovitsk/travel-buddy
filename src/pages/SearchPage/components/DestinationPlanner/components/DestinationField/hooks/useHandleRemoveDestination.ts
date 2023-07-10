import { useCallback } from 'react'
import { useFormikContext } from 'formik'
import useGetDestinationsInContext from '../../../../../hooks/useGetDestinationsInContext'
import IDestinationFieldContextValue from '../../../types/IDestinationFieldContextValue'
import ISearchFormValues from '../../../../../types/ISearchFormValues'
import { forEachObjIndexed } from 'ramda'

/**
 * React hook that handles removing a new destination from the Formik context.
 * @param {string} binding - the form binding to remove
 */
const useHandleRemoveDestination = (binding: string) => {
  const {
    values,
    values: { [binding]: fieldValue },
    setFieldValue
  } = useFormikContext<ISearchFormValues>()

  const getDestinationsInContext = useGetDestinationsInContext()

  return useCallback(() => {
    const destinations = getDestinationsInContext(values)

    forEachObjIndexed((destinationValue, destinationKey) => {
      const currentValue = destinationValue as IDestinationFieldContextValue
      const currentKey = destinationKey as string

      /** Iterate over every destination and decrement their order if they come after the removed destination */
      if (
        currentValue.order > (fieldValue as IDestinationFieldContextValue).order
      ) {
        setFieldValue(currentKey, {
          value: currentValue.value,
          order: currentValue.order - 1,
          lastChangeWasInternal: true
        }).then()
      }
    }, destinations)

    setFieldValue(binding, undefined).then()
  }, [binding, values, fieldValue, setFieldValue, getDestinationsInContext])
}

export default useHandleRemoveDestination
