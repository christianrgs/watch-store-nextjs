import Search from './Search'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const doSearch = jest.fn()

describe('Search', () => {
  it('should render a form', () => {
    render(<Search doSearch={doSearch} />)

    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should render a input with type equals search', () => {
    render(<Search doSearch={doSearch} />)

    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search')
  })

  it('should render a input with placeholder equals "Search watch"', () => {
    render(<Search doSearch={doSearch} />)

    expect(screen.getByRole('searchbox')).toHaveProperty('placeholder', 'Search watch')
  })

  it('should call prop doSearch when form is submitted', () => {
    render(<Search doSearch={doSearch} />)

    const form = screen.getByRole('form')

    fireEvent.submit(form)

    expect(doSearch).toHaveBeenCalledTimes(1)
  })

  it('should call prop doSearch with the user input', () => {
    render(<Search doSearch={doSearch} />)

    const inputText = 'some text here'
    const form = screen.getByRole('form')
    const input = screen.getByRole('searchbox')

    userEvent.type(input, inputText)
    fireEvent.submit(form)

    expect(doSearch).toHaveBeenCalledWith(inputText)
  })
})
