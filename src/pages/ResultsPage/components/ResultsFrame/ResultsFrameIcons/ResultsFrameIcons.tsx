import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { CircleOutlined, PlaceOutlined } from '@mui/icons-material'
import { equals } from 'ramda'

interface IResultsFrameIconsProps {
  numberOfIcons: number
}

const ResultsFrameIcons: React.FC<IResultsFrameIconsProps> = ({
  numberOfIcons
}) => {
  return (
    <Grid container direction={'column'} alignItems={'center'} rowGap={3}>
      {[...Array(numberOfIcons)].map((value, index) => (
        <React.Fragment key={index}>
          {equals(index, numberOfIcons - 1) ? (
            <PlaceOutlined color={'error'} />
          ) : (
            <CircleOutlined />
          )}
        </React.Fragment>
      ))}
    </Grid>
  )
}

ResultsFrameIcons.displayName = 'ResultsFrameIcons'

export default ResultsFrameIcons
