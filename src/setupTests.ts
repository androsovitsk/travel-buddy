import '@testing-library/jest-dom'

/**
 * The parse function will always return this object. This one is identical with the query parameters
 * used as a fixture for a reason.
 */
export const testParsedObject = {
  destinations: ['Paris', 'Lyon'],
  numberOfPassengers: '1',
  selectedDate: '2023-01-01'
}

/** This dependency has to be mocked because of it's export */
jest.mock('query-string', () => ({
  stringify: () =>
    'destinations=Paris&destinations=Lyon&numberOfPassengers=1&selectedDate=2023-01-01',
  parse: () => testParsedObject
}))

/** The encode function will always return this string for testing purposes */
export const testEncodedString =
  'ZGVzdGluYXRpb25zPVBhcmlzJmRlc3RpbmF0aW9ucz1MeW9uJm51bWJlck9mUGFzc2VuZ2Vycz0xJnNlbGVjdGVkRGF0ZT0yMDIzLTAxLTAx'
