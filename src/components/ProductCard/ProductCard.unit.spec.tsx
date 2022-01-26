import { makeServer, TAppServer } from '@/miragejs/server'
import { screen, render, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard'

const addToCart = jest.fn()

describe('ProductCard', () => {
  let server: TAppServer

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
    jest.clearAllMocks()
  })

  const renderProductCard = () => {
    const product = server.create('product')

    render(<ProductCard product={product} addToCart={addToCart} />)

    return { product }
  }

  it('should render ProductCard', () => {
    renderProductCard()

    expect(screen.getByTestId('product-card')).toBeInTheDocument()
  })

  it('should display proper content', () => {
    const { product } = renderProductCard()

    expect(screen.getByText(new RegExp(product.name, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(product.price.toString(), 'i'))).toBeInTheDocument()
    expect(screen.getByTestId('product-image')).toHaveStyle({
      backgroundImage: product.image
    })
  })

  it('should call props addToCart when button gets clicked', () => {
    const { product } = renderProductCard()

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(addToCart).toHaveBeenCalledTimes(1)
    expect(addToCart).toHaveBeenCalledWith(product)
  })
})
