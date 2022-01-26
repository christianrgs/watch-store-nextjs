import { makeServer, TAppServer } from '@/miragejs/server'
import { screen, render, fireEvent } from '@testing-library/react'
import CartItem from '../CartItem'

describe('CartItem', () => {
  let server: TAppServer

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  const renderCartItem = () => {
    const product = server.create('product')

    render(<CartItem product={product} />)

    return { product }
  }

  it('should render CartItem', () => {
    renderCartItem()

    expect(screen.getByTestId('cart-item')).toBeInTheDocument()
  })

  it('should display proper content', () => {
    const { product } = renderCartItem()

    expect(screen.getByText(new RegExp(product.name, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(product.price.toString(), 'i'))).toBeInTheDocument()
    expect(screen.getByTestId('cart-item-image')).toHaveProperty('alt', product.name)
  })

  it('should display 1 as a initial quantity', () => {
    renderCartItem()

    expect(screen.getByTestId('cart-item-quantity').textContent).toBe('1')
  })

  it('should increase quantity by 1 when "increase" button gets clicked', () => {
    renderCartItem()

    const button = screen.getByTestId('increase')

    fireEvent.click(button)

    expect(screen.getByTestId('cart-item-quantity').textContent).toBe('2')
  })

  it('should decrease quantity by 1 when "decrease" button gets clicked', () => {
    renderCartItem()

    const plusButton = screen.getByTestId('increase')
    const minusButton = screen.getByTestId('decrease')
    const quantity = screen.getByTestId('cart-item-quantity')

    fireEvent.click(plusButton)
    fireEvent.click(plusButton)
    expect(quantity.textContent).toBe('3')

    fireEvent.click(minusButton)
    expect(quantity.textContent).toBe('2')
    fireEvent.click(minusButton)
    expect(quantity.textContent).toBe('1')
  })

  it('should not go below 0 in the quantity', () => {
    renderCartItem()

    const minusButton = screen.getByTestId('decrease')
    const quantity = screen.getByTestId('cart-item-quantity')

    fireEvent.click(minusButton)
    expect(quantity.textContent).toBe('0')
    fireEvent.click(minusButton)
    expect(quantity.textContent).toBe('0')
  })
})
