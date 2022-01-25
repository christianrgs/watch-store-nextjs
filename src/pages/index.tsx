import type { NextPage } from 'next'
import ProductCard from 'components/ProductCard'
import Search from 'components/Search'

const product = {
  name: 'Classic watch',
  price: 123,
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
}

const Home: NextPage = () => {
  return (
    <main className="my-8">
      <Search doSearch={term => console.log(term)} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">200+ Products</span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          <ProductCard product={product} addToCart={product => console.log(product)} />
        </div>
      </div>
    </main>
  )
}

export default Home
