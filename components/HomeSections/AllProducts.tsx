import React from 'react'
import ProductItem from '../ProductItem/ProductItem'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import ProductLoading from '../ProductItem/ProductLoading'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'

interface Props {
  products?: any | null
  query?: any | null
  cols?: string
  no_text?: any
  loading?: boolean
}

function AllProducts({ products, query, cols, no_text, loading }: Props) {
  const history = useRouter()

  return (
    <div className="mb-8 flex w-full flex-col bg-white p-2">
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
      {loading ? (
        <div
          className={`${
            cols ? cols : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
          } mx-auto grid w-full gap-4 rounded-lg  md:gap-8`}
        >
          {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
            <div key={index} className="col-span-1 p-0">
              <ProductLoading />
            </div>
          ))}
        </div>
      ) : (
        <>
          {products?.length < 1 ? (
            <div className=" grid h-68 content-center items-center justify-center">
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
                  cols ? cols : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
                } mx-auto grid w-full gap-4 rounded-lg  md:gap-8`}
              >
                {products?.map((product: any, index: number) => (
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
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default AllProducts
