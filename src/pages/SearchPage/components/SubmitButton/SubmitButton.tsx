import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import useCheckFormValidity from './hooks/useCheckFormValidity'

const SubmitButton: React.FC = () => {
  const isFormValid = useCheckFormValidity()

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Button variant={'contained'} type={'submit'} disabled={!isFormValid}>
        Submit
      </Button>
    </Grid>
  )
}

SubmitButton.displayName = 'SubmitButton'

export default SubmitButton
