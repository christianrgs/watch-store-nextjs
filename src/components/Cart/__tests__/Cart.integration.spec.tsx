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
    act(() => {
      result.current.actions.toggle()
    })

    render(<Cart />)

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden')
  })

  it('should call store toggle() twice', () => {
    render(<Cart />)

    const button = screen.getByTestId('cart-close-button')

    act(() => {
      userEvent.click(button)
      userEvent.click(button)
    })

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
})
