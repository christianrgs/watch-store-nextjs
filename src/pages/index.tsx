import type { NextPage } from 'next'
import ProductCard from 'components/ProductCard'
import Search from 'components/Search'
import { useFetchProducts } from 'common/hooks/use-fetch-products'

const Home: NextPage = () => {
  const { products } = useFetchProducts()

  return (
    <main data-testid="home" className="my-8">
      <Search doSearch={term => console.log(term)} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">200+ Products</span>
        <div
          data-testid="product-list"
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={product => console.log(product)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Home
