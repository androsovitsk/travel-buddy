import React from 'react'
import Layout from '../../components/Layout/Layout'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import useNavigateWithQueryParameters from '../../hooks/useNavigateWithQueryParameters'

const ErrorPage: React.FC = () => {
  const navigate = useNavigateWithQueryParameters()

  return (
    <Layout>
      <Grid container direction={'column'} alignItems={'center'} rowGap={3}>
        <Typography sx={{ fontWeight: 600 }} color={'primary'}>
          Ooops! Something went wrong!
        </Typography>
        <Button
          variant={'contained'}
          color={'secondary'}
          onClick={() => navigate('/', false)}
        >
          Back
        </Button>
      </Grid>
    </Layout>
  )
}

ErrorPage.displayName = 'ErrorPage'

export default ErrorPage
