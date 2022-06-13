import React, { ReactElement, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import ProductLoading from '../ProductItem/ProductLoading'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'
import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import {
  BadgeCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'

function FeaturedProducts(): ReactElement {
  const address = `/api/products?page=${1}`
  const fetcher = async (url: any) =>
    await axios.post(url).then((res) => res.data)
  const { data: all_products, error } = useSWR(address, fetcher)
  const [show_indicators, setShowIndicators] = useState(false)

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
            <>
              <div className="scrollbar-hide relative mx-auto hidden grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-8 lg:grid-cols-5">
                {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
                  <div
                    key={index}
                    className="col-span-1 rounded-lg bg-white p-2"
                  >
                    <ProductLoading />
                  </div>
                ))}
              </div>
              <div className="scrollbar-hide relative mx-auto  grid grid-cols-2 gap-4 md:hidden md:grid-cols-4 md:gap-8 lg:grid-cols-5">
                {[1, 2]?.map((product: any, index: number) => (
                  <div
                    key={index}
                    className="col-span-1 rounded-lg bg-white p-2"
                  >
                    <ProductLoading />
                  </div>
                ))}
              </div>
            </>
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
                <div
                  onMouseEnter={() => setShowIndicators(true)}
                  onMouseLeave={() => setShowIndicators(false)}
                  className="relative "
                >
                  <div className="flex w-full flex-row items-center justify-between pb-4">
                    <p className="font-semibold text-gray-700">Top-Ranking</p>
                    <div className="flex">
                      <ArrowRightIcon
                        height={20}
                        width={20}
                        className={'text-gray-700'}
                      />
                    </div>
                  </div>
                  <div className="scrollbar-hide relative mx-auto flex space-x-2 overflow-x-auto">
                    {all_products?.map((product: any, index: number) => (
                      <div
                        key={index}
                        className="relative col-span-1 rounded-lg bg-white p-2 "
                      >
                        {product.store_verified && (
                          <div className="absolute top-0 left-0 z-20 flex items-center space-x-1 rounded-tl-lg rounded-br-lg bg-blue-700 p-1 text-xs text-white">
                            <BadgeCheckIcon height={20} width={20} />
                          </div>
                        )}
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
                      </div>
                    ))}
                    {/* {all_products?.length > 10 && (
                      <div className="col-span-1 my-auto h-full w-full">
                        <Link href={'/explore'}>
                          <a className="items-centerlex my-auto grid h-40 w-40 cursor-pointer content-center justify-center rounded bg-gray-200 text-gray-700 hover:bg-gray-100">
                            Show All
                          </a>
                        </Link>
                      </div>
                    )} */}
                  </div>
                  {show_indicators && (
                    <div className="absolute top-1/2 flex w-full -translate-y-1/2 transform items-start justify-between px-3">
                      <div className=" rounded-full bg-gray-100 p-2">
                        <ChevronLeftIcon
                          className="text-gray-700"
                          height={20}
                          width={20}
                        />
                      </div>
                      <div className=" rounded-full bg-gray-100 p-2">
                        <ChevronRightIcon
                          className="text-gray-700"
                          height={20}
                          width={20}
                        />
                      </div>
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
