import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import ResultsDescriptionText from './components/ResultsDescriptionText/ResultsDescriptionText'
import IResults from '../../types/IResults'
import { format } from 'date-fns'

interface IResultsDescriptionProps {
  totalDistance: IResults['totalDistance']
  numberOfPassengers: IResults['numberOfPassengers']
  selectedDate: IResults['selectedDate']
}

const ResultsDescription: React.FC<IResultsDescriptionProps> = ({
  totalDistance,
  numberOfPassengers,
  selectedDate
}) => {
  return (
    <Grid container direction={'column'} alignItems={'center'} rowGap={1}>
      <ResultsDescriptionText
        firstText={`${totalDistance} km`}
        secondText={' is total distance'}
      />
      <ResultsDescriptionText
        firstText={numberOfPassengers.toString()}
        secondText={' passengers'}
      />
      <ResultsDescriptionText
        firstText={format(selectedDate, 'MMM dd, yyyy')}
      />
    </Grid>
  )
}

ResultsDescription.displayName = 'ResultsDescription'

export default ResultsDescription
