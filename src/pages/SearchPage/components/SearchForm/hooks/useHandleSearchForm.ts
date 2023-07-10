import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useQueryParameterEncryption from '../../../../../hooks/useQueryParameterEncryption'
import useGetSortedDestinationValues from './useGetSortedDestinationValues'
import useNavigateWithQueryParameters from '../../../../../hooks/useNavigateWithQueryParameters'
import { FormikTouched, FormikValues } from 'formik'
import ISearchFormValues from '../../../types/ISearchFormValues'
import IQueryParameters from '../../../../../types/IQueryParameters'
import { formatISO } from 'date-fns'
import { isNotNil } from 'ramda'
import areQueryParametersInTheCorrectFormat from '../../../../../utilities/areQueryParametersInTheCorrectFormat'
import generateInitialValues from '../utilities/generateInitialValues'
import generateInitialFormStateFromQueryParameters from '../utilities/generateInitialFormStateFromQueryParameters'

/**
 * React hook that is used for handling the initial state of the form and the submission process.
 */
const useHandleSearchForm = () => {
  const [initialValues, setInitialValues] = useState<ISearchFormValues>(
    generateInitialValues()
  )

  const [initialTouched, setInitialTouched] = useState<
    FormikTouched<ISearchFormValues>
  >({})

  const [searchParams] = useSearchParams()
  const { decode } = useQueryParameterEncryption()

  const navigate = useNavigateWithQueryParameters()
  const getSortedDestinationValues = useGetSortedDestinationValues()

  const onSubmit = useCallback(
    (values: FormikValues) => {
      const destinations = getSortedDestinationValues(
        values as ISearchFormValues
      )

      const queryParameters = {
        destinations,
        numberOfPassengers: values.numberOfPassengers,
        selectedDate: formatISO(values.selectedDate, { representation: 'date' })
      }

      navigate('/results', true, queryParameters)
    },
    [navigate, getSortedDestinationValues]
  )

  useEffect(() => {
    const queryParameters = searchParams.get('q')

    if (isNotNil(queryParameters)) {
      const decodedQueryParameters = decode(queryParameters)

      if (areQueryParametersInTheCorrectFormat(decodedQueryParameters)) {
        const generatedInitialState =
          generateInitialFormStateFromQueryParameters(
            decodedQueryParameters as IQueryParameters
          )

        setInitialValues(
          generatedInitialState.initialValues as ISearchFormValues
        )

        setInitialTouched(generatedInitialState.initialTouched)
      } else {
        navigate('/error', false)
      }
    }
  }, [searchParams, decode, navigate])

  return { initialValues, initialTouched, onSubmit }
}

export default useHandleSearchForm
