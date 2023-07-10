import React from 'react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import useFieldErrors from '../../../../../../hooks/useFieldErrors'
import { useFormikContext } from 'formik'
import ISearchFormValues from '../../../../types/ISearchFormValues'
import { isNil, path } from 'ramda'

interface IDateFieldProps extends DatePickerProps<any> {
  binding: string
  fieldErrorMessage: string
}

const DateField: React.FC<IDateFieldProps> = ({
  binding,
  fieldErrorMessage,
  ...props
}) => {
  const {
    values: { [binding]: fieldValue },
    touched: { [binding]: isFieldTouched },
    errors,
    setFieldValue,
    setFieldTouched
  } = useFormikContext<ISearchFormValues>()

  useFieldErrors(binding, fieldErrorMessage)

  return (
    <DatePicker
      label={'Date'}
      value={fieldValue}
      slotProps={{
        textField: {
          fullWidth: true,
          size: 'small',
          helperText: path([binding], errors) as string,
          error: !isNil(path([binding], errors))
        }
      }}
      onChange={(newValue) => {
        setFieldValue(binding, newValue).then(() => {
          if (!isFieldTouched) {
            setFieldTouched(binding, true)
          }
        })
      }}
      {...props}
    />
  )
}

DateField.displayName = 'DateField'

export default DateField
