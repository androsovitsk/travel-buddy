import React from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { AddCircleOutlined, RemoveCircleOutlined } from '@mui/icons-material'
import { useFormikContext } from 'formik'
import useFieldErrors from '../../../../../../hooks/useFieldErrors'
import ISearchFormValues from '../../../../types/ISearchFormValues'
import { isNil, path } from 'ramda'

interface IPassengerCountFieldProps {
  binding: string
  fieldErrorMessage: string
}

const PassengerCountField: React.FC<IPassengerCountFieldProps> = ({
  binding,
  fieldErrorMessage
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
    <TextField
      fullWidth
      size={'small'}
      name={binding}
      label={'Passengers'}
      value={fieldValue}
      error={!isNil(path([binding], errors))}
      helperText={path([binding], errors) as string}
      InputProps={{
        sx: { '& input': { textAlign: 'center' } },
        startAdornment: (
          <InputAdornment position={'start'}>
            <IconButton
              color={'primary'}
              size={'small'}
              disabled={fieldValue === 0}
              onClick={() =>
                setFieldValue(
                  binding,
                  (fieldValue as ISearchFormValues['numberOfPassengers']) - 1
                )
              }
            >
              <RemoveCircleOutlined fontSize='inherit' />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position={'end'}>
            <IconButton
              color={'primary'}
              size={'small'}
              onClick={() =>
                setFieldValue(
                  binding,
                  (fieldValue as ISearchFormValues['numberOfPassengers']) + 1
                ).then(() => {
                  if (!isFieldTouched) {
                    setFieldTouched(binding, true)
                  }
                })
              }
            >
              <AddCircleOutlined fontSize='inherit' />
            </IconButton>
          </InputAdornment>
        )
      }}
      disabled
    />
  )
}

export default PassengerCountField
