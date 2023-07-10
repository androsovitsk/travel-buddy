import React from 'react'
import DestinationPlannerFieldWrapper from '../DestinationPlannerFieldWrapper/DestinationPlannerFieldWrapper'
import Button from '@mui/material/Button'
import { AddCircleOutline } from '@mui/icons-material'
import useHandleAddNewDestination from './hooks/useHandleAddNewDestination'

const AddDestinationField: React.FC = () => {
  const handleOnClick = useHandleAddNewDestination()

  return (
    <DestinationPlannerFieldWrapper
      startIcon={<AddCircleOutline color={'primary'} />}
      field={<Button onClick={handleOnClick}>Add destination</Button>}
    />
  )
}

AddDestinationField.displayName = 'AddDestinationField'

export default AddDestinationField
