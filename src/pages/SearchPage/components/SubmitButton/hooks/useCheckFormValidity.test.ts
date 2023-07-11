import { renderHook } from '@testing-library/react'
import useCheckFormValidity from './useCheckFormValidity'
import { useFormikContext } from 'formik'
import testSearchFormValues from '../../../fixtures/testSearchFormValues'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock

const testAllTouched = {
  thisIsTheFirstRandomizedBinding: false,
  thisIsTheSecondRandomizedBinding: true,
  numberOfPassengers: false,
  selectedDate: false
}

describe('useCheckFormValidity', () => {
  it('should return false when not all fields are touched', () => {
    useFormikContextMock.mockReturnValue({
      values: testSearchFormValues,
      touched: { ...testAllTouched, numberOfPassengers: false },
      errors: {}
    })

    const { result } = renderHook(() => useCheckFormValidity())

    expect(result.current).toStrictEqual(false)
  })

  it('should return false when any of the fields has an error', () => {
    useFormikContextMock.mockReturnValue({
      values: testSearchFormValues,
      touched: testAllTouched,
      errors: { numberOfPassengers: 'Something bad happened!' }
    })

    const { result } = renderHook(() => useCheckFormValidity())

    expect(result.current).toStrictEqual(false)
  })

  it("should return false when a destination's last change was not made by the system", () => {
    useFormikContextMock.mockReturnValue({
      values: {
        ...testSearchFormValues,
        thisIsTheFirstRandomizedBinding: {
          value: '',
          order: 0,
          lastChangeWasInternal: false
        }
      },
      touched: testAllTouched,
      errors: {}
    })

    const { result } = renderHook(() => useCheckFormValidity())

    expect(result.current).toStrictEqual(false)
  })

  it('should return true when a form is valid', () => {
    useFormikContextMock.mockReturnValue({
      values: testSearchFormValues,
      touched: testAllTouched,
      errors: {}
    })

    const { result } = renderHook(() => useCheckFormValidity())

    expect(result.current).toStrictEqual(false)
  })
})
