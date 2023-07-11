import testResults from '../../fixtures/testResults'
import { render } from '@testing-library/react'
import ResultsFrame from './ResultsFrame'
import ResultsFrameDistances from './ResultsFrameDistances/ResultsFrameDistances'
import ResultsFrameIcons from './ResultsFrameIcons/ResultsFrameIcons'
import ResultsFrameDestinations from './ResultsFrameDestinations/ResultsFrameDestinations'

jest.mock('./ResultsFrameDistances/ResultsFrameDistances')
const ResultsFrameDistancesMock = ResultsFrameDistances as jest.Mock

jest.mock('./ResultsFrameIcons/ResultsFrameIcons')
const ResultsFrameIconsMock = ResultsFrameIcons as jest.Mock

jest.mock('./ResultsFrameDestinations/ResultsFrameDestinations')
const ResultsFrameDestinationsMock = ResultsFrameDestinations as jest.Mock

describe('ResultsFrame', () => {
  it('should render the distances, icons and destinations', () => {
    const testDestinations = testResults.destinations
    const testDistances = testResults.distances

    render(
      <ResultsFrame destinations={testDestinations} distances={testDistances} />
    )

    expect(ResultsFrameDistancesMock).toHaveBeenCalled()
    expect(ResultsFrameIconsMock).toHaveBeenCalled()
    expect(ResultsFrameDestinationsMock).toHaveBeenCalled()
  })
})
