import { render, screen } from '@testing-library/react'
import ResultsDescription from './ResultsDescription'
import testResults from '../../fixtures/testResults'
import { format } from 'date-fns'

const defaultProps = {
  totalDistance: testResults.totalDistance,
  numberOfPassengers: testResults.numberOfPassengers,
  selectedDate: testResults.selectedDate
}

describe('ResultsDescription', () => {
  it('should render the total distance', () => {
    render(<ResultsDescription {...defaultProps} />)

    const totalDistanceElement = screen.getByText(
      `${testResults.totalDistance} km`
    )

    expect(totalDistanceElement).toBeInTheDocument()

    const totalDistancePostElement = screen.getByText('is total distance')
    expect(totalDistancePostElement).toBeInTheDocument()
  })

  it('should render the number of passengers', () => {
    render(<ResultsDescription {...defaultProps} />)

    const numberOfPassengersElement = screen.getByText(
      testResults.numberOfPassengers
    )

    expect(numberOfPassengersElement).toBeInTheDocument()

    const numberOfPassengersPostElement = screen.getByText('passengers')
    expect(numberOfPassengersPostElement).toBeInTheDocument()
  })

  it('should render selected date', () => {
    render(<ResultsDescription {...defaultProps} />)

    const formattedDate = format(testResults.selectedDate, 'MMM dd, yyyy')

    const selectedDateElement = screen.getByText(formattedDate)
    expect(selectedDateElement).toBeInTheDocument()
  })
})
