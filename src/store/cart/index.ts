import create from 'zustand'
import produce from 'immer'
import { IUseCartState, IUseCartStore } from './types'

const initialState: IUseCartState = {
  open: false,
  products: []
}

export const useCartStore = create<IUseCartStore>(set => {
  const setState = (callback: (store: IUseCartStore) => void) => set(produce(callback))

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
          if (!state.products.includes(product)) {
            state.products.push(product)
            state.open = true
          }
        })
      },
      removeProduct(product: IProduct) {
        setState(({ state }) => {
          if (state.products.includes(product)) {
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
