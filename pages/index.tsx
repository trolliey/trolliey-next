import React, { ReactFragment } from 'react'
import ProductItem from '../components/ProductItem/ProductItem'
import GeneralLayout from '../layouts/GeneralLayout'
import Products from '../models/Product'
import { connect, convertDocToObj, disconnect } from '../utils/mongo'
import Courosel from '../components/Carousel/Carousel'
import promo_1 from '../public/img/promo_1.png'
import promo_2 from '../public/img/fregrance_sale.png'
import Carousel from '../components/Carousel/Carousel'
import CategoriesDropdown from '../components/Dropdowns/CategoriesDropdown'

function Home(props: any): ReactFragment {
  const { products } = props

  const banner_images = [
    { body: '', image: promo_1 },
    { body: '', image: promo_2 },
    { body: '', image: promo_1 }
  ]

  if (!products) {
    return (
      <div>no products to show at the moment</div>
    )
  }

  return (
    <GeneralLayout title='Home page' description='Buy more, Spend Less'>
      {/* <h1>Products</h1> */}
      <div className="min-h-screen container max-w-7xl">
        <div className="top w-full flex flex-row md:gap-8 gap-2 bg-white md:p-8 rounded md:px-4 px-0  md:py-4 py-0 mb-8">
          <div className="md:w-1/5 md:flex hidden">
            <CategoriesDropdown />
          </div>
          <div className="flex-1">

            <div className='flex flex-col'>
              <div className="z-0 overflow-hidden w-full  h-auto bg-gray-100 md:mb-4 mb-2">
                <div className="z-0 grid content-center items-center overflow-hidden rounded w-full  bg-white">
                  {/* <img src={banner} alt="banner showing ads for the home page" className="flex-1 max-h-full flex-shrink-0 object-cover w-auto h-auto" /> */}
                  <Courosel data={banner_images} />
                </div>
              </div>
              <div className="flex flex-col my-auto">
                <p className='text-gray-900 font-semibold capitalize md:mb-8 mb-2 md:text-lg text-xs md:flex hidden'>Featured Brands</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className='grid md:grid-cols-5 grid-cols-2 md:gap-8 gap-4 mx-auto bg-white p-4 rounded-lg' >
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
      //@ts-ignore
      products: products?.map(convertDocToObj)
    }
  }
}

export default Home