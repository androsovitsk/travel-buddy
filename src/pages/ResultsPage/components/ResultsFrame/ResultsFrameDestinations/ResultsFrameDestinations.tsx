import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import IResults from '../../../types/IResults'

interface IResultsFrameDestinationsProps {
  destinations: IResults['destinations']
}

const ResultsFrameDestinations: React.FC<IResultsFrameDestinationsProps> = ({
  destinations
}) => {
  return (
    <Grid container direction={'column'} alignItems={'center'} rowGap={3}>
      {destinations.map((current, index) => (
        <Typography key={index}>{current}</Typography>
      ))}
    </Grid>
  )
}

ResultsFrameDestinations.displayName = 'ResultsFrameDestinations'

export default ResultsFrameDestinations
