import React, { useContext, useState, useEffect } from 'react'
import ExploreLayout from '../../layouts/ExploreLayout'
import AllProducts from '../../components/HomeSections/AllProducts'
import { connect, disconnect, convertDocToObj } from '../../utils/mongo'
import Products from '../../models/Product'
import { Store } from '../../Context/Store'
import axios from 'axios'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'
import ProductItem from '../../components/ProductItem/ProductItem'

export default function Explore(props: any) {
  // const { products } = props
  const { state } = useContext(Store)
  const { search_query, currency } = state
  const [products, setProducts] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const { data } = await axios.post(`/api/products`, {
          query: search_query
        })
        setProducts(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getData()
  }, [search_query])


  return (
    <ExploreLayout>
      {
        products?.length < 1 ? (
          <div className=" h-96 grid items-center content-center justify-center">
            <div className="relative h-40">
              <Image src={no_product} layout="fill" objectFit="contain" />
            </div>
            <p className="text-center mt-4 capitalize font-semibold text-gray-700">no products found</p>
          </div>
        ) : (
          <>
          <div
            className={`grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mx-auto grid w-full gap-4 rounded-lg  md:gap-8`}
          >
            {products?.map((product: any, index: number) => (
              <div key={index} className="col-span-1 p-0">
                {product.currency_type === currency ? (
                  <ProductItem
                    name={product.title}
                    description={product.description}
                    rating={product.rating}
                    picture={product.pictures[0]}
                    price={product.price}
                    discount_price={product.discount_price}
                    category={product.category}
                    id={product._id}
                    countInStock={product.countInStock}
                    product={product}
                    averageRating={product.averageRating}
                  />
                ) : currency === 'ANY' ? (
                  <ProductItem
                    name={product.title}
                    description={product.description}
                    rating={product.rating}
                    picture={product.pictures[0]}
                    price={product.price}
                    discount_price={product.discount_price}
                    category={product.category}
                    id={product._id}
                    countInStock={product.countInStock}
                    product={product}
                    averageRating={product.averageRating}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </>
          )
      }
    </ExploreLayout>
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