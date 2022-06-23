import React, { useEffect, useRef, useState } from 'react'
import StoreLayout from '../../../layouts/StoreLayout'
import Store from '../../../models/Store'
import { connect, disconnect } from '../../../utils/mongo'
import axios from 'axios'
import { useRouter } from 'next/router'
import ProductLoading from '../../../components/ProductItem/ProductLoading'
import ProductItem from '../../../components/ProductItem/ProductItem'
import Image from 'next/image'
import no_data from '../../../public/img/not_data.svg'
import { SearchIcon } from '@heroicons/react/outline'

function StoreProducts(props: any) {
  const [products, setProducts] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [search_query, setSearchQuery] = useState('') 
  const cache = useRef<any>({})

  const history = useRouter()
  const { id } = history.query

  useEffect(() => {
    let cancelRequest = false
    const url = `/api/store/${id}?keyword=${search_query}`
    setLoading(true)
    const getData = async () => {
      if (cache.current[url]) {
        const data = cache.current[url]
        setProducts(data?.products)
        setLoading(false)
      } else {
        try {
          const { data } = await axios.get(url)
          cache.current[url] = data
          if (cancelRequest) return
          setProducts(data?.products)
          setLoading(false)
        } catch (error) {
          if (cancelRequest) return
          setLoading(false)
        }
      }
    }
    getData()
    return function cleanup() {
      cancelRequest = true
    }
  }, [search_query])

  if (products?.length === 0) {
    return (
      <StoreLayout store_info={props.store}>
        <div className="grid h-96 w-full content-center items-center justify-center rounded bg-white p-4 ">
          <div className="relative">
            <Image src={no_data} objectFit="contain" height={96} />
          </div>
          <p className="text-center font-semibold text-gray-700">
            Store had no products yet
          </p>
        </div>
      </StoreLayout>
    )
  }

  return (
    <StoreLayout store_info={props.store}>
      <div className="flex w-full flex-col rounded bg-white p-4 shadow">
        <div className="flex w-full flex-row items-center px-4  border border-gray-200 rounded">
          <SearchIcon height={20} width={20} className="text-gray-400" />
          <input 
            type="text" 
            onChange={(e:any)=> setSearchQuery(e.target.value)}
            placeholder='Search in store' 
            className='p-2 w-full outline-none border-none' />
        </div>
        <h1 className="my-4 text-center font-semibold text-gray-700">
          All products sold by {props.store?.company_name}
        </h1>
        {loading ? (
          <div
            className={`mx-auto grid w-full grid-cols-2 gap-4 rounded-lg md:grid-cols-4 md:gap-8  lg:grid-cols-5`}
          >
            {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
              <div key={index} className="col-span-1 p-0">
                <ProductLoading />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`mx-auto grid w-full grid-cols-2 gap-4 rounded-lg md:grid-cols-4 md:gap-8  lg:grid-cols-5`}
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
        )}
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
