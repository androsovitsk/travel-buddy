import React from 'react'
import { renderHook } from '@testing-library/react'
import useDestinationField from './useDestinationField'
import { useFormikContext } from 'formik'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock
const setFieldValueMock = jest.fn()
const setFieldTouchedMock = jest.fn()

const testBinding = 'testDestinationFieldBinding'

const testValue = {
  value: 'Paris',
  order: 0,
  lastChangeWasInternal: true
}

const baseFormikContextProps = {
  values: { [testBinding]: testValue },
  touched: { [testBinding]: false },
  setFieldValue: setFieldValueMock,
  setFieldTouched: setFieldTouchedMock
}

describe('useDestinationField', () => {
  beforeEach(() => {
    useFormikContextMock.mockReturnValue(baseFormikContextProps)
  })

  it('should set the field value on change event and trigger the setFieldTouched when the field is not touched', () => {
    const { result } = renderHook(() =>
      useDestinationField(testBinding, jest.fn())
    )

    const testTargetValue = 'Lyon'

    result.current.handleOnValueChange({
      target: { value: testTargetValue }
    } as React.ChangeEvent<HTMLInputElement>)

    expect(setFieldValueMock).toHaveBeenCalledWith(testBinding, {
      value: testTargetValue,
      order: testValue.order,
      lastChangeWasInternal: false
    })

    expect(setFieldTouchedMock).toHaveBeenCalledWith(testBinding, true)
  })

  it('should not trigger the setFieldTouched on change when the field is already touched', () => {
    useFormikContextMock.mockReturnValue({
      ...baseFormikContextProps,
      touched: { [testBinding]: true }
    })

    const { result } = renderHook(() =>
      useDestinationField(testBinding, jest.fn())
    )

    result.current.handleOnValueChange({
      target: { value: 'Lyon' }
    } as React.ChangeEvent<HTMLInputElement>)

    expect(setFieldTouchedMock).not.toHaveBeenCalled()
  })

  it('should set the field value on clear button click', () => {
    const { result } = renderHook(() =>
      useDestinationField(testBinding, jest.fn())
    )

    result.current.handleOnClearButtonClick()

    expect(setFieldValueMock).toHaveBeenCalledWith(testBinding, {
      value: '',
      order: testValue.order,
      lastChangeWasInternal: true
    })
  })

  it('should set the field value and close the popper on menu item click', () => {
    const handleCloseMock = jest.fn()

    const { result } = renderHook(() =>
      useDestinationField(testBinding, handleCloseMock)
    )

    const testOption = 'Lyon'
    result.current.handleOnMenuItemClick(testOption)

    expect(setFieldValueMock).toHaveBeenCalledWith(testBinding, {
      value: testOption,
      order: testValue.order,
      lastChangeWasInternal: true
    })

    expect(handleCloseMock).toHaveBeenCalled()
  })
})
