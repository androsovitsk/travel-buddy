import convertResultsAPIResponse from './convertResultsAPIResponse'
import testResultsAPIResponse from '../fixtures/testResultsAPIResponse'
import testResults from '../fixtures/testResults'

describe('convertResultsAPIResponse', () => {
  it('should convert the API response to a locally used format', () => {
    const result = convertResultsAPIResponse(testResultsAPIResponse)

    expect(result).toStrictEqual(testResults)
  })
})
