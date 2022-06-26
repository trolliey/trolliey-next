import React, { useState } from 'react'
import StoreLayout from '../../../layouts/StoreLayout'
import Store from '../../../models/Store'
import { connect, disconnect } from '../../../utils/mongo'
import { useRouter } from 'next/router'
import ProductLoading from '../../../components/ProductItem/ProductLoading'
import ProductItem from '../../../components/ProductItem/ProductItem'
import Image from 'next/image'
import no_data_svg from '../../../public/img/not_data.svg'
import { BadgeCheckIcon, SearchIcon } from '@heroicons/react/outline'
import { useFetch } from '../../../hooks/useFetch'
import MobileProductItem from '../../../components/ProductItem/MobileProductItem'
import MobileProductItemLoading from '../../../components/ProductItem/MobileProductItemLoading'
import LoadMoreComponent from '../../../components/LoadMore/LoadMoreComponent'

function StoreProducts(props: any) {
  const [page, setPage] = useState<number>(1)
  const [search_query, setSearchQuery] = useState('')
  const [api_search, setApiSearch] = useState<string>('')
  const history = useRouter()
  const { id } = history.query

  const url = `/api/store/${id}?keyword=${api_search ? api_search : ''}`
  // start the fetching using the useFetch hook
  const state = useFetch(url)

  if (state?.data.products?.length < 1) {
    return (
      <StoreLayout store_info={props.store}>
        <div className="flex w-full flex-col rounded-lg bg-white p-2 shadow md:p-4">
          <div className="flex w-full flex-row items-center pb-4">
            <div className="flex w-full flex-row overflow-hidden rounded-lg border border-gray-200">
              <input
                type="text"
                placeholder="search from store ..."
                onChange={(e: any) => setSearchQuery(e.target.value)}
                className="flex-1 border-none p-2 outline-none"
              />
              <div onClick={() => setApiSearch(search_query)} className="flex cursor-pointer flex-col items-center bg-blue-primary p-2 text-white hover:bg-blue-dark">
                <SearchIcon height={20} width={20} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="mx-auto flex flex-col items-center py-16">
              <div className="relative h-44 w-44 md:h-80 md:w-80">
                <Image layout="fill" src={no_data_svg} alt="Loading error" />
              </div>
              <p className="pt-8 text-center text-base font-semibold text-gray-700 md:text-lg">
                Sorry. We could not find any products!
              </p>
            </div>
          </div>
        </div>
      </StoreLayout>
    )
  }

  return (
    <StoreLayout store_info={props.store}>
      <div className="w-full rounded-lg bg-white p-2 shadow md:p-4">
        {/* desktop mobile items and loading components
        loading component is the same on both mobile and desktop
      */}
        <div className="flex w-full flex-row items-center pb-4">
          <div className="flex w-full flex-row overflow-hidden rounded-lg border border-gray-200">
            <input
              type="text"
              placeholder="search from store ..."
              onChange={(e: any) => setSearchQuery(e.target.value)}
              className="flex-1 border-none p-2 outline-none"
            />
            <div onClick={() => setApiSearch(search_query)} className="flex cursor-pointer flex-col items-center bg-blue-primary p-2 text-white hover:bg-blue-dark">
              <SearchIcon height={20} width={20} />
            </div>
          </div>
        </div>
        <p className='text-gray-700 font-semibold text-center pb-4 capitalize'>Store has <span className='text-blue-primary'>{state?.data.meta?.total}</span> products</p>
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
                <LoadMoreComponent
                  setPage={setPage}
                  state={state}
                  page={page}
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
                <LoadMoreComponent
                  setPage={setPage}
                  state={state}
                  page={page}
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
      </div>
    </StoreLayout>
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context
  const { id } = params
  await connect()
  const store = await Store.findOne({ _id: id }).lean()
  await disconnect()
  return {
    props: {
      //@ts-ignore
      store: JSON.parse(JSON.stringify(store)),
    },
  }
}

export default StoreProducts
