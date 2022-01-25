import { screen, render, fireEvent } from '@testing-library/react'
import CartItem from '../CartItem'

const product = {
  id: '33b60271-b4d1-4b85-a960-cee6faa52bd0',
  name: 'Classic watch',
  price: '123',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
}

const renderCartItem = () => {
  render(<CartItem product={product} />)
}

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem()

    expect(screen.getByTestId('cart-item')).toBeInTheDocument()
  })

  it('should display proper content', () => {
    renderCartItem()

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

    const button = screen.getByRole('button', { name: 'increase' })

    fireEvent.click(button)

    expect(screen.getByTestId('cart-item-quantity').textContent).toBe('2')
  })

  it('should decrease quantity by 1 when "decrease" button gets clicked', () => {
    renderCartItem()

    const plusButton = screen.getByRole('button', { name: 'increase' })
    const minusButton = screen.getByRole('button', { name: 'decrease' })
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

    const minusButton = screen.getByRole('button', { name: 'decrease' })
    const quantity = screen.getByTestId('cart-item-quantity')

    fireEvent.click(minusButton)
    expect(quantity.textContent).toBe('0')
    fireEvent.click(minusButton)
    expect(quantity.textContent).toBe('0')
  })
})
