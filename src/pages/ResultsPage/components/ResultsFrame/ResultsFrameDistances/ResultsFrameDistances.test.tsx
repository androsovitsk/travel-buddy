import testResults from '../../../fixtures/testResults'
import { render, screen } from '@testing-library/react'
import ResultsFrameDistances from './ResultsFrameDistances'

describe('ResultsFrameDistances', () => {
  it('should render all the distances', () => {
    const testDistances = testResults.distances

    render(<ResultsFrameDistances distances={testDistances} />)

    testDistances.forEach((current) => {
      const distanceElement = screen.getByText(`${current} km`)

      expect(distanceElement).toBeInTheDocument()
    })
  })
})
