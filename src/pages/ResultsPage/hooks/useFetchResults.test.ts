import { act, renderHook } from '@testing-library/react'
import useFetchResults from './useFetchResults'
import { useSearchParams } from 'react-router-dom'
import useQueryParameterEncryption from '../../../hooks/useQueryParameterEncryption'
import testQueryParameters from '../../../fixtures/testQueryParameters'
import { testEncodedString } from '../../../setupTests'
import testResults from '../fixtures/testResults'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn()
}))

const useSearchParamsMock = useSearchParams as jest.Mock

jest.mock('../../../hooks/useQueryParameterEncryption')
const useQueryParameterEncryptionMock = useQueryParameterEncryption as jest.Mock

describe('useFetchResults', () => {
  beforeEach(() => {
    useQueryParameterEncryptionMock.mockReturnValue({
      decode: () => testQueryParameters
    })
  })

  it('should set the loading state to false and set an error message when search params do not exist', () => {
    useSearchParamsMock.mockReturnValue([{ get: () => null }])

    const { result } = renderHook(() => useFetchResults())

    expect(result.current.isLoading).toStrictEqual(false)

    expect(result.current.errorMessage).toStrictEqual(
      'You must provide query parameters to show the results.'
    )
  })

  it('should call the decode function with the encoded string', async () => {
    useSearchParamsMock.mockReturnValue([{ get: () => testEncodedString }])

    const decodeMock = jest.fn()
    useQueryParameterEncryptionMock.mockReturnValue({ decode: decodeMock })

    await act(() => renderHook(() => useFetchResults()))

    expect(decodeMock).toHaveBeenCalledWith(testEncodedString)
  })

  it('should return the fetched results', async () => {
    useSearchParamsMock.mockReturnValue([{ get: () => testEncodedString }])

    useQueryParameterEncryptionMock.mockReturnValue({
      decode: () => testQueryParameters
    })

    const { result } = await act(() => renderHook(() => useFetchResults()))

    setTimeout(() => {
      expect(result.current.results).toStrictEqual(testResults)
    }, 1000)
  })

  it('should set the error message', async () => {
    useSearchParamsMock.mockReturnValue([{ get: () => testEncodedString }])

    useQueryParameterEncryptionMock.mockReturnValue({
      decode: () => ({
        ...testQueryParameters,
        destinations: ['Paris', 'Dijon']
      })
    })

    const { result } = await act(() => renderHook(() => useFetchResults()))

    setTimeout(() => {
      expect(result.current.errorMessage).toStrictEqual(
        'Oops! Something went wrong!'
      )
    }, 1000)
  })
})
