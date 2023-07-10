import { useEffect, useRef, useState } from 'react'
import useFindCitiesEndpoint from './useFindCitiesEndpoint'
import { FormikValues, useFormikContext } from 'formik'
import IDestinationData from '../../../../../../../types/IDestinationData'
import IFindCitiesAPIResponse from '../types/IFindCitiesAPIResponse'
import isAValidValue from '../../../../../../../utilities/isAValidValue'

/**
 * React hook that is used to fetch city suggestions by checking value changes in the Formik context.
 * Returns a loading state and the fetched options. Sets the field's error if there are any.
 */
const useFetchSuggestions = (
  binding: string,
  handleOpen: () => void,
  handleClose: () => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<IDestinationData[]>([])

  const {
    values: { [binding]: fieldValue },
    setFieldError
  } = useFormikContext<FormikValues>()

  /**
   * The field value can change before the API returns the results. This ref is used to always compare the
   * returned result with the up-to-date field value.
   */
  const currentFieldValueRef = useRef(fieldValue)

  const fetchFindCitiesEndpoint = useFindCitiesEndpoint()

  useEffect(() => {
    currentFieldValueRef.current = fieldValue.value

    /**
     * The suggestion popper should only be shown when the field value change was made by the user
     * and not the system.
     */
    if (isAValidValue(fieldValue.value) && !fieldValue.lastChangeWasInternal) {
      const debounceTimer = setTimeout(() => {
        setIsLoading(true)
        handleOpen()

        const currentDebouncedValue = fieldValue.value

        fetchFindCitiesEndpoint(currentDebouncedValue)
          .then((response: IFindCitiesAPIResponse) => {
            if (response.query === currentFieldValueRef.current) {
              setIsLoading(false)
              setOptions(response.options)
            }
          })
          .catch((error: Error) => {
            if (error.cause === currentFieldValueRef.current) {
              setIsLoading(false)
              setFieldError(binding, error.message)
              handleClose()
            }
          })
      }, 500)

      return () => {
        clearTimeout(debounceTimer)
      }
    } else {
      setIsLoading(false)
      setOptions([])
      handleClose()
    }
  }, [
    binding,
    fieldValue,
    handleOpen,
    handleClose,
    setFieldError,
    fetchFindCitiesEndpoint
  ])

  return { isLoading, options }
}

export default useFetchSuggestions
