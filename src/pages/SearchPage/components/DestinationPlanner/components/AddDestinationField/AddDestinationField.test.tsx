import { render, screen } from '@testing-library/react'
import AddDestinationField from './AddDestinationField'
import useHandleAddNewDestination from './hooks/useHandleAddNewDestination'
import userEvent from '@testing-library/user-event'

jest.mock('./hooks/useHandleAddNewDestination')
const useHandleAddNewDestinationMock = useHandleAddNewDestination as jest.Mock

describe('AddDestinationField', () => {
  it('should render the correct icon', () => {
    useHandleAddNewDestinationMock.mockReturnValue(jest.fn())

    render(<AddDestinationField />)

    const iconElement = screen.getByTestId('AddCircleOutlineIcon')
    expect(iconElement).toBeInTheDocument()
  })

  it('should render the add button and run the correct function on click', async () => {
    const handleAddNewDestinationMock = jest.fn()
    useHandleAddNewDestinationMock.mockReturnValue(handleAddNewDestinationMock)

    render(<AddDestinationField />)

    const buttonElement = screen.getByRole('button', {
      name: 'Add destination'
    })
    
    await userEvent.click(buttonElement)

    expect(handleAddNewDestinationMock).toHaveBeenCalled()
  })
})
