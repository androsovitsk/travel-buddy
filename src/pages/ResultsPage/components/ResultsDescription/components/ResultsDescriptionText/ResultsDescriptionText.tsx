import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface IResultsDescriptionTextProps {
  firstText: string
  secondText?: string
}

const ResultsDescriptionText: React.FC<IResultsDescriptionTextProps> = ({
  firstText,
  secondText
}) => {
  return (
    <Box sx={{ display: 'inline' }}>
      <Typography sx={{ fontWeight: 600 }} color={'primary'} component='span'>
        {firstText}
      </Typography>
      {secondText && (
        <Typography display={'inline'} component='span'>
          {secondText}
        </Typography>
      )}
    </Box>
  )
}

ResultsDescriptionText.displayName = 'ResultsDescriptionText'

export default ResultsDescriptionText
