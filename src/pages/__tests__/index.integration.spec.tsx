import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import Home from '..'
import { makeServer, TAppServer } from '@/miragejs/server'
import { Response } from 'miragejs'
import userEvent from '@testing-library/user-event'

const renderHome = () => {
  render(<Home />)
}

describe('Home', () => {
  let server: TAppServer

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should render Home', () => {
    renderHome()

    const productListTitle = screen.getByRole('heading', { level: 3, name: /product list title/i })

    expect(screen.getByTestId('home')).toBeInTheDocument()
    expect(productListTitle).toBeInTheDocument()
    expect(productListTitle.textContent).toBe('Watches')
  })

  it('should render the ProductCard component 10 times', async () => {
    server.createList('product', 10)

    renderHome()

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10)
    })
  })

  it('should render the "no products" message', async () => {
    renderHome()

    await waitFor(() => {
      const noProductsMessage = screen.getByRole('heading', { level: 4, name: /no products/i })
      const errorMessage = screen.queryByRole('heading', { level: 4, name: /error/i })

      expect(noProductsMessage).toBeInTheDocument()
      expect(errorMessage).toBeNull()
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0)
    })
  })

  it('should display error message when promise rejects', async () => {
    server.get('products', () => {
      return new Response(500)
    })

    renderHome()

    await waitFor(() => {
      const errorMessage = screen.getByRole('heading', { level: 4, name: /error/i })
      const noProductsMessage = screen.queryByRole('heading', { level: 4, name: /no products/i })

      expect(errorMessage).toBeInTheDocument()
      expect(noProductsMessage).toBeNull()
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0)
    })
  })

  it('should filter the product list when a search is performed', async () => {
    const searchTerm = 'smart watch'

    server.createList('product', 3)
    server.create('product', {
      name: 'Smart Watch'
    })

    renderHome()

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(4)
    })

    const input = screen.getByRole('searchbox')
    const form = screen.getByRole('form')

    userEvent.type(input, searchTerm)
    fireEvent.submit(form)

    await waitFor(() => {
      const productListTitle = screen.getByRole('heading', {
        level: 3,
        name: /product list title/i
      })

      expect(productListTitle).toBeInTheDocument()
      expect(productListTitle.textContent).toBe(`Results for: ${searchTerm}`)
      expect(screen.getAllByTestId('product-card')).toHaveLength(1)
    })
  })

  it('should display the total quantity of products', async () => {
    server.createList('product', 10)

    renderHome()

    await waitFor(() => {
      expect(screen.getByText(/10 products/i)).toBeInTheDocument()
    })
  })

  it('should display product (singular) when there is only 1 product', async () => {
    server.createList('product', 1)

    renderHome()

    await waitFor(() => {
      expect(screen.getByText(/1 product$/i)).toBeInTheDocument()
    })
  })

  it('should display proper quantity when product list is filtered', async () => {
    const searchTerm = 'smart watch'

    server.createList('product', 3)
    server.create('product', {
      name: 'Smart Watch'
    })

    renderHome()

    await waitFor(() => {
      expect(screen.getByText(/4 products/i)).toBeInTheDocument()
    })

    const input = screen.getByRole('searchbox')
    const form = screen.getByRole('form')

    userEvent.type(input, searchTerm)
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText(/1 product$/i)).toBeInTheDocument()
    })
  })
})
