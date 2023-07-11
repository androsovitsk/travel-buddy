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
import useDestinationField from './hooks/useDestinationField'

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
    errors
  } = useFormikContext<ISearchFormValues>()

  const {
    handleOnValueChange,
    handleOnClearButtonClick,
    handleOnMenuItemClick
  } = useDestinationField(binding, popper.handleClose)

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
            id={`destination-field-${
              (fieldValue as IDestinationFieldContextValue).order
            }`}
            label={label}
            value={(fieldValue as IDestinationFieldContextValue).value}
            error={!isNil(path([binding], errors))}
            helperText={path([binding], errors) as string}
            onChange={handleOnValueChange}
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
                        onClick={handleOnClearButtonClick}
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
            onMenuItemClick={handleOnMenuItemClick}
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
