import generateInitialFormStateFromQueryParameters from './generateInitialFormStateFromQueryParameters'
import testQueryParameters from '../../../../../fixtures/testQueryParameters'
import { v4 } from 'uuid'
import testRandomizedBinding from '../fixtures/testRandomizedBinding'

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: jest.fn()
}))

const v4Mock = v4 as jest.Mock

describe('generateInitialFormStateFromQueryParameters', () => {
  it('should generate the form state from the provided query parameters', () => {
    v4Mock.mockReturnValue(testRandomizedBinding)

    const result =
      generateInitialFormStateFromQueryParameters(testQueryParameters)

    expect(result).toStrictEqual({
      initialTouched: {
        [testRandomizedBinding]: true,
        numberOfPassengers: true,
        selectedDate: true
      },
      initialValues: {
        [testRandomizedBinding]: {
          value: 'Lyon',
          order: 1,
          lastChangeWasInternal: true
        },
        numberOfPassengers: 1,
        selectedDate: new Date(testQueryParameters.selectedDate)
      }
    })
  })
})
