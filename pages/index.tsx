import React from 'react'
import ProductItem from '../components/ProductItem/ProductItem'
import GeneralLayout from '../layouts/GeneralLayout'
import { data } from '../utils/data'

function Home() {
  return (
    <GeneralLayout title='Home page' description='Buy more, Spend Less'>
        {/* <h1>Products</h1> */}
        <div className='grid md:grid-cols-4 grid-cols-2 md:gap-8 gap-4 mx-auto' >
          {data.products?.map((product: any, index: number) => (
            <div key={index} className="p-0 col-span-1">
              <ProductItem
                name={product.name}
                description={product.description}
                rating={product.rating}
                picture={product.picture}
                price={product.price}
                discount_price={product.discount_price}
                category={product.category}
                id={product.id}
              />
            </div>
          ))}
        </div>
    </GeneralLayout>
  )
}

export default Home