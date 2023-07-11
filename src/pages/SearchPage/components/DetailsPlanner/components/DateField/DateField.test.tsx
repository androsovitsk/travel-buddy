import { useFormikContext } from 'formik'
import { render, screen } from '@testing-library/react'
import DateField from './DateField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import userEvent from '@testing-library/user-event'

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormikContext: jest.fn()
}))

const useFormikContextMock = useFormikContext as jest.Mock

const testBinding = 'dateFieldTestBinding'
const testErrorMessage = 'This is a test error message'

const renderWithLocalizationProvider = () =>
  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateField binding={testBinding} fieldErrorMessage={testErrorMessage} />
    </LocalizationProvider>
  )

const baseFormikContextMockValues = {
  values: { [testBinding]: new Date() },
  touched: { [testBinding]: false },
  errors: {},
  setFieldValue: jest.fn(),
  setFieldTouched: jest.fn(),
  setFieldError: jest.fn()
}

describe('DateField', () => {
  it('should render the date picker', () => {
    useFormikContextMock.mockReturnValue(baseFormikContextMockValues)

    renderWithLocalizationProvider()

    const dateFieldElement = document.querySelector(
      'input[name="dateFieldTestBinding"]'
    )

    expect(dateFieldElement).toBeInTheDocument()
  })

  it('should set the field value and set the field touched', async () => {
    const setFieldValueMock = jest.fn()
    const setFieldTouchedMock = jest.fn()

    useFormikContextMock.mockReturnValue({
      ...baseFormikContextMockValues,
      setFieldValue: setFieldValueMock,
      setFieldTouched: setFieldTouchedMock
    })

    renderWithLocalizationProvider()

    const dateFieldTriggerElement = screen.getByRole('button')
    await userEvent.click(dateFieldTriggerElement)

    const previousMonthTriggerElement = document.querySelector(
      'button[title="Previous month"]'
    )

    await userEvent.click(previousMonthTriggerElement)

    const firstDayOfTheMonthElement = Array.from(
      document.querySelectorAll('button[role="gridcell"]')
    ).find((current) => current.textContent === '1')

    await userEvent.click(firstDayOfTheMonthElement)

    expect(setFieldValueMock).toHaveBeenLastCalledWith(
      testBinding,
      expect.anything()
    )

    expect(setFieldTouchedMock).toHaveBeenCalledWith(testBinding, true)
  })
})
