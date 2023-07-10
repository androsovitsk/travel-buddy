import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
// @ts-ignore
import background from '../../assets/background.jpg'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Paper
        elevation={3}
        sx={{
          width: '726px',
          padding: (theme) => `${theme.spacing(6)} ${theme.spacing(12)}`
        }}
      >
        {children}
      </Paper>
    </Grid>
  )
}

Layout.displayName = 'Layout'

export default Layout
