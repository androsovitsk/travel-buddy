import { CircleOutlined, PlaceOutlined } from '@mui/icons-material'
import { render } from '@testing-library/react'
import ResultsFrameIcons from './ResultsFrameIcons'

jest.mock('@mui/icons-material', () => ({
  ...jest.requireActual('@mui/icons-material'),
  CircleOutlined: jest.fn(),
  PlaceOutlined: jest.fn()
}))

const CircleOutlinedMock = CircleOutlined as unknown as jest.Mock
const PlaceOutlinedMock = PlaceOutlined as unknown as jest.Mock

describe('ResultsFrameIcons', () => {
  it('should render the correct amount of icons', () => {
    /** Every icon should be CircleOutlined, except the last one which is PlaceOutlined */
    const testNumberOfElements = 5

    render(<ResultsFrameIcons numberOfIcons={5} />)

    expect(CircleOutlinedMock).toHaveBeenCalledTimes(testNumberOfElements - 1)
    expect(PlaceOutlinedMock).toHaveBeenCalledTimes(1)
  })
})
