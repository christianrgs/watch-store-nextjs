export interface IUseCartState {
  open: boolean
  products: ICartItem[]
}

export interface IUseCartActions {
  reset: () => void
  toggle: () => void
  addProduct: (product: IProduct) => void
  increase: (product: IProduct) => void
  decrease: (product: IProduct) => void
  removeProduct: (product: IProduct) => void
  removeAllProducts: () => void
}

export interface IUseCartStore {
  state: IUseCartState
  actions: IUseCartActions
}
