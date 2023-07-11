import { renderHook } from '@testing-library/react'
import useGetSortedDestinationEntries from './useGetSortedDestinationEntries'
import testSearchFormValues from '../fixtures/testSearchFormValues'

describe('useGetSortedDestinationEntries', () => {
  it('should return the correct destination entries', () => {
    const { result } = renderHook(() => useGetSortedDestinationEntries())

    const destinationEntries = result.current(testSearchFormValues)
    
    expect(destinationEntries).toStrictEqual([
      [
        'thisIsTheFirstRandomizedBinding',
        testSearchFormValues['thisIsTheFirstRandomizedBinding']
      ],
      [
        'thisIsTheSecondRandomizedBinding',
        testSearchFormValues['thisIsTheSecondRandomizedBinding']
      ]
    ])
  })
})
