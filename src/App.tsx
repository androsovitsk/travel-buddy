import React from 'react'
import SearchPage from './pages/SearchPage/SearchPage'
import ResultsPage from './pages/ResultsPage/ResultsPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import theme from './config/theme'

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SearchPage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/results',
      element: <ResultsPage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/error',
      element: <ErrorPage />
    }
  ])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

App.displayName = 'App'

export default App
