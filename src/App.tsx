import React from 'react'
import { ThemeProvider, Typography } from '@mui/material'
import theme from './config/theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Typography>Travel Buddy</Typography>
    </ThemeProvider>
  )
}
export default App
