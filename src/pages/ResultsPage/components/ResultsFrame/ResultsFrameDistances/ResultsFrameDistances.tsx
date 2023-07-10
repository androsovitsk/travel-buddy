import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IResults from '../../../types/IResults'

interface IResultsFrameDistancesProps {
  distances: IResults['distances']
}

const ResultsFrameDistances: React.FC<IResultsFrameDistancesProps> = ({
  distances
}) => {
  return (
    <Grid container direction={'column'} alignItems={'center'} rowGap={1}>
      {distances.map((current, index) => (
        <Box
          key={index}
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: 'primary.main',
            padding: 1
          }}
        >
          <Typography color={'primary'}>{`${current} km`}</Typography>
        </Box>
      ))}
    </Grid>
  )
}

ResultsFrameDistances.displayName = 'ResultsFrameDistances'

export default ResultsFrameDistances
