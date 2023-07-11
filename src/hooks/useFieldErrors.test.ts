import { useFormikContext } from 'formik'
import { renderHook } from '@testing-library/react'
import useFieldErrors from './useFieldErrors'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock
const setFieldErrorMock = jest.fn()

const testBinding = 'testBinding'
const testErrorMessage = 'Error message'

describe('useFieldErrors', () => {
  it('should reset the errors', () => {
    useFormikContextMock.mockReturnValue({
      values: { [testBinding]: testBinding },
      touched: { [testBinding]: false },
      setFieldError: setFieldErrorMock
    })

    renderHook(() => useFieldErrors(testBinding, testErrorMessage))

    expect(setFieldErrorMock).toHaveBeenCalledWith(testBinding, undefined)
  })

  it('should not set the error message when the field is not a valid value', () => {
    useFormikContextMock.mockReturnValue({
      values: { [testBinding]: null },
      touched: { [testBinding]: false },
      setFieldError: setFieldErrorMock
    })

    renderHook(() => useFieldErrors(testBinding, testErrorMessage))

    expect(setFieldErrorMock).not.toHaveBeenCalledWith(
      testBinding,
      testErrorMessage
    )
  })

  it('should not set the error message when the field is not yet touched', () => {
    useFormikContextMock.mockReturnValue({
      values: { [testBinding]: testBinding },
      touched: { [testBinding]: false },
      setFieldError: setFieldErrorMock
    })

    renderHook(() => useFieldErrors(testBinding, testErrorMessage))

    expect(setFieldErrorMock).not.toHaveBeenCalledWith(
      testBinding,
      testErrorMessage
    )
  })

  it('should set the error message when the field is a not valid value and has been touched', () => {
    useFormikContextMock.mockReturnValue({
      values: { [testBinding]: null },
      touched: { [testBinding]: true },
      setFieldError: setFieldErrorMock
    })

    renderHook(() => useFieldErrors(testBinding, testErrorMessage))

    expect(setFieldErrorMock).toHaveBeenCalledWith(
      testBinding,
      testErrorMessage
    )
  })
})
