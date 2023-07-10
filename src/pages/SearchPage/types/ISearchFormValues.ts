import IDestinationFieldContextValue from '../components/DestinationPlanner/types/IDestinationFieldContextValue'

interface ISearchFormValues {
  numberOfPassengers: number
  selectedDate: Date | null

  [key: string]: number | Date | IDestinationFieldContextValue | null
}

export default ISearchFormValues
