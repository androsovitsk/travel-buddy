import React from 'react'
import Layout from '../../components/Layout/Layout'
import SearchForm from './components/SearchForm/SearchForm'
import Grid from '@mui/material/Unstable_Grid2'
import DestinationPlanner from './components/DestinationPlanner/DestinationPlanner'
import DetailsPlanner from './components/DetailsPlanner/DetailsPlanner'
import SubmitButton from './components/SubmitButton/SubmitButton'

const SearchPage: React.FC = () => {
  return (
    <Layout>
      <SearchForm>
        <Grid container rowGap={3}>
          <Grid xs={12} md={9}>
            <DestinationPlanner />
          </Grid>
          <Grid xs={12} md={3}>
            <DetailsPlanner />
          </Grid>
          <Grid xs={12}>
            <SubmitButton />
          </Grid>
        </Grid>
      </SearchForm>
    </Layout>
  )
}

SearchPage.displayName = 'SearchPage'

export default SearchPage
