import { render, screen } from '@testing-library/react'
import ResultsDescriptionText from './ResultsDescriptionText'

const testFirstText = 'Test first text'
const testSecondText = 'Test second text'

describe('ResultsDescriptionText', () => {
  it('should render the first text', () => {
    render(<ResultsDescriptionText firstText={testFirstText} />)

    const firstTextElement = screen.getByText(testFirstText)
    expect(firstTextElement).toBeInTheDocument()
  })

  it('should render the first and second text when both are provided', () => {
    render(
      <ResultsDescriptionText
        firstText={testFirstText}
        secondText={testSecondText}
      />
    )

    const firstTextElement = screen.getByText(testFirstText)
    expect(firstTextElement).toBeInTheDocument()

    const secondTextElement = screen.getByText(testSecondText)
    expect(secondTextElement).toBeInTheDocument()
  })
})
