interface IProduct {
  id: string
  name: string
  price: string
  image: string
}

interface ICartItem extends IProduct {
  quantity: number
}

type TServerModels = {
  product: IProduct
}
