import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import PassengerCountField from './components/PassengerCountField/PassengerCountField'
import DateField from './components/DateField/DateField'

const DetailsPlanner: React.FC = () => {
  return (
    <Grid container direction={'column'} rowGap={3}>
      <PassengerCountField
        binding={'numberOfPassengers'}
        fieldErrorMessage={'You must provide a number that is higher than 0.'}
      />
      <DateField
        binding={'selectedDate'}
        fieldErrorMessage={'You must provide a date in the future.'}
      />
    </Grid>
  )
}

DetailsPlanner.displayName = 'DetailsPlanner'

export default DetailsPlanner
