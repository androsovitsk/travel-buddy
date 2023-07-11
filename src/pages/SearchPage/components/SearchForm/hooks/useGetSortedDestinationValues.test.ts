import { renderHook } from '@testing-library/react'
import useGetSortedDestinationValues from './useGetSortedDestinationValues'
import testSearchFormValues from '../../../fixtures/testSearchFormValues'

describe('useGetSortedDestinationValues', () => {
  it('should return the sorted destination values', () => {
    const { result } = renderHook(() => useGetSortedDestinationValues())

    const sortedDestinationValues = result.current(testSearchFormValues)
    expect(sortedDestinationValues).toStrictEqual(['Paris', 'Lyon'])
  })
})
