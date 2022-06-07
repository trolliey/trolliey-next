import React, { ReactElement, useContext, useEffect, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import ProductLoading from '../ProductItem/ProductLoading'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'
import { Store } from '../../Context/Store'
import axios from 'axios'
import { useRouter } from 'next/router'

function FeaturedProducts(): ReactElement {
  const [all_products, setAllProducts] = useState<any>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true)
      try {
        const { data } = await axios.post(`/api/products?page=1`)
        setAllProducts(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getAllProducts()
  }, [])

  const { state } = useContext(Store)
  const { currency } = state

  return (
    <>
      {loading ? (
        <div className="scrollbar-hide relative mx-auto grid grid-cols-2 gap-4 rounded-lg bg-white p-4 md:grid-cols-4 md:gap-8 lg:grid-cols-5">
          {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
            <div key={index} className="col-span-1 p-0">
              <ProductLoading />
            </div>
          ))}
        </div>
      ) : (
        <>
          {all_products?.length < 1 ? (
            <div className=" h-68 grid content-center items-center justify-center rounded bg-white py-2">
              <div className="relative h-40">
                <Image src={no_product} layout="fill" objectFit="contain" />
              </div>
              <p className="mt-4 text-center font-semibold capitalize text-gray-700">
                no products found
              </p>
            </div>
          ) : (
            <div className="scrollbar-hide relative mx-auto flex space-x-6 overflow-x-auto rounded-lg bg-white p-4">
              {all_products?.map((product: any, index: number) => (
                <div key={index} className="col-span-1 p-0">
                  {product.currency_type === currency && (
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
                      currency={product.currency_type}
                    />
                  )}
                </div>
              ))}
              {all_products?.length > 10 && (
                <div
                  onClick={() => router.push('/explore')}
                  className="col-span-1 my-auto h-full w-full"
                >
                  <div className="items-centerlex my-auto grid text-gray-700 hover:bg-gray-100 h-40 w-40 content-center justify-center rounded cursor-pointer bg-gray-200">
                    Show All
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default FeaturedProducts
