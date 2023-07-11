import generateInitialValues from './generateInitialValues'
import { v4 } from 'uuid'
import testRandomizedBinding from '../fixtures/testRandomizedBinding'

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: jest.fn()
}))

const v4Mock = v4 as jest.Mock

describe('generateInitialValues', () => {
  it('should generate initial values in the correct format', () => {
    v4Mock.mockReturnValue(testRandomizedBinding)

    const result = generateInitialValues()

    expect(result).toStrictEqual({
      [testRandomizedBinding]: {
        lastChangeWasInternal: true,
        order: 1,
        value: ''
      },
      numberOfPassengers: 0,
      selectedDate: null
    })
  })

  it('should call the randomizer function twice', () => {
    v4Mock.mockReturnValue(jest.fn())

    generateInitialValues()

    expect(v4Mock).toHaveBeenCalledTimes(2)
  })
})
