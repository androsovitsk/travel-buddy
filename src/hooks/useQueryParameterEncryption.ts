import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import queryString from 'query-string'

/**
 * React hook to encode or decode query parameters.
 */
const useQueryParameterEncryption = () => {
  const navigate = useNavigate()

  /**
   * Callback function that encodes an object. Navigates the user to the error page if encoding resulted in an error.
   * @param {object} values - the object that will be encoded
   */
  const encode = useCallback(
    (values: { [key: string]: any }): string => {
      try {
        const stringifiedQueryParameters = queryString.stringify(values)
        return btoa(stringifiedQueryParameters)
      } catch {
        navigate('/error')
      }
    },
    [navigate]
  )

  /**
   * Callback function that decodes an object. Navigates the user to the error page if decoding resulted in an error.
   * @param {string} encodedString - the string that will be decoded
   */
  const decode = useCallback(
    (encodedString: string): { [key: string]: any } => {
      try {
        const decodedQueryParameters = atob(encodedString)
        return queryString.parse(decodedQueryParameters)
      } catch {
        navigate('/error')
      }
    },
    [navigate]
  )

  return { encode, decode }
}

export default useQueryParameterEncryption
