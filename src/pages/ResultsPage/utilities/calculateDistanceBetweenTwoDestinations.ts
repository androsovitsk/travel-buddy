import convertNumberToRadian from './convertNumberToRadian'

/**
 * Function to calculate the distance between two latitude and longitude point using the Haversine formula.
 * @param {number} firstLat - the latitude of the first destination
 * @param {number} firstLon - the longitude of the first destination
 * @param {number} secondLat - the latitude of the second destination
 * @param {number} secondLon - the longitude of the second destination
 */
const calculateDistanceBetweenTwoDestinations = (
  firstLat: number,
  firstLon: number,
  secondLat: number,
  secondLon: number
): number => {
  const dLat = convertNumberToRadian(secondLat - firstLat)
  const dLon = convertNumberToRadian(secondLon - firstLon)
  const firstDestinationLatInRad = convertNumberToRadian(firstLat)
  const secondDestinationLatInRad = convertNumberToRadian(secondLat)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(firstDestinationLatInRad) *
      Math.cos(secondDestinationLatInRad)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.floor(6371 * c)
}

export default calculateDistanceBetweenTwoDestinations
