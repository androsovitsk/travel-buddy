import { render, screen } from '@testing-library/react'
import ResultsPage from './ResultsPage'
import useFetchResults from './hooks/useFetchResults'
import ResultsFrame from './components/ResultsFrame/ResultsFrame'
import ResultsDescription from './components/ResultsDescription/ResultsDescription'
import testResults from './fixtures/testResults'

jest.mock('./hooks/useFetchResults')
const useFetchResultsMock = useFetchResults as jest.Mock

jest.mock('../../hooks/useNavigateWithQueryParameters')

jest.mock('./components/ResultsFrame/ResultsFrame')
const ResultsFrameMock = ResultsFrame as jest.Mock

jest.mock('./components/ResultsDescription/ResultsDescription')
const ResultsDescriptionMock = ResultsDescription as jest.Mock

describe('ResultsPage', () => {
  it('render the loading progress bar when the data is still loading', () => {
    useFetchResultsMock.mockReturnValue({
      isLoading: true,
      errorMessage: null,
      results: null
    })

    render(<ResultsPage />)

    const progressBarElement = screen.getByRole('progressbar')
    expect(progressBarElement).toBeInTheDocument()
  })

  it('should render the error message when an error happened', () => {
    const testErrorText = 'This is a test error message.'

    useFetchResultsMock.mockReturnValue({
      isLoading: false,
      errorMessage: testErrorText,
      results: null
    })

    render(<ResultsPage />)

    const errorElement = screen.getByText(testErrorText)
    expect(errorElement).toBeInTheDocument()
  })

  it('should render the ResultsFrame and ResultsDescription components when results are available', () => {
    useFetchResultsMock.mockReturnValue({
      isLoading: false,
      errorMessage: null,
      results: testResults
    })

    render(<ResultsPage />)

    expect(ResultsFrameMock).toHaveBeenCalledWith(
      {
        destinations: testResults.destinations,
        distances: testResults.distances
      },
      {}
    )

    expect(ResultsDescriptionMock).toHaveBeenCalledWith(
      {
        totalDistance: testResults.totalDistance,
        numberOfPassengers: testResults.numberOfPassengers,
        selectedDate: testResults.selectedDate
      },
      {}
    )
  })
})
