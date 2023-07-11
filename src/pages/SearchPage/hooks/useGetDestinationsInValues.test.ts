import useGetDestinationsInValues from './useGetDestinationsInValues'
import { renderHook } from '@testing-library/react'
import testSearchFormValues from '../fixtures/testSearchFormValues'

describe('useGetDestinationsInValues', () => {
  it('should return the destinations from the values', () => {
    const { result } = renderHook(() => useGetDestinationsInValues())

    const destinationsFromValues = result.current(testSearchFormValues)
    expect(destinationsFromValues).toStrictEqual({
      thisIsTheFirstRandomizedBinding:
        testSearchFormValues['thisIsTheFirstRandomizedBinding'],
      thisIsTheSecondRandomizedBinding:
        testSearchFormValues['thisIsTheSecondRandomizedBinding']
    })
  })
})
