import { screen, render } from '@testing-library/react'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  it('should render ProductCard', () => {
    render(<ProductCard />)

    expect(screen.getByTestId('product-card')).toBeInTheDocument()
  })
})
