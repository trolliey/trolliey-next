import React, { useContext, useRef, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import ProductLoading from '../ProductItem/ProductLoading'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'
import { Store } from '../../Context/Store'
import axios from 'axios'
import useSWR from 'swr'
import { apiUrl } from '../../utils/apiUrl'

interface Props {
  query?: any | null
  cols?: string
  no_text?: any
}

function AllProducts({ query, cols, no_text }: Props) {
  const history = useRouter()
  const { state } = useContext(Store)
  const { currency } = state
  const address = `${apiUrl}/api/product/all?page=${1}&perPage=${16}`
  const fetcher = async (url: any) =>
    await axios.get(url).then((res) => res.data)
  const { data: products, error } = useSWR(address, fetcher)

  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollAmount = 400

  const handleScroll = (scrollOffset: number) => {
    const newPosition = scrollPosition + scrollOffset

    if (containerRef.current) {
      // Calculate the maximum scroll position based on content width and container width
      const maxScrollPosition =
        containerRef.current.scrollWidth - containerRef.current.clientWidth || 0

      // Ensure newPosition doesn't go beyond limits
      const newScrollPosition = Math.max(
        0,
        Math.min(newPosition, maxScrollPosition)
      )

      setScrollPosition(newScrollPosition)
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      })

      // containerRef.current.scrollLeft = newScrollPosition
    }
  }

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
            <div>
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
            </div>
          ) : (
            <div className="relative ">
              <div className="absolute top-[50%] -right-0 -left-0 z-20 flex justify-between ">
                <button
                  disabled={scrollPosition === 0}
                  className={
                    scrollPosition === 0
                      ? 'cursor-not-allowed rounded-full bg-[#f1f1f1] p-2'
                      : 'rounded-full bg-[#f1f1f1] p-2'
                  }
                  onClick={() => handleScroll(-scrollAmount)}
                >
                  <ArrowLeftIcon
                    height={20}
                    width={20}
                    className={
                      scrollPosition === 0 ? 'text-gray-400' : 'text-gray-700'
                    }
                  />
                </button>
                <button
                  disabled={
                    scrollPosition >=
                    (containerRef.current?.scrollWidth || 0) -
                      (containerRef.current?.clientWidth || 0)
                  }
                  className={
                    scrollPosition >=
                    (containerRef.current?.scrollWidth || 0) -
                      (containerRef.current?.clientWidth || 0)
                      ? 'cursor-not-allowed rounded-full bg-[#f1f1f1] p-2'
                      : 'rounded-full bg-[#f1f1f1] p-2'
                  }
                  onClick={() => handleScroll(scrollAmount)}
                >
                  <ArrowRightIcon
                    height={20}
                    width={20}
                    className={
                      scrollPosition >=
                      (containerRef.current?.scrollWidth || 0) -
                        (containerRef.current?.clientWidth || 0)
                        ? 'text-gray-400'
                        : 'text-gray-700'
                    }
                  />
                </button>
              </div>
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
                    ref={containerRef}
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
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AllProducts
