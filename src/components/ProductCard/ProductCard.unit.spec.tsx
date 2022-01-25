import { screen, render, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard'

const product = {
  name: 'Classic watch',
  price: 123,
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
}

const addToCart = jest.fn()

const renderProductCard = () => {
  render(<ProductCard product={product} addToCart={addToCart} />)
}

describe('ProductCard', () => {
  it('should render ProductCard', () => {
    renderProductCard()

    expect(screen.getByTestId('product-card')).toBeInTheDocument()
  })

  it('should display proper content', () => {
    renderProductCard()

    expect(screen.getByText(new RegExp(product.name, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(product.price.toString(), 'i'))).toBeInTheDocument()
    expect(screen.getByTestId('product-image')).toHaveStyle({
      backgroundImage: product.image
    })
  })

  it('should call props addToCart when button gets clicked', () => {
    renderProductCard()

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(addToCart).toHaveBeenCalledTimes(1)
    expect(addToCart).toHaveBeenCalledWith(product)
  })
})
