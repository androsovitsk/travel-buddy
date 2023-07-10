import React from 'react'
import Layout from '../../components/Layout/Layout'
import Grid from '@mui/material/Unstable_Grid2'
import CircularProgress from '@mui/material/CircularProgress'
import ResultsFrame from './components/ResultsFrame/ResultsFrame'
import ResultsDescription from './components/ResultsDescription/ResultsDescription'
import BackToSearchPageButton from './components/BackToSearchPageButton/BackToSearchPageButton'
import useFetchResults from './hooks/useFetchResults'
import { isNotNil } from 'ramda'
import Typography from '@mui/material/Typography'

const ResultsPage: React.FC = () => {
  const { isLoading, errorMessage, results } = useFetchResults()

  return (
    <Layout>
      <Grid container direction={'column'} alignItems={'center'} rowGap={3}>
        {isLoading ? (
          <CircularProgress color={'primary'} />
        ) : isNotNil(errorMessage) ? (
          <Typography
            sx={{ fontWeight: 600 }}
            color={'primary'}
            textAlign={'center'}
          >
            {errorMessage}
          </Typography>
        ) : (
          <React.Fragment>
            <ResultsFrame
              destinations={results.destinations}
              distances={results.distances}
            />
            <ResultsDescription
              totalDistance={results.totalDistance}
              numberOfPassengers={results.numberOfPassengers}
              selectedDate={results.selectedDate}
            />
          </React.Fragment>
        )}
        <BackToSearchPageButton />
      </Grid>
    </Layout>
  )
}

ResultsPage.displayName = 'ResultsPage'

export default ResultsPage
