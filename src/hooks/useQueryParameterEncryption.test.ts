import { renderHook } from '@testing-library/react'
import useQueryParameterEncryption from './useQueryParameterEncryption'
import testQueryParameters from '../fixtures/testQueryParameters'
import { testEncodedString, testParsedObject } from '../setupTests'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))

describe('useQueryParameterEncryption', () => {
  it('should properly encode an object', () => {
    const { result } = renderHook(() => useQueryParameterEncryption())

    const encodedString = result.current.encode(testQueryParameters)
    expect(encodedString).toStrictEqual(testEncodedString)
  })

  it('should properly decode a string', () => {
    const { result } = renderHook(() => useQueryParameterEncryption())

    const encodedString = result.current.decode('testString')
    expect(encodedString).toStrictEqual(testParsedObject)
  })
})
