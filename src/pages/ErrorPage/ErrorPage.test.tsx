import { render, screen } from '@testing-library/react'
import ErrorPage from './ErrorPage'
import useNavigateWithQueryParameters from '../../hooks/useNavigateWithQueryParameters'
import userEvent from '@testing-library/user-event'

jest.mock('../../hooks/useNavigateWithQueryParameters')

const useNavigateWithQueryParametersMock =
  useNavigateWithQueryParameters as jest.Mock

const navigateMock = jest.fn()

describe('ErrorPage', () => {
  beforeEach(() => {
    useNavigateWithQueryParametersMock.mockReturnValue(navigateMock)
  })

  it('should render the common error message', () => {
    render(<ErrorPage />)

    const errorElement = screen.getByText('Ooops! Something went wrong!')
    expect(errorElement).toBeInTheDocument()
  })

  it('should navigate to the search page on back button click', async () => {
    render(<ErrorPage />)

    const backButtonElement = screen.getByRole('button', { name: 'Back' })

    await userEvent.click(backButtonElement)
    expect(navigateMock).toHaveBeenCalledWith('/', false)
  })
})
