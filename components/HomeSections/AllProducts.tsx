import React, { useContext } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import ProductLoading from '../ProductItem/ProductLoading'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'
import { Store } from '../../Context/Store'
import axios from 'axios'
import useSWR from 'swr'

interface Props {
  query?: any | null
  cols?: string
  no_text?: any
}

function AllProducts({ query, cols, no_text }: Props) {
  const history = useRouter()
  const { state } = useContext(Store)
  const { currency } = state
  const address = `/api/products?page=${1}&perPage=${16}`
  const fetcher = async (url: any) =>
    await axios.post(url).then((res) => res.data)
  const { data: products, error } = useSWR(address, fetcher)

  return (
    <div className="mb-8 flex w-full flex-col rounded bg-white p-2">
      {!no_text && (
        <div className="flex flex-row items-center justify-between pb-4 text-sm md:text-lg">
          <p className="font-semibold capitalize text-gray-700 ">
            {query ? query : 'all products'}
          </p>
          <div
            onClick={() => history.push('/explore')}
            className="flex cursor-pointer flex-row items-center font-semibold capitalize text-new-primary hover:text-new-light"
          >
            View all
            <ArrowRightIcon height={16} width={16} className="ml-2" />
          </div>
        </div>
      )}
      {error ? (
        <div className="grid w-full content-center items-center justify-center py-4">
          <p className="rounded bg-red-200 p-2 text-center text-sm font-semibold text-gray-700">
            There was an error loading products. Reload page
          </p>
        </div>
      ) : (
        <>
          {!products ? (
            <>
              <div
                className={`${
                  cols ? cols : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
                } mx-auto hidden w-full gap-4 rounded-lg md:grid  md:gap-8`}
              >
                {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
                  <div key={index} className="col-span-1 p-0">
                    <ProductLoading />
                  </div>
                ))}
              </div>
              <div
                className={`${
                  cols ? cols : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
                } mx-auto grid w-full gap-4 rounded-lg md:hidden  md:gap-8`}
              >
                {[1, 2]?.map((product: any, index: number) => (
                  <div key={index} className="col-span-1 p-0">
                    <ProductLoading />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {products?.products?.length < 1 ? (
                <div className=" h-68 grid content-center items-center justify-center">
                  <div className="relative h-40">
                    <Image src={no_product} layout="fill" objectFit="contain" />
                  </div>
                  <p className="mt-4 text-center font-semibold capitalize text-gray-700">
                    no products found
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className={`${
                      cols ? cols : 'flex space-x-6 overflow-x-auto'
                    } flex space-x-6 overflow-x-auto`}
                  >
                    {products?.products?.map((product: any, index: number) => (
                      <div key={index} className="col-span-1 w-60 p-0">
                        <ProductItem
                          name={product.title}
                          description={product.description}
                          rating={product.rating}
                          picture={product.pictures[0]}
                          price={product.price}
                          discount_price={product.discount_price}
                          category={product.category}
                          display={
                            product.currency_type === currency
                              ? 'relative '
                              : 'hidden '
                          }
                          id={product._id}
                          countInStock={product.countInStock}
                          product={product}
                          averageRating={product.averageRating}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default AllProducts
