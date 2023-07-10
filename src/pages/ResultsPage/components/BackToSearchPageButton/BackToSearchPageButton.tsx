import React from 'react'
import Button from '@mui/material/Button'
import useNavigateWithQueryParameters from '../../../../hooks/useNavigateWithQueryParameters'

const BackToSearchPageButton: React.FC = () => {
  const navigate = useNavigateWithQueryParameters()

  return (
    <Button
      variant={'contained'}
      color={'secondary'}
      onClick={() => navigate('/')}
    >
      Back
    </Button>
  )
}

BackToSearchPageButton.displayName = 'BackToSearchPageButton'

export default BackToSearchPageButton
