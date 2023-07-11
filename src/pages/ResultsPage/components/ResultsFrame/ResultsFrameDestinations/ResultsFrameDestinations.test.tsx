import { render, screen } from '@testing-library/react'
import ResultsFrameDestinations from './ResultsFrameDestinations'
import testResults from '../../../fixtures/testResults'

describe('ResultsFrameDestinations', () => {
  it('should render all the destination names', () => {
    const testDestinations = testResults.destinations

    render(<ResultsFrameDestinations destinations={testDestinations} />)

    testDestinations.forEach((current) => {
      const destinationElement = screen.getByText(current)
      expect(destinationElement).toBeInTheDocument()
    })
  })
})
