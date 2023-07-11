import { renderHook } from '@testing-library/react'
import useGetSortedDestinationBindings from './useGetSortedDestinationBindings'
import testSearchFormValues from '../../../fixtures/testSearchFormValues'

describe('useGetSortedDestinationBindings', () => {
  it('should return the sorted destination bindings with the callback function', () => {
    const { result } = renderHook(() => useGetSortedDestinationBindings())

    const destinationBindings = result.current(testSearchFormValues)

    expect(destinationBindings).toStrictEqual([
      'thisIsTheFirstRandomizedBinding',
      'thisIsTheSecondRandomizedBinding'
    ])
  })
})
