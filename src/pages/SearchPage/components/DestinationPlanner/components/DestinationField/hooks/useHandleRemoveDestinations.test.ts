import { useFormikContext } from 'formik'
import testSearchFormValues from '../../../../../fixtures/testSearchFormValues'
import { renderHook } from '@testing-library/react'
import useHandleRemoveDestination from './useHandleRemoveDestination'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock

describe('useHandleRemoveDestinations', () => {
  it('should remove the destination by setting the field value', async () => {
    const testBinding = 'thisIsTheFirstRandomizedBinding'

    const setFieldValueMock = jest.fn()

    useFormikContextMock.mockReturnValue({
      values: testSearchFormValues,
      setFieldValue: setFieldValueMock
    })

    const { result } = renderHook(() =>
      useHandleRemoveDestination('thisIsTheFirstRandomizedBinding')
    )

    await result.current()
    expect(setFieldValueMock).toHaveBeenCalledWith(testBinding, undefined)
  })
})
