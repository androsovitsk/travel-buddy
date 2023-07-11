import DestinationPlanner from './components/DestinationPlanner/DestinationPlanner'
import DetailsPlanner from './components/DetailsPlanner/DetailsPlanner'
import SubmitButton from './components/SubmitButton/SubmitButton'
import { render } from '@testing-library/react'
import SearchPage from './SearchPage'
import useHandleSearchForm from './components/SearchForm/hooks/useHandleSearchForm'

jest.mock('./components/DestinationPlanner/DestinationPlanner')
const DestinationPlannerMock = DestinationPlanner as jest.Mock

jest.mock('./components/DetailsPlanner/DetailsPlanner')
const DetailsPlannerMock = DetailsPlanner as jest.Mock

jest.mock('./components/SubmitButton/SubmitButton')
const SubmitButtonMock = SubmitButton as jest.Mock

jest.mock('./components/SearchForm/hooks/useHandleSearchForm')
const useHandleSearchFormMock = useHandleSearchForm as jest.Mock

describe('SearchPage', () => {
  it('should render the SearchForm, DestinationPlanner, DetailsPlanner and SubmitButton components', () => {
    useHandleSearchFormMock.mockReturnValue({
      initialValues: {},
      initialTouched: {},
      onClick: jest.fn()
    })

    render(<SearchPage />)

    expect(DestinationPlannerMock).toHaveBeenCalled()
    expect(DetailsPlannerMock).toHaveBeenCalled()
    expect(SubmitButtonMock).toHaveBeenCalled()
  })
})
