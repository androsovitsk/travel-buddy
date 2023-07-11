import { render } from '@testing-library/react'
import DetailsPlanner from './DetailsPlanner'
import PassengerCountField from './components/PassengerCountField/PassengerCountField'
import DateField from './components/DateField/DateField'

jest.mock('./components/PassengerCountField/PassengerCountField')
const PassengerCountFieldMock = PassengerCountField as jest.Mock

jest.mock('./components/DateField/DateField')
const DateFieldMock = DateField as jest.Mock

describe('DetailsPlanner', () => {
  it('should render the PassengerCountField and DateField components', () => {
    render(<DetailsPlanner />)

    expect(PassengerCountFieldMock).toHaveBeenCalledWith(
      {
        binding: 'numberOfPassengers',
        fieldErrorMessage: 'You must provide a number that is higher than 0.'
      },
      {}
    )

    expect(DateFieldMock).toHaveBeenCalledWith(
      {
        binding: 'selectedDate',
        fieldErrorMessage: 'You must provide a date in the future.'
      },
      {}
    )
  })
})
