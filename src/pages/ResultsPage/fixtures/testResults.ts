import IResults from '../types/IResults'
import testResultsAPIResponse from './testResultsAPIResponse'

const testResults: IResults = {
  destinations: testResultsAPIResponse.destinations,
  distances: testResultsAPIResponse.distances,
  totalDistance: 391,
  numberOfPassengers: testResultsAPIResponse.numberOfPassengers,
  selectedDate: new Date(testResultsAPIResponse.selectedDate)
}

export default testResults
