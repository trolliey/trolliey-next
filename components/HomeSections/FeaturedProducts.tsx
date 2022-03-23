import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { ReactElement, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import ProductLoading from '../ProductItem/ProductLoading'

interface Props {
  products?: any | null
  loading?: boolean
}

function FeaturedProducts({ products, loading }: Props): ReactElement {
  const [show_indicators, setShowIndicators] = useState<boolean>(false)

  const handleOnPrevClick = () => {
    console.log('previous')
  }

  const handleOnNextClick = () => {
    console.log('next')
  }

  return (
    <>
      {loading ? (
        <div className="relative mx-auto grid grid-cols-2 gap-4 rounded-lg bg-white p-4 md:grid-cols-4 md:gap-8 lg:grid-cols-5">
          {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
            <div key={index} className="col-span-1 p-0">
              <ProductLoading />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            onMouseEnter={() => setShowIndicators(true)}
            onMouseLeave={() => setShowIndicators(false)}
            className="relative mx-auto grid grid-cols-2 gap-4 rounded-lg bg-white p-4 md:grid-cols-4 md:gap-8 lg:grid-cols-5"
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
                />
              </div>
            ))}
            <div className="absolute top-1/2 flex w-full -translate-y-1/2 transform items-start justify-between px-3">
              {show_indicators && (
                <>
                  <button
                    onClick={handleOnPrevClick}
                    className="rounded-full bg-gray-100 p-2"
                  >
                    <ChevronLeftIcon
                      height={20}
                      width={20}
                      className="text-gray-700"
                    />
                  </button>
                  <button
                    onClick={handleOnNextClick}
                    className="rounded-full bg-gray-100 p-2"
                  >
                    <ChevronRightIcon
                      height={20}
                      width={20}
                      className="text-gray-700"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default FeaturedProducts
