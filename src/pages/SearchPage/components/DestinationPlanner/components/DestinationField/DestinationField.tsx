import React from 'react'
import Box from '@mui/material/Box'
import DestinationPlannerFieldWrapper from '../DestinationPlannerFieldWrapper/DestinationPlannerFieldWrapper'
import CitySuggestionPopper from './components/CitySuggestionPopper/CitySuggestionPopper'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { Clear, HighlightOffOutlined } from '@mui/icons-material'
import { useFormikContext } from 'formik'
import usePopper from '../../../../../../hooks/usePopper'
import useFetchSuggestions from './hooks/useFetchSuggestions'
import useFieldErrors from '../../../../../../hooks/useFieldErrors'
import useHandleRemoveDestination from './hooks/useHandleRemoveDestination'
import ISearchFormValues from '../../../../types/ISearchFormValues'
import IDestinationFieldContextValue from '../../types/IDestinationFieldContextValue'
import { isNil, path } from 'ramda'
import isAValidValue from '../../../../../../utilities/isAValidValue'

interface IDestinationFieldProps {
  binding: string
  label: string
  icon: React.ReactNode
  fieldErrorMessage: string
  removable: boolean
}

const DestinationField: React.FC<IDestinationFieldProps> = ({
  binding,
  label,
  icon,
  fieldErrorMessage,
  removable
}) => {
  const popper = usePopper()

  const citySuggestion = useFetchSuggestions(
    binding,
    popper.handleOpen,
    popper.handleClose
  )

  const {
    values: { [binding]: fieldValue },
    touched: { [binding]: isFieldTouched },
    errors,
    setFieldValue,
    setFieldTouched
  } = useFormikContext<ISearchFormValues>()

  const handleOnRemoveDestination = useHandleRemoveDestination(binding)

  useFieldErrors(binding, fieldErrorMessage)

  return (
    <DestinationPlannerFieldWrapper
      startIcon={icon}
      field={
        <Box sx={{ width: '320px' }}>
          <TextField
            fullWidth
            size={'small'}
            ref={popper.ref}
            name={binding}
            label={label}
            value={(fieldValue as IDestinationFieldContextValue).value}
            error={!isNil(path([binding], errors))}
            helperText={path([binding], errors) as string}
            onChange={(event) => {
              setFieldValue(binding, {
                value: event.target.value,
                order: (fieldValue as IDestinationFieldContextValue).order,
                lastChangeWasInternal: false
              }).then(() => {
                if (!isFieldTouched) {
                  setFieldTouched(binding, true)
                }
              })
            }}
            {...(isAValidValue(
              (fieldValue as IDestinationFieldContextValue).value
            ) &&
              !citySuggestion.isLoading && {
                InputProps: {
                  endAdornment: (
                    <InputAdornment position={'end'}>
                      <IconButton
                        color={'primary'}
                        edge={'end'}
                        onClick={() =>
                          setFieldValue(binding, {
                            value: '',
                            order: (fieldValue as IDestinationFieldContextValue)
                              .order,
                            lastChangeWasInternal: true
                          })
                        }
                      >
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              })}
          />
          <CitySuggestionPopper
            anchorEl={popper.anchorEl}
            isOpen={popper.isOpen}
            isLoading={citySuggestion.isLoading}
            options={citySuggestion.options}
            onMenuItemClick={(optionName) =>
              setFieldValue(binding, {
                value: optionName,
                order: (fieldValue as IDestinationFieldContextValue).order,
                lastChangeWasInternal: true
              }).then(popper.handleClose)
            }
          />
        </Box>
      }
      {...(removable && {
        endIcon: (
          <IconButton
            size={'small'}
            color={'primary'}
            onClick={handleOnRemoveDestination}
          >
            <HighlightOffOutlined fontSize={'inherit'} />
          </IconButton>
        )
      })}
    />
  )
}

DestinationField.displayName = 'DestinationField'

export default DestinationField
