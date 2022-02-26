import React, { ReactFragment } from 'react'
import ProductItem from '../components/ProductItem/ProductItem'
import GeneralLayout from '../layouts/GeneralLayout'
import Products from '../models/Product'
import { connect, convertDocToObj, disconnect } from '../utils/mongo'

function Home(props: any): ReactFragment {
  const { products } = props

  if(!products){
    return(
      <div>no products to show at the moment</div>
    )
  }
  return (
    <GeneralLayout title='Home page' description='Buy more, Spend Less'>
      {/* <h1>Products</h1> */}
      <div className='grid md:grid-cols-4 grid-cols-2 md:gap-8 gap-4 mx-auto bg-white p-4 rounded-lg' >
        {products?.map((product: any, index: number) => (
          <div key={index} className="p-0 col-span-1">
            <ProductItem
              name={product.title}
              description={product.description}
              rating={product.rating}
              picture={product.pictures[0]}
              price={product.price}
              discount_price={product.discount_price}
              category={product.category}
              id={product._id}
            />
          </div>
        ))}
      </div>
    </GeneralLayout>
  )
}

export async function getServerSideProps(context: any) {
  await connect()
  const products = await Products.find({}).lean()
  await disconnect()
  return {
    props: {
      products: products.map(convertDocToObj)
    }
  }
}

export default Home