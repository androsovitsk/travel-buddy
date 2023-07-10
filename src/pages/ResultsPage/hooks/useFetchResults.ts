import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useQueryParameterEncryption from '../../../hooks/useQueryParameterEncryption'
import useResultsEndpoint from './useResultsEndpoint'
import IResults from '../types/IResults'
import IResultsAPIResponse from '../types/IResultsAPIResponse'
import { isNotNil } from 'ramda'
import convertResultsAPIResponse from '../utilities/convertResultsAPIResponse'

/**
 * React hook that is used to fetch results by getting them from the 'q' search parameter.
 * Returns a loading, error and results state if found.
 */
const useFetchResults = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [results, setResults] = useState<IResults | null>(null)

  const [searchParams] = useSearchParams()
  const { decode } = useQueryParameterEncryption()

  const fetchResultsEndpoint = useResultsEndpoint()

  useEffect(() => {
    setIsLoading(true)

    const queryParameters = searchParams.get('q')

    if (isNotNil(queryParameters)) {
      const decodedQueryParameters = decode(queryParameters)

      fetchResultsEndpoint(decodedQueryParameters)
        .then((results: IResultsAPIResponse) => {
          const convertedResponse = convertResultsAPIResponse(results)
          setResults(convertedResponse)
        })
        .catch((error: Error) => setErrorMessage(error.message))
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setErrorMessage('You must provide query parameters to show the results.')
    }
  }, [searchParams, decode, fetchResultsEndpoint])

  return { isLoading, errorMessage, results }
}

export default useFetchResults
