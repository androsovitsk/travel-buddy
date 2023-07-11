import { useNavigate, useSearchParams } from 'react-router-dom'
import useQueryParameterEncryption from './useQueryParameterEncryption'
import testQueryParameters from '../fixtures/testQueryParameters'
import { renderHook } from '@testing-library/react'
import useNavigateWithQueryParameters from './useNavigateWithQueryParameters'

jest.mock('./useQueryParameterEncryption')
const useQueryParameterEncryptionMock = useQueryParameterEncryption as jest.Mock

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn()
}))

const useNavigateMock = useNavigate as jest.Mock
const useSearchParamsMock = useSearchParams as jest.Mock

const navigateMock = jest.fn()

const testUrl = 'testURL'
const testEncodedString = 'encodedString'

describe('useNavigateWithQueryParameters', () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock)

    useSearchParamsMock.mockReturnValue([{ get: () => jest.fn() }])

    useQueryParameterEncryptionMock.mockReturnValue({
      encode: () => testEncodedString,
      decode: () => testQueryParameters
    })
  })

  it('should navigate to the URL when includeQueryParameters is false', () => {
    const { result } = renderHook(() => useNavigateWithQueryParameters())

    result.current(testUrl, false)

    expect(navigateMock).toHaveBeenCalledWith(testUrl)
  })

  it('should navigate to the URL and append the provided query parameters', () => {
    const { result } = renderHook(() => useNavigateWithQueryParameters())

    result.current(testUrl, true, testQueryParameters)

    expect(navigateMock).toHaveBeenCalledWith(
      `${testUrl}?q=${testEncodedString}`
    )
  })

  it("should navigate to the URL when the 'q' search parameter can not be obtained", () => {
    useSearchParamsMock.mockReturnValue([{ get: () => null }])

    const { result } = renderHook(() => useNavigateWithQueryParameters())

    result.current(testUrl)

    expect(navigateMock).toHaveBeenCalledWith(testUrl)
  })

  it('should navigate to the URL when the query parameters are not in the correct format', () => {
    useQueryParameterEncryptionMock.mockReturnValue({
      encode: () => testEncodedString,
      decode: () => {}
    })

    const { result } = renderHook(() => useNavigateWithQueryParameters())

    result.current(testUrl)

    expect(navigateMock).toHaveBeenCalledWith(testUrl)
  })

  it('should navigate to the URL and append the query parameters when everything is right', () => {
    useSearchParamsMock.mockReturnValue([{ get: () => testEncodedString }])

    const { result } = renderHook(() => useNavigateWithQueryParameters())

    result.current(testUrl)

    expect(navigateMock).toHaveBeenCalledWith(
      `${testUrl}?q=${testEncodedString}`
    )
  })
})
