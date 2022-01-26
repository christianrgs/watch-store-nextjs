import Image from 'next/image'
import { useCartStore } from 'store/cart'

type TCartItemProps = {
  product: ICartItem
}

const CartItem = (props: TCartItemProps) => {
  const { product } = props
  const { removeProduct, increase, decrease } = useCartStore(store => store.actions)

  return (
    <div data-testid="cart-item" className="flex justify-between mt-6">
      <div className="flex w-full">
        <div className="relative h-20 w-20">
          <Image
            data-testid="cart-item-image"
            className="object-cover rounded"
            src={product.image}
            alt={product.name}
            layout="fill"
            priority
          />
        </div>
        <div className="mx-3 flex-1">
          <div className="flex items-start justify-between w-full">
            <h3 className="text-sm text-gray-600">{product.name}</h3>
            <button data-testid="remove" onClick={() => removeProduct(product)}>
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex items-center">
              <button
                data-testid="decrease"
                className="text-gray-500 focus:outline-none focus:text-gray-600"
                onClick={() => decrease(product)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              <span data-testid="cart-item-quantity" className="text-gray-700 mx-2">
                {product.quantity}
              </span>
              <button
                data-testid="increase"
                className="text-gray-500 focus:outline-none focus:text-gray-600"
                onClick={() => increase(product)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
            <span className="text-gray-600">${product.price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
