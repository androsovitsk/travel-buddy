import { useEffect } from 'react'
import { FormikValues, useFormikContext } from 'formik'
import isAValidValue from '../utilities/isAValidValue'

/**
 * React hook to reset/set field errors when the value of the field changes.
 * @param {string} binding - the field binding where the error is applied
 * @param {string} fieldErrorMessage - the error message to show
 */
const useFieldErrors = (binding: string, fieldErrorMessage: string) => {
  const {
    values: { [binding]: fieldValue },
    touched: { [binding]: isFieldTouched },
    setFieldTouched,
    setFieldError
  } = useFormikContext<FormikValues>()

  useEffect(() => {
    /** Reset errors on field value change */
    setFieldError(binding, undefined)

    /** Set a field error if the field is touched and the value is not a valid value. */
    if (!isAValidValue(fieldValue) && isFieldTouched) {
      setFieldError(binding, fieldErrorMessage)
    }
  }, [
    binding,
    fieldValue,
    fieldErrorMessage,
    isFieldTouched,
    setFieldTouched,
    setFieldError
  ])
}

export default useFieldErrors
