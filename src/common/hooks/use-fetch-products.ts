import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetchProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true

    axios
      .get<{ products: IProduct[] }>('/api/products')
      .then(res => {
        if (mounted) {
          setProducts(res.data.products)
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return { products, error }
}
