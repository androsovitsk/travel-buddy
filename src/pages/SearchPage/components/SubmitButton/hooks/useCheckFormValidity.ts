import { useMemo } from 'react'
import { useFormikContext } from 'formik'
import { all, equals } from 'ramda'
import isFieldValueADestination from '../utilities/isFieldValueADestination'
import ISearchFormValues from '../../../types/ISearchFormValues'
import IDestinationFieldContextValue from '../../DestinationPlanner/types/IDestinationFieldContextValue'

/**
 * Hook that checks the form's validity. It returns true if all fields are touched and none of them has errors.
 */
const useCheckFormValidity = () => {
  const { values, touched, errors } = useFormikContext<ISearchFormValues>()

  return useMemo(() => {
    const bindingsOfAllValues = Object.keys(values)

    return all((currentBinding) => {
      const isFieldTouched = equals(touched[currentBinding], true)
      const fieldHasNoError = equals(errors[currentBinding], undefined)
      const fieldValue = values[currentBinding]

      /** Destinations are in a unique format, so it requires a different check */
      if (isFieldValueADestination(fieldValue)) {
        return (
          isFieldTouched &&
          fieldHasNoError &&
          (fieldValue as IDestinationFieldContextValue).lastChangeWasInternal
        )
      }

      return isFieldTouched && fieldHasNoError
    }, bindingsOfAllValues)
  }, [values, touched, errors])
}

export default useCheckFormValidity
