import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'

interface IDestinationPlannerFieldWrapperProps {
  startIcon: any
  field: React.ReactNode
  endIcon?: React.ReactNode
}

const DestinationPlannerFieldWrapper: React.FC<
  IDestinationPlannerFieldWrapperProps
> = ({ startIcon, field, endIcon }) => {
  return (
    <Grid container xs={12} columnGap={2}>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        {React.cloneElement(startIcon, {
          sx: { fontSize: 20 }
        })}
      </Grid>
      <Grid xs={8}>{field}</Grid>
      {endIcon && (
        <Grid container justifyContent={'center'} alignItems={'center'}>
          {endIcon}
        </Grid>
      )}
    </Grid>
  )
}

DestinationPlannerFieldWrapper.displayName = 'DestinationPlannerFieldWrapper'

export default DestinationPlannerFieldWrapper
