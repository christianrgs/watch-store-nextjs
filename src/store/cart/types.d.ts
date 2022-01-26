export interface IUseCartState {
  open: boolean
  products: IProduct[]
}

export interface IUseCartActions {
  reset: () => void
  toggle: () => void
  addProduct: (product: IProduct) => void
}

export interface IUseCartStore {
  state: IUseCartState
  actions: IUseCartActions
}
