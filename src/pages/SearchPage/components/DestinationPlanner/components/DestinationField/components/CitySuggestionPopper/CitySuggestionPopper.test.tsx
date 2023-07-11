import { render, screen } from '@testing-library/react'
import CitySuggestionPopper from './CitySuggestionPopper'
import testDestinationData from '../../../../../../../ResultsPage/fixtures/testDestinationData'
import userEvent from '@testing-library/user-event'

const defaultProps = {
  anchorEl: document.createElement('div'),
  isOpen: true,
  isLoading: false,
  options: [],
  onMenuItemClick: jest.fn()
}
describe('CitySuggestionPopper', () => {
  it('should not render anything when the prop isOpen is false', () => {
    const { container } = render(
      <CitySuggestionPopper {...defaultProps} isOpen={false} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('should render 3 Skeleton components when the prop isLoading is true', () => {
    render(<CitySuggestionPopper {...defaultProps} isLoading={true} />)

    const loadingSkeletons = screen.getByTestId('loadingSkeletons')
    expect(loadingSkeletons).toBeInTheDocument()
  })

  it('should render the options', () => {
    render(
      <CitySuggestionPopper {...defaultProps} options={testDestinationData} />
    )

    testDestinationData.forEach((current) => {
      const optionElement = screen.getByText(current.name)
      expect(optionElement).toBeInTheDocument()
    })
  })

  it('should call the onMenuItemClick function on option click', async () => {
    const onMenuItemClickMock = jest.fn()

    render(
      <CitySuggestionPopper
        {...defaultProps}
        options={testDestinationData}
        onMenuItemClick={onMenuItemClickMock}
      />
    )

    const testDestinationName = testDestinationData[1].name
    const optionElement = screen.getByText(testDestinationName)

    await userEvent.click(optionElement)
    expect(onMenuItemClickMock).toHaveBeenCalledWith(testDestinationName)
  })
})
