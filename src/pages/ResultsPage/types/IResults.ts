import IResultsAPIResponse from './IResultsAPIResponse'

interface IResults extends Omit<IResultsAPIResponse, 'selectedDate'> {
  totalDistance: number
  selectedDate: Date
}

export default IResults
