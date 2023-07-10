import React, { useMemo } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import DestinationField from './components/DestinationField/DestinationField'
import AddDestinationField from './components/AddDestinationField/AddDestinationField'
import { CircleOutlined, PlaceOutlined } from '@mui/icons-material'
import { useFormikContext } from 'formik'
import useGetSortedDestinationBindings from './hooks/useGetSortedDestinationBindings'
import ISearchFormValues from '../../types/ISearchFormValues'
import { equals } from 'ramda'

const DestinationPlanner: React.FC = () => {
  const { values } = useFormikContext<ISearchFormValues>()
  const getSortedDestinationBindings = useGetSortedDestinationBindings()

  const destinations = useMemo(
    () => getSortedDestinationBindings(values),
    [values, getSortedDestinationBindings]
  )

  return (
    <Grid container rowGap={3}>
      {destinations.map(
        (binding, index) => (
          <DestinationField
            key={binding}
            binding={binding}
            label={equals(index, 0) ? 'City of origin' : 'City of destination'}
            icon={
              equals(index, destinations.length - 1) ? (
                <PlaceOutlined color={'error'} />
              ) : (
                <CircleOutlined />
              )
            }
            fieldErrorMessage={
              equals(index, 0)
                ? 'You must choose the city of origin.'
                : 'You must choose the city of destination.'
            }
            removable={equals(index, 0) ? false : destinations.length > 2}
          />
        ),
        destinations
      )}
      <AddDestinationField />
    </Grid>
  )
}

DestinationPlanner.displayName = 'DestinationPlanner'

export default DestinationPlanner
