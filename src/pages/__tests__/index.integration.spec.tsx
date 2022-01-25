import { screen, render, waitFor } from '@testing-library/react'
import Home from '..'
import { makeServer } from '@/miragejs/server'
import { Server } from 'miragejs'

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

  it.todo('should render the no products message')
  it.todo('should render the Search component')
  it.todo('should filter the product list when a search is performed')
  it.todo('should display error message when promise rejects')
  it.todo('should display the total quantity of products')
  it.todo('should display product (singular) when there is only 1 product')
})
