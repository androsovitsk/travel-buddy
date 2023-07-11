import useCheckFormValidity from './hooks/useCheckFormValidity'
import { render, screen } from '@testing-library/react'
import SubmitButton from './SubmitButton'

jest.mock('./hooks/useCheckFormValidity')
const useCheckFormValidityMock = useCheckFormValidity as jest.Mock

describe('SubmitButton', () => {
  it('should disable the button when the form is not valid', async () => {
    useCheckFormValidityMock.mockReturnValue(false)

    render(<SubmitButton />)

    const buttonElement = screen.getByRole('button', { name: 'Submit' })
    expect(buttonElement).toHaveProperty('disabled', true)
  })

  it('should enable the button when the form is valid', async () => {
    useCheckFormValidityMock.mockReturnValue(true)

    render(<SubmitButton />)

    const buttonElement = screen.getByRole('button', { name: 'Submit' })
    expect(buttonElement).toHaveProperty('disabled', false)
  })
})
