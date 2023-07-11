import useNavigateWithQueryParameters from '../../../../hooks/useNavigateWithQueryParameters'
import { render, screen } from '@testing-library/react'
import BackToSearchPageButton from './BackToSearchPageButton'
import userEvent from '@testing-library/user-event'

jest.mock('../../../../hooks/useNavigateWithQueryParameters')

const useNavigateWithQueryParametersMock =
  useNavigateWithQueryParameters as jest.Mock

describe('BackToSearchPageButton', () => {
  it('should return to the home page on back button click', async () => {
    const navigateMock = jest.fn()

    useNavigateWithQueryParametersMock.mockReturnValue(navigateMock)

    render(<BackToSearchPageButton />)

    const backButtonElement = screen.getByRole('button', { name: 'Back' })

    await userEvent.click(backButtonElement)
    expect(navigateMock).toHaveBeenCalledWith('/')
  })
})
