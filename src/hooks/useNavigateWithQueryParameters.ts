import { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useQueryParameterEncryption from './useQueryParameterEncryption'
import IQueryParameters from '../types/IQueryParameters'
import { isNil } from 'ramda'
import areQueryParametersInTheCorrectFormat from '../utilities/areQueryParametersInTheCorrectFormat'

/**
 * React hook to navigate between routes.
 */
const useNavigateWithQueryParameters = () => {
  const [searchParams] = useSearchParams()
  const { encode, decode } = useQueryParameterEncryption()
  const navigate = useNavigate()

  /**
   * Callback function that navigates the user to a URL. It can also append query parameters
   * either from providing it or getting it from the 'q' search parameter.
   * @param {string} url - the URL to navigate to
   * @param {boolean} includeQueryParameters - whether we want to append query parameters, defaults to true
   * @param {IQueryParameters} providedQueryParameters - the provided query parameters to append
   */
  return useCallback(
    (
      url: string,
      includeQueryParameters: boolean = true,
      providedQueryParameters?: IQueryParameters
    ) => {
      /** If query parameters should not be included just navigate to the URL. */
      if (!includeQueryParameters) {
        navigate(url)
      } else {
        /** If query parameters are provided encode them and navigate to the URL. */
        if (providedQueryParameters) {
          const encodedQueryParameters = encode(providedQueryParameters)
          navigate(`${url}?q=${encodedQueryParameters}`)
        } else {
          const queryParameters = searchParams.get('q')

          /** If the 'q' search parameter does not exist just navigate to the URL. */
          if (isNil(queryParameters)) {
            navigate(url)
          }

          const decodedQueryParameters = decode(queryParameters)

          /** If the decoded query parameters are not in the desired format just navigate to the URL. */
          if (!areQueryParametersInTheCorrectFormat(decodedQueryParameters)) {
            navigate(url)
          } else {
            /** If query parameters exist as a search parameter navigate to the URL and add them back. */
            navigate(`${url}?q=${queryParameters}`)
          }
        }
      }
    },
    [searchParams, encode, decode, navigate]
  )
}

export default useNavigateWithQueryParameters
