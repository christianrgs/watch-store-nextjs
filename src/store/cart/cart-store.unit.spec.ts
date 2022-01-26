import { renderHook, act, RenderResult } from '@testing-library/react-hooks'
import { makeServer, TAppServer } from '@/miragejs/server'
import { useCartStore } from '.'
import { IUseCartStore } from './types'

describe('Cart Store', () => {
  let server: TAppServer
  let result: RenderResult<IUseCartStore>

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    result = renderHook(() => useCartStore()).result
  })

  afterEach(() => {
    server.shutdown()
    act(() => result.current.actions.reset())
  })

  it('should return open as false on initial state', () => {
    expect(result.current.state.open).toBe(false)
  })

  it('should return products as an empty array on initial state', () => {
    expect(result.current.state.products).toBeInstanceOf(Array)
    expect(result.current.state.products).toHaveLength(0)
  })

  it('should toggle open state', async () => {
    expect(result.current.state.open).toBe(false)
    expect(result.current.state.products).toHaveLength(0)

    act(() => {
      result.current.actions.toggle()
    })

    expect(result.current.state.open).toBe(true)

    act(() => {
      result.current.actions.toggle()
    })

    expect(result.current.state.open).toBe(false)
    expect(result.current.state.products).toHaveLength(0)
  })

  it('should add 2 products to the cart', () => {
    const products = server.createList('product', 2)

    for (const product of products) {
      act(() => {
        result.current.actions.addProduct(product)
      })
    }

    expect(result.current.state.products).toHaveLength(2)
  })

  it('should open the cart when a product is added', () => {
    const product = server.create('product')

    act(() => {
      result.current.actions.addProduct(product)
    })

    expect(result.current.state.products).toHaveLength(1)
    expect(result.current.state.open).toBe(true)
  })

  it('should not add same product twice', () => {
    const product = server.create('product')

    act(() => {
      result.current.actions.addProduct(product)
    })

    act(() => {
      result.current.actions.addProduct(product)
    })

    expect(result.current.state.products).toHaveLength(1)
    expect(result.current.state.products).toEqual([product])
  })

  it('should remove a product from the cart', () => {
    const [product1, product2] = server.createList('product', 2)

    act(() => {
      result.current.actions.addProduct(product1)
      result.current.actions.addProduct(product2)
    })

    expect(result.current.state.products).toHaveLength(2)

    act(() => {
      result.current.actions.removeProduct(product1)
    })

    expect(result.current.state.products).toHaveLength(1)
    expect(result.current.state.products[0]).toEqual(product2)
  })

  it('should remove all products from the cart', () => {
    const products = server.createList('product', 2)

    for (const product of products) {
      act(() => {
        result.current.actions.addProduct(product)
      })
    }

    expect(result.current.state.products).toHaveLength(2)

    act(() => {
      result.current.actions.removeAllProducts()
    })

    expect(result.current.state.products).toHaveLength(0)
  })
})
