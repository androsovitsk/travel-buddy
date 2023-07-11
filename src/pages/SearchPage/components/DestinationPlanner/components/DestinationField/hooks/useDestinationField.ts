import React from 'react'
import { useCallback } from 'react'
import { useFormikContext } from 'formik'
import IDestinationFieldContextValue from '../../../types/IDestinationFieldContextValue'
import ISearchFormValues from '../../../../../types/ISearchFormValues'

const useDestinationField = (binding: string, handleClose: () => void) => {
  const {
    values: { [binding]: fieldValue },
    touched: { [binding]: isFieldTouched },
    setFieldValue,
    setFieldTouched
  } = useFormikContext<ISearchFormValues>()

  const handleOnValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(binding, {
        value: event.target.value,
        order: (fieldValue as IDestinationFieldContextValue).order,
        lastChangeWasInternal: false
      })

      if (!isFieldTouched) {
        setFieldTouched(binding, true)
      }
    },
    [binding, fieldValue, isFieldTouched, setFieldValue, setFieldTouched]
  )

  const handleOnClearButtonClick = useCallback(() => {
    setFieldValue(binding, {
      value: '',
      order: (fieldValue as IDestinationFieldContextValue).order,
      lastChangeWasInternal: true
    })
  }, [binding, fieldValue, setFieldValue])

  const handleOnMenuItemClick = useCallback(
    (optionName: string) => {
      setFieldValue(binding, {
        value: optionName,
        order: (fieldValue as IDestinationFieldContextValue).order,
        lastChangeWasInternal: true
      })

      handleClose()
    },
    [binding, fieldValue, setFieldValue, handleClose]
  )

  return {
    handleOnValueChange,
    handleOnClearButtonClick,
    handleOnMenuItemClick
  }
}

export default useDestinationField
