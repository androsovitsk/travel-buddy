import { createTheme } from '@mui/material'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 726,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    fontFamily: ['Comfortaa Variable', 'sans-serif'].join(',')
  },
  palette: {
    primary: {
      main: '#7786D2'
    },
    secondary: {
      main: '#374151'
    },
    info: {
      main: '#C7D1F4'
    },
    text: {
      primary: '#374151',
      secondary: '#374151',
      disabled: '#374151'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: () => ({
          textTransform: 'none'
        })
      }
    }
  }
})

export default theme
