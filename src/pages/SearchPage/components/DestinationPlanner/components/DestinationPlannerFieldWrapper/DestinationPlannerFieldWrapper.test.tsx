import { render, screen } from '@testing-library/react'
import DestinationPlannerFieldWrapper from './DestinationPlannerFieldWrapper'

const StartIconElement = () => <div data-testid={'startIcon'} />
const FieldElement = () => <div data-testid={'field'} />

describe('DestinationPlannerFieldWrapper', () => {
  it('should render the start icon and the field', () => {
    render(
      <DestinationPlannerFieldWrapper
        startIcon={<StartIconElement />}
        field={<FieldElement />}
      />
    )

    const startIconElement = screen.getByTestId('startIcon')
    expect(startIconElement).toBeInTheDocument()

    const fieldElement = screen.getByTestId('field')
    expect(fieldElement).toBeInTheDocument()
  })

  it('should render the end icon if it is provided', () => {
    const EndIconElement = () => <div data-testid={'endIcon'} />

    render(
      <DestinationPlannerFieldWrapper
        startIcon={<StartIconElement />}
        field={<FieldElement />}
        endIcon={<EndIconElement />}
      />
    )

    const endIconElement = screen.getByTestId('endIcon')
    expect(endIconElement).toBeInTheDocument()
  })
})
