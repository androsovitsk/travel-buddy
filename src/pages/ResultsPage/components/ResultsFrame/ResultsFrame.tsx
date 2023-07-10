import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import ResultsFrameDistances from './ResultsFrameDistances/ResultsFrameDistances'
import ResultsFrameIcons from './ResultsFrameIcons/ResultsFrameIcons'
import ResultsFrameDestinations from './ResultsFrameDestinations/ResultsFrameDestinations'
import IResults from '../../types/IResults'

interface IResultsFrameProps {
  destinations: IResults['destinations']
  distances: IResults['distances']
}

const ResultsFrame: React.FC<IResultsFrameProps> = ({
  destinations,
  distances
}) => {
  return (
    <Grid container alignItems={'center'} columnGap={3}>
      <ResultsFrameDistances distances={distances} />
      <ResultsFrameIcons numberOfIcons={destinations.length} />
      <ResultsFrameDestinations destinations={destinations} />
    </Grid>
  )
}

ResultsFrame.displayName = 'Results'

export default ResultsFrame
