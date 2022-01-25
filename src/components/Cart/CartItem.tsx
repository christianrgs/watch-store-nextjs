import Image from 'next/image'
import { useCallback, useState } from 'react'

type TCartItemProps = {
  product: IProduct
}

const CartItem = (props: TCartItemProps) => {
  const { product } = props
  const [quantity, setQuantity] = useState(1)

  const handleDecrease = useCallback(
    () =>
      setQuantity(prevQuantity => {
        if (prevQuantity > 0) return prevQuantity - 1

        return prevQuantity
      }),
    []
  )

  const handleIncrese = useCallback(() => setQuantity(prevQuantity => prevQuantity + 1), [])

  return (
    <div data-testid="cart-item" className="flex justify-between mt-6">
      <div className="flex">
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
        <div className="mx-3">
          <h3 className="text-sm text-gray-600">{product.name}</h3>
          <div className="flex items-center mt-2">
            <button
              title="decrease"
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={handleDecrease}
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
              {quantity}
            </span>
            <button
              title="increase"
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={handleIncrese}
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
        </div>
      </div>
      <span className="text-gray-600">${product.price}</span>
    </div>
  )
}

export default CartItem
