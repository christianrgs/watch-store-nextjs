import create from 'zustand'
import { IUseCartState, IUseCartStore } from './types'

const initialState: IUseCartState = {
  open: false,
  products: []
}

const addProduct = (state: IUseCartState, product: IProduct) => {
  const isProductAlreadyInTheCart = state.products.includes(product)

  if (isProductAlreadyInTheCart) return state.products

  return [...state.products, product]
}

export const useCartStore = create<IUseCartStore>(set => ({
  state: initialState,
  actions: {
    reset: () => set(() => ({ state: { ...initialState } })),
    toggle: () => set(store => ({ state: { ...store.state, open: !store.state.open } })),
    addProduct: (product: IProduct) =>
      set(store => ({
        state: { ...store.state, open: true, products: addProduct(store.state, product) }
      }))
  }
}))
