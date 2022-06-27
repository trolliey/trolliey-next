import { BadgeCheckIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import MobileProductItem from '../../components/ProductItem/MobileProductItem'
import MobileProductItemLoading from '../../components/ProductItem/MobileProductItemLoading'
import ProductItem from '../../components/ProductItem/ProductItem'
import ProductLoading from '../../components/ProductItem/ProductLoading'
import { Store } from '../../Context/Store'
import { useFetch } from '../../hooks/useFetch'
import ExploreLayout from '../../layouts/ExploreLayout'
import loading_error_svg from '../../public/images/loading_error.svg'
import no_data_svg from '../../public/images/not_data.svg'
import Pagination from '../../components/Pagination/Pagination'

const PER_PAGE = 16;

function Explore() {
  const [page, setPage] = useState<number>(1)
  const { state: store_state } = useContext(Store)
  const { search_category, search_query } = store_state

  const url = `/api/products?page=${page}&category=${
    search_category ? search_category : ''
  }&keyword=${search_query ? search_query : ''}&perPage=${PER_PAGE}`

  // start the fetching using the useFetch hook
  const state = useFetch(url)

  if (state.error) {
    return (
      <ExploreLayout>
        <div className="flex w-full flex-col">
          <div className="mx-auto flex flex-col items-center py-16">
            <div className="relative h-44 w-44 md:h-80 md:w-80">
              <Image
                layout="fill"
                src={loading_error_svg}
                alt="Loading error"
              />
            </div>
            <p className="text-center text-lg py-4 font-semibold text-gray-700">
              There was an error loading items. Please again later!
            </p>
            <p className="text-center text-sm text-gray-700">
              {JSON.stringify(state.error)}
            </p>
          </div>
        </div>
      </ExploreLayout>
    )
  }

  // handle if there are no products found
  if (state?.data.products?.length < 1) {
    return (
      <ExploreLayout>
        <div className="flex w-full flex-col">
          <div className="mx-auto flex flex-col items-center py-16">
            <div className="relative h-44 w-44 md:h-80 md:w-80">
              <Image
                layout="fill"
                src={no_data_svg}
                alt="Loading error"
              />
            </div>
            <p className="text-center md:text-lg pt-8 text-base font-semibold text-gray-700">
              Sorry. We could not find any products!
            </p>
          </div>
        </div>
      </ExploreLayout>
    )
  }

  // display products on both mobile and pc
  return (
    <ExploreLayout>
      {/* desktop mobile items and loading components
        loading component is the same on both mobile and desktop
      */}
      <div className="hidden md:flex">
        {state.status === 'fetched' ? (
          <div className="flex w-full flex-col">
            <div
              className={`mx-auto hidden w-full grid-cols-2 gap-4 rounded-lg md:grid md:grid-cols-3  lg:grid-cols-4`}
            >
              {state?.data.products?.map((product: any, index: number) => (
                <div key={index} className="relative col-span-1 p-0">
                  {product.store_verified && (
                    <div className="absolute top-0 left-0 z-20 flex items-center space-x-1 rounded-tl-lg rounded-br-lg bg-blue-700 p-1 text-xs text-white">
                      <BadgeCheckIcon height={16} width={16} />
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
            </div>
          
            <>
              <Pagination 
                className='flex flex-1 py-8 mx-auto'
                currentPage={page}
                totalCount={state?.data.meta?.total}
                pageSize={PER_PAGE}
                onPageChange={(page:number) => setPage(page)}
              />
            </>
          </div>
        ) : (
          <div className="`mx-auto hidden w-full grid-cols-2 gap-4 rounded-lg md:grid md:grid-cols-3 md:gap-8  lg:grid-cols-4">
            {Array.from(Array(16).keys())?.map((item, index) => (
              <ProductLoading key={index} />
            ))}
          </div>
        )}
      </div>

      {/* mobile products and loading
        load more component is the same on both compnents
      */}
      <div className="flex md:hidden">
        {state.status === 'fetched' ? (
          <div className="flex w-full flex-col">
            <div className={`mx-auto w-full space-y-4`}>
              {state?.data.products?.map((product: any, index: number) => (
                <div key={index} className="relative col-span-1 p-0">
                  {product.store_verified && (
                    <div className="absolute top-0 left-0 z-20 flex items-center space-x-1 rounded-tl-lg rounded-br-lg bg-blue-700 p-1 text-xs text-white">
                      <BadgeCheckIcon height={16} width={16} />
                    </div>
                  )}
                  <MobileProductItem
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
            <>
              <Pagination 
                className='flex flex-1 py-8 mx-auto'
                currentPage={page}
                totalCount={state?.data.meta?.total}
                pageSize={PER_PAGE}
                onPageChange={(page:number) => setPage(page)}
              />
            </>
            
          </div>
        ) : (
          <div className="`mx-auto hidden w-full grid-cols-2 gap-4 rounded-lg md:grid md:grid-cols-3 md:gap-8  lg:grid-cols-4">
            {Array.from(Array(16).keys())?.map((item, index) => (
              <MobileProductItemLoading key={index} />
            ))}
          </div>
        )}
      </div>
    </ExploreLayout>
  )
}

export default Explore
