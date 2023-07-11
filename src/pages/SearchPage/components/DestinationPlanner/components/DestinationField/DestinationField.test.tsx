import { useFormikContext } from 'formik'
import { render, screen } from '@testing-library/react'
import DestinationField from './DestinationField'
import useFetchSuggestions from './hooks/useFetchSuggestions'
import useDestinationField from './hooks/useDestinationField'
import useHandleRemoveDestination from './hooks/useHandleRemoveDestination'
import userEvent from '@testing-library/user-event'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock

jest.mock('./hooks/useFetchSuggestions')
const useFetchSuggestionsMock = useFetchSuggestions as jest.Mock

jest.mock('./hooks/useDestinationField')
const useDestinationFieldMock = useDestinationField as jest.Mock

jest.mock('./hooks/useHandleRemoveDestination')
const useHandleRemoveDestinationMock = useHandleRemoveDestination as jest.Mock

const testBinding = 'testDestinationFieldBinding'
const testIconTestId = 'testIconTestId'

const baseDestinationFieldProps = {
  binding: testBinding,
  label: 'Test label',
  icon: <div data-testid={testIconTestId} />,
  fieldErrorMessage: 'Test error message',
  removable: false
}

const baseUseDestinationFieldMockValues = {
  handleOnValueChange: jest.fn(),
  handleOnClearButtonClick: jest.fn(),
  handleOnMenuItemClick: jest.fn()
}

describe('DestinationField', () => {
  beforeEach(() => {
    useFormikContextMock.mockReturnValue({
      values: {
        [testBinding]: { value: 'Paris', order: 0, lastChangeWasInternal: true }
      },
      touched: { [testBinding]: true },
      errors: {},
      setFieldError: jest.fn()
    })

    useFetchSuggestionsMock.mockReturnValue({
      isLoading: false,
      options: []
    })

    useDestinationFieldMock.mockReturnValue(baseUseDestinationFieldMockValues)
    useHandleRemoveDestinationMock.mockReturnValue(jest.fn())
  })

  it('should render the input field', () => {
    render(<DestinationField {...baseDestinationFieldProps} />)

    const destinationFieldElement = document.querySelector(
      'input[name="testDestinationFieldBinding"]'
    )

    expect(destinationFieldElement).toBeInTheDocument()
  })

  it('should render the icon', () => {
    render(<DestinationField {...baseDestinationFieldProps} />)

    const iconElement = screen.getByTestId(testIconTestId)
    expect(iconElement).toBeInTheDocument()
  })

  it('should render the remove icon if the destination is removable', () => {
    render(<DestinationField {...baseDestinationFieldProps} removable={true} />)

    const removeIconElement = screen.getByTestId('HighlightOffOutlinedIcon')
    expect(removeIconElement).toBeInTheDocument()
  })

  it('should run the onValueChange callback function on value change', async () => {
    const handleOnValueChangeMock = jest.fn()

    useDestinationFieldMock.mockReturnValue({
      ...baseUseDestinationFieldMockValues,
      handleOnValueChange: handleOnValueChangeMock
    })

    render(<DestinationField {...baseDestinationFieldProps} />)

    const destinationFieldElement = document.querySelector(
      'input[name="testDestinationFieldBinding"]'
    )

    await userEvent.type(destinationFieldElement, 'New value')

    expect(handleOnValueChangeMock).toHaveBeenCalled()
  })

  it('should run the onClearButtonClick callback function on clear button click', async () => {
    const handleOnClearButtonClickMock = jest.fn()

    useDestinationFieldMock.mockReturnValue({
      ...baseUseDestinationFieldMockValues,
      handleOnClearButtonClick: handleOnClearButtonClickMock
    })

    render(<DestinationField {...baseDestinationFieldProps} />)

    const clearButtonElement = screen.getByTestId('ClearIcon')
    await userEvent.click(clearButtonElement)

    expect(handleOnClearButtonClickMock).toHaveBeenCalled()
  })

  it('should run the onRemoveDestination callback function on remove button click', async () => {
    const handleOnRemoveDestinationMock = jest.fn()
    
    useHandleRemoveDestinationMock.mockReturnValue(
      handleOnRemoveDestinationMock
    )

    render(<DestinationField {...baseDestinationFieldProps} removable={true} />)

    const removeButtonElement = screen.getByTestId('HighlightOffOutlinedIcon')
    await userEvent.click(removeButtonElement)

    expect(handleOnRemoveDestinationMock).toHaveBeenCalled()
  })
})
