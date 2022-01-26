import create from 'zustand'
import produce from 'immer'
import { IUseCartState, IUseCartStore } from './types'

const initialState: IUseCartState = {
  open: false,
  products: []
}

export const parseProductToCartItem = (product: IProduct): ICartItem => {
  return Object.assign(product, { quantity: 1 })
}

export const useCartStore = create<IUseCartStore>(set => {
  const setState = (callback: (store: IUseCartStore) => void) => set(produce(callback))

  const isProductAlreadyInTheCart = (state: IUseCartState, product: IProduct) => {
    return state.products.some(({ id }) => id === product.id)
  }
  const getProductInTheCart = (state: IUseCartState, product: IProduct) => {
    return state.products.find(({ id }) => id === product.id)
  }

  return {
    state: initialState,
    actions: {
      reset() {
        setState(store => {
          store.state = initialState
        })
      },
      toggle() {
        setState(({ state }) => {
          state.open = !state.open
        })
      },
      addProduct(product: IProduct) {
        setState(({ state }) => {
          if (!isProductAlreadyInTheCart(state, product)) {
            const cartItem = parseProductToCartItem(product)

            state.products.push(cartItem)
            state.open = true
          }
        })
      },
      increase(product) {
        setState(store => {
          const stateProduct = getProductInTheCart(store.state, product)

          if (stateProduct) {
            stateProduct.quantity++
          }
        })
      },
      decrease(product) {
        setState(store => {
          const stateProduct = getProductInTheCart(store.state, product)

          if (stateProduct && stateProduct.quantity > 0) {
            stateProduct.quantity--
          }
        })
      },
      removeProduct(product: IProduct) {
        setState(({ state }) => {
          if (isProductAlreadyInTheCart(state, product)) {
            state.products = state.products.filter(({ id }) => {
              return id !== product.id
            })
          }
        })
      },
      removeAllProducts() {
        setState(({ state }) => {
          state.products = initialState.products
        })
      }
    }
  }
})
