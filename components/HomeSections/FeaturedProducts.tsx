import React, { ReactElement, useRef, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import ProductLoading from '../ProductItem/ProductLoading'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, BadgeCheckIcon } from '@heroicons/react/outline'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { apiUrl } from '../../utils/apiUrl'
import { useFetch } from '../../hooks/useFetch'

interface Props {
  heading: string
  category?: string
  sortBy?: string
  is_special?: boolean
  sortOrder?: string
}

function FeaturedProducts({
  heading,
  category,
  sortBy,
  is_special,
  sortOrder,
}: Props): ReactElement {
  const address = `${apiUrl}/api/product/all?page=${1}&sortOrder=${sortOrder}$&perPage=${16}&sortBy=${sortBy}&category=${
    category ? category : ''
  }`
  const response = useFetch(address)
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
    <>
      {response?.error ? (
        <div className="grid w-full content-center items-center justify-center py-2">
          <p className="rounded bg-red-200 p-2 text-center text-sm font-semibold text-gray-700">
            There was an error loading products. Reload page
          </p>
        </div>
      ) : (
        <>
          {response?.status === 'fetching' ? (
            <>
              <div className="scrollbar-hide relative mx-auto hidden w-full grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-8 lg:grid-cols-5">
                {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
                  <div
                    key={index}
                    className="col-span-1 rounded-lg bg-white p-2"
                  >
                    <ProductLoading />
                  </div>
                ))}
              </div>
              <div className="scrollbar-hide relative mx-auto grid  w-full grid-cols-2 gap-4 md:hidden md:grid-cols-4 md:gap-8 lg:grid-cols-5">
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
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row items-center justify-between pb-4">
                <p className="font-semibold text-gray-700">{heading}</p>
                <Link href={'/explore'} passHref>
                  <a className="flex">
                    <ArrowRightIcon
                      height={20}
                      width={20}
                      className={'text-gray-700'}
                    />
                  </a>
                </Link>
              </div>
              {response?.data?.products?.length < 1 ? (
                <div className=" h-68 grid content-center items-center justify-center rounded bg-white py-2">
                  <div className="relative h-40">
                    <Image src={no_product} layout="fill" objectFit="contain" />
                  </div>
                  <p className="mt-4 text-center font-semibold capitalize text-gray-700">
                    no products found
                  </p>
                </div>
              ) : (
                <div className="relative ">
                  <div
                    ref={containerRef}
                    className="scrollbar-hide relative mx-auto flex space-x-2 overflow-x-auto"
                  >
                    {response?.data?.products?.map(
                      (product: any, index: number) => (
                        <div
                          key={index}
                          className="relative col-span-1 rounded-lg bg-white p-2 "
                        >
                          {product.store_verified && (
                            <div className="absolute top-0 left-0 z-10 flex items-center space-x-1 rounded-tl-lg rounded-br-lg bg-blue-700 p-1 text-xs text-white">
                              <BadgeCheckIcon height={20} width={20} />
                            </div>
                          )}
                          <div className="z-0">
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
                        </div>
                      )
                    )}
                  </div>
                  <div className="absolute top-[50%] right-0 left-0 flex justify-between ">
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
                          scrollPosition === 0
                            ? 'text-gray-400'
                            : 'text-gray-700'
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
