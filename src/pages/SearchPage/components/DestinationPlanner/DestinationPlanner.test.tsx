import { useFormikContext } from 'formik'
import DestinationField from './components/DestinationField/DestinationField'
import AddDestinationField from './components/AddDestinationField/AddDestinationField'
import testSearchFormValues from '../../fixtures/testSearchFormValues'
import { render } from '@testing-library/react'
import DestinationPlanner from './DestinationPlanner'
import { omit } from 'ramda'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock

jest.mock('./components/DestinationField/DestinationField')
const DestinationFieldMock = DestinationField as jest.Mock

jest.mock('./components/AddDestinationField/AddDestinationField')
const AddDestinationFieldMock = AddDestinationField as jest.Mock

describe('DestinationPlanner', () => {
  it('should render the correct amount of DestinationField and AddDestinationField components', () => {
    useFormikContextMock.mockReturnValue({ values: testSearchFormValues })

    render(<DestinationPlanner />)

    expect(DestinationFieldMock).toHaveBeenCalledTimes(
      Object.keys(
        omit(['numberOfPassengers', 'selectedDate'], testSearchFormValues)
      ).length
    )

    expect(AddDestinationFieldMock).toHaveBeenCalled()
  })
})
