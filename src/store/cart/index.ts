import create from 'zustand'
import { IUseCartStore } from './types'

export const useCartStore = create<IUseCartStore>(set => ({
  state: {
    open: false
  },
  actions: {
    toggle: () => set(store => ({ state: { open: !store.state.open } }))
  }
}))
