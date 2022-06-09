import React, { ReactElement, useContext } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import ProductLoading from '../ProductItem/ProductLoading'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'
import { Store } from '../../Context/Store'
import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

function FeaturedProducts(): ReactElement {

  const address = `/api/products?page=${1}`
  const fetcher = async (url: any) =>
    await axios.post(url).then((res) => res.data)
  const { data: all_products, error } = useSWR(address, fetcher)

  const { state } = useContext(Store)

  return (
    <>
      {error ? (
        <div className="grid w-full content-center items-center justify-center py-4">
          <p className="rounded bg-red-200 p-2 text-center text-sm font-semibold text-gray-700">
            There was an error loading products. Reload page
          </p>
        </div>
      ) : (
        <>
          {!all_products ? (
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
                    </div>
                  ))}
                  {all_products?.length > 10 && (
                    <div className="col-span-1 my-auto h-full w-full">
                    <Link
                      href={'/explore'}
                    >
                      <a className="items-centerlex my-auto grid h-40 w-40 cursor-pointer content-center justify-center rounded bg-gray-200 text-gray-700 hover:bg-gray-100">
                        Show All
                      </a>
                    </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default FeaturedProducts
