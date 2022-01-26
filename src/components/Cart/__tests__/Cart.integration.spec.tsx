import { makeServer, TAppServer } from '@/miragejs/server'
import { screen, render } from '@testing-library/react'
import { renderHook, act, RenderResult } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import { setAutoFreeze } from 'immer'
import { useCartStore } from 'store/cart'
import type { IUseCartStore } from 'store/cart/types'
import Cart from '../Cart'

setAutoFreeze(false)

describe('Cart', () => {
  let server: TAppServer
  let result: RenderResult<IUseCartStore>
  let spy: jest.SpyInstance<void, []>

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    result = renderHook(() => useCartStore()).result
    spy = jest.spyOn(result.current.actions, 'toggle')
  })

  afterEach(() => {
    server.shutdown()
    jest.clearAllMocks()

    act(() => {
      result.current.actions.reset()
    })
  })

  it('should render Cart', () => {
    render(<Cart />)

    expect(screen.getByTestId('cart')).toBeInTheDocument()
  })

  it('should display css class "hidden" in the component mount', () => {
    render(<Cart />)

    expect(screen.getByTestId('cart')).toHaveClass('hidden')
  })

  it('should remove css class "hidden" in the component when toggle cart open state', () => {
    render(<Cart />)

    const button = screen.getByTestId('close-cart-button')

    userEvent.click(button)

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden')
  })

  it('should call store toggle() twice', () => {
    render(<Cart />)

    const button = screen.getByTestId('close-cart-button')

    userEvent.click(button)
    userEvent.click(button)

    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should display 2 products cards', () => {
    const products = server.createList('product', 2)

    act(() => {
      for (const product of products) {
        result.current.actions.addProduct(product)
      }
    })

    render(<Cart />)

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2)
  })

  it('should not display "remove all items" button when are less than 2 products', () => {
    const [product1, product2] = server.createList('product', 2)

    act(() => {
      result.current.actions.addProduct(product1)
    })

    render(<Cart />)

    expect(screen.getAllByTestId('cart-item')).toHaveLength(1)
    expect(screen.queryByRole('button', { name: /remove all items/i })).toBeNull()

    act(() => {
      result.current.actions.addProduct(product2)
    })

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /remove all items/i })).toBeInTheDocument()
  })

  it('should remove all products when "remove all items" button gets clicked', () => {
    const products = server.createList('product', 2)

    act(() => {
      for (const product of products) {
        result.current.actions.addProduct(product)
      }
    })

    render(<Cart />)

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2)

    const button = screen.getByRole('button', { name: /remove all items/i })

    userEvent.click(button)

    expect(screen.queryAllByTestId('cart-item')).toHaveLength(0)
    expect(screen.getByTestId('empty-cart-message')).toBeInTheDocument()
  })
})
