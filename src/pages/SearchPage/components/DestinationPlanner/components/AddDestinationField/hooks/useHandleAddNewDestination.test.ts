import { renderHook } from '@testing-library/react'
import useHandleAddNewDestination from './useHandleAddNewDestination'
import { useFormikContext } from 'formik'
import testSearchFormValues from '../../../../../fixtures/testSearchFormValues'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock

const setFieldValueMock = jest.fn()

describe('useHandleAddNewDestination', () => {
  it('should add a new destination by setting the field value', () => {
    useFormikContextMock.mockReturnValue({
      values: testSearchFormValues,
      setFieldValue: setFieldValueMock
    })

    const { result } = renderHook(() => useHandleAddNewDestination())

    result.current()

    expect(setFieldValueMock).toHaveBeenCalledWith(expect.anything(), {
      value: '',
      order: 2,
      lastChangeWasInternal: true
    })
  })
})
