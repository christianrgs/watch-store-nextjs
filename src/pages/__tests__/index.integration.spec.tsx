import { screen, render, waitFor } from '@testing-library/react'
import Home from '..'
import { makeServer } from '@/miragejs/server'
import { Response, Server } from 'miragejs'

const renderHome = () => {
  render(<Home />)
}

describe('Home', () => {
  let server: Server

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should render Home', () => {
    renderHome()

    expect(screen.getByTestId('home')).toBeInTheDocument()
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
      expect(screen.getByRole('heading', { level: 4, name: /no products/i })).toBeInTheDocument()
      expect(screen.queryByRole('heading', { level: 4, name: /error/i })).toBeNull()
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0)
    })
  })

  it('should display error message when promise rejects', async () => {
    server.get('products', () => {
      return new Response(500)
    })

    renderHome()

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 4, name: /error/i })).toBeInTheDocument()
      expect(screen.queryByRole('heading', { level: 4, name: /no products/i })).toBeNull()
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0)
    })
  })

  it.todo('should filter the product list when a search is performed')
  it.todo('should display the total quantity of products')
  it.todo('should display product (singular) when there is only 1 product')
})
