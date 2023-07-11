import { render, screen } from '@testing-library/react'
import Layout from './Layout'

describe('Layout', () => {
  it('should match the snapshot', () => {
    const view = render(<Layout />)

    expect(view.asFragment()).toMatchSnapshot()
  })

  it('should render the children', () => {
    const testId = 'test-id'

    render(
      <Layout>
        <div data-testid={testId} />
      </Layout>
    )

    const childrenElement = screen.getByTestId(testId)
    expect(childrenElement).toBeInTheDocument()
  })
})
