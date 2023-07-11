import { render } from '@testing-library/react'
import SearchForm from './SearchForm'
import useHandleSearchForm from './hooks/useHandleSearchForm'

jest.mock('./hooks/useHandleSearchForm')
const useHandleSearchFormMock = useHandleSearchForm as jest.Mock

describe('SearchForm', () => {
  it('should wrap the children around a form', () => {
    useHandleSearchFormMock.mockReturnValue({
      initialValues: {},
      initialTouched: {},
      onSubmit: jest.fn()
    })

    render(
      <SearchForm>
        <div data-testid={'testId'} />
      </SearchForm>
    )

    const formElement = document.querySelector('form')
    expect(formElement).toBeInTheDocument()

    const childrenElement = formElement.querySelector(
      'div[data-testid="testId"]'
    )

    expect(childrenElement).toBeInTheDocument()
  })
})
