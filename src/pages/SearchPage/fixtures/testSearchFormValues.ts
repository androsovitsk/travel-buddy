import ISearchFormValues from '../types/ISearchFormValues'

const testSearchFormValues: ISearchFormValues = {
  thisIsTheFirstRandomizedBinding: {
    value: 'Paris',
    order: 0,
    lastChangeWasInternal: true
  },
  thisIsTheSecondRandomizedBinding: {
    value: 'Lyon',
    order: 1,
    lastChangeWasInternal: true
  },
  numberOfPassengers: 1,
  selectedDate: new Date('2023-01-01')
}

export default testSearchFormValues
