import { v4 } from 'uuid'
import testRandomizedBinding from '../fixtures/testRandomizedBinding'
import { renderHook } from '@testing-library/react'
import useHandleSearchForm from './useHandleSearchForm'
import { useSearchParams } from 'react-router-dom'
import useNavigateWithQueryParameters from '../../../../../hooks/useNavigateWithQueryParameters'
import useQueryParameterEncryption from '../../../../../hooks/useQueryParameterEncryption'
import testQueryParameters from '../../../../../fixtures/testQueryParameters'
import { testEncodedString } from '../../../../../setupTests'
import testSearchFormValues from '../../../fixtures/testSearchFormValues'

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: jest.fn()
}))

const v4Mock = v4 as jest.Mock

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn()
}))

const useSearchParamsMock = useSearchParams as jest.Mock

jest.mock('../../../../../hooks/useNavigateWithQueryParameters')
const useNavigateWithQueryParametersMock =
  useNavigateWithQueryParameters as jest.Mock

jest.mock('../../../../../hooks/useQueryParameterEncryption')
const useQueryParameterEncryptionMock = useQueryParameterEncryption as jest.Mock

describe('useHandleSearchForm', () => {
  beforeEach(() => {
    v4Mock.mockReturnValue(testRandomizedBinding)

    useSearchParamsMock.mockReturnValue([{ get: () => testEncodedString }])

    useQueryParameterEncryptionMock.mockReturnValue({
      decode: () => testQueryParameters
    })
  })

  it("should return the generated initial values and the empty initial touched if there is no 'q' search param", () => {
    useSearchParamsMock.mockReturnValue([{ get: () => null }])

    const { result } = renderHook(() => useHandleSearchForm())

    expect(result.current.initialValues).toStrictEqual({
      [testRandomizedBinding]: {
        lastChangeWasInternal: true,
        order: 1,
        value: ''
      },
      numberOfPassengers: 0,
      selectedDate: null
    })

    expect(result.current.initialTouched).toStrictEqual({})
  })

  it('should navigate to the error page if query parameters are not in the correct format', () => {
    const navigateMock = jest.fn()
    useNavigateWithQueryParametersMock.mockReturnValue(navigateMock)

    useQueryParameterEncryptionMock.mockReturnValue({
      decode: () => {}
    })

    renderHook(() => useHandleSearchForm())

    expect(navigateMock).toHaveBeenCalledWith('/error', false)
  })

  it('should generate the correct initial form state and initial touched if query parameters are found in the search params', () => {
    const { result } = renderHook(() => useHandleSearchForm())

    expect(result.current.initialValues).toStrictEqual({
      [testRandomizedBinding]: {
        value: 'Lyon',
        order: 1,
        lastChangeWasInternal: true
      },
      numberOfPassengers: 1,
      selectedDate: new Date(testQueryParameters.selectedDate)
    })

    expect(result.current.initialTouched).toStrictEqual({
      [testRandomizedBinding]: true,
      numberOfPassengers: true,
      selectedDate: true
    })
  })

  it('should return an onSubmit function that navigates to the results page', () => {
    useSearchParamsMock.mockReturnValue([{ get: () => null }])

    const navigateMock = jest.fn()
    useNavigateWithQueryParametersMock.mockReturnValue(navigateMock)

    const { result } = renderHook(() => useHandleSearchForm())

    result.current.onSubmit(testSearchFormValues)

    expect(navigateMock).toHaveBeenCalledWith(
      '/results',
      true,
      testQueryParameters
    )
  })
})
