import { useFormikContext } from 'formik'
import { render, screen } from '@testing-library/react'
import PassengerCountField from './PassengerCountField'
import userEvent from '@testing-library/user-event'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock

const testBinding = 'passengerCountFieldTestBinding'
const testErrorMessage = 'This is a test error message'

const setFieldValueMock = jest.fn()

const baseFormikContextMockValues = {
  values: { [testBinding]: 1 },
  touched: { [testBinding]: false },
  errors: {},
  setFieldValue: setFieldValueMock,
  setFieldTouched: jest.fn(),
  setFieldError: jest.fn()
}

describe('PassengerCountField', () => {
  beforeEach(() => {
    useFormikContextMock.mockReturnValue(baseFormikContextMockValues)
  })

  it('should render the passenger count field', () => {
    render(
      <PassengerCountField
        binding={testBinding}
        fieldErrorMessage={testErrorMessage}
      />
    )

    const passengerCountFieldElement = document.querySelector(
      'input[name="passengerCountFieldTestBinding"]'
    )

    expect(passengerCountFieldElement).toBeInTheDocument()
  })

  it('should render the decrement and increment icons', () => {
    render(
      <PassengerCountField
        binding={testBinding}
        fieldErrorMessage={testErrorMessage}
      />
    )

    const decrementIconElement = screen.getByTestId('RemoveCircleOutlinedIcon')
    expect(decrementIconElement).toBeInTheDocument()

    const incrementIconElement = screen.getByTestId('AddCircleOutlinedIcon')
    expect(incrementIconElement).toBeInTheDocument()
  })

  it('should decrement the field value', async () => {
    render(
      <PassengerCountField
        binding={testBinding}
        fieldErrorMessage={testErrorMessage}
      />
    )

    const decrementIconElement = screen.getByTestId('RemoveCircleOutlinedIcon')
    await userEvent.click(decrementIconElement)

    expect(setFieldValueMock).toHaveBeenCalledWith(testBinding, 0)
  })

  it('should increment the field value and set the field touched', async () => {
    const setFieldTouchedMock = jest.fn()

    useFormikContextMock.mockReturnValue({
      ...baseFormikContextMockValues,
      setFieldTouched: setFieldTouchedMock
    })

    render(
      <PassengerCountField
        binding={testBinding}
        fieldErrorMessage={testErrorMessage}
      />
    )

    const incrementIconElement = screen.getByTestId('AddCircleOutlinedIcon')
    await userEvent.click(incrementIconElement)

    expect(setFieldValueMock).toHaveBeenCalledWith(testBinding, 2)
    expect(setFieldTouchedMock).toHaveBeenCalledWith(testBinding, true)
  })

  it('should disable the decrement button when the value is 0', async () => {
    useFormikContextMock.mockReturnValue({
      ...baseFormikContextMockValues,
      values: { [testBinding]: 0 }
    })

    render(
      <PassengerCountField
        binding={testBinding}
        fieldErrorMessage={testErrorMessage}
      />
    )

    const decrementIconParentElement = document.querySelector(
      'svg[data-testid="RemoveCircleOutlinedIcon"]'
    ).parentElement

    expect(decrementIconParentElement).toHaveProperty('disabled')
  })
})
