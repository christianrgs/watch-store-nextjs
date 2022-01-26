import { makeServer, TAppServer } from '@/miragejs/server'
import { screen, render, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { setAutoFreeze } from 'immer'
import { parseProductToCartItem, useCartStore } from 'store/cart'
import CartItem from '../CartItem'

setAutoFreeze(false)

describe('CartItem', () => {
  let server: TAppServer

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    jest.clearAllMocks()
    server.shutdown()
  })

  const renderCartItem = () => {
    const product = server.create('product')
    const cartItem = parseProductToCartItem(product)

    render(<CartItem product={cartItem} />)

    return { cartItem }
  }

  it('should render CartItem', () => {
    renderCartItem()

    expect(screen.getByTestId('cart-item')).toBeInTheDocument()
  })

  it('should display proper content', () => {
    const { cartItem } = renderCartItem()

    expect(screen.getByText(new RegExp(cartItem.name, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(cartItem.quantity.toString(), 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(cartItem.price.toString(), 'i'))).toBeInTheDocument()
    expect(screen.getByTestId('cart-item-image')).toHaveProperty('alt', cartItem.name)
  })

  it('should call removeProduct when remove button gets clicked', () => {
    const { result } = renderHook(() => useCartStore())

    const spy = jest.spyOn(result.current.actions, 'removeProduct')

    const { cartItem } = renderCartItem()

    const button = screen.getByTestId('remove')

    fireEvent.click(button)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(cartItem)
  })

  it('should call increase when increase button gets clicked', () => {
    const { result } = renderHook(() => useCartStore())

    const spy = jest.spyOn(result.current.actions, 'increase')

    const { cartItem } = renderCartItem()

    const button = screen.getByTestId('increase')

    fireEvent.click(button)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(cartItem)
  })

  it('should call decrease when decrease button gets clicked', () => {
    const { result } = renderHook(() => useCartStore())

    const spy = jest.spyOn(result.current.actions, 'decrease')

    const { cartItem } = renderCartItem()

    const button = screen.getByTestId('decrease')

    fireEvent.click(button)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(cartItem)
  })
})
