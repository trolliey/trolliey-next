import React, { useContext, useState, useEffect, useRef } from 'react'
import ExploreLayout from '../../layouts/ExploreLayout'
import { connect, disconnect, convertDocToObj } from '../../utils/mongo'
import Products from '../../models/Product'
import { Store } from '../../Context/Store'
import axios from 'axios'
import no_product from '../../public/img/no_product.svg'
import Image from 'next/image'
import ProductItem from '../../components/ProductItem/ProductItem'
import ProductLoading from '../../components/ProductItem/ProductLoading'

export default function Explore() {
  const { state } = useContext(Store)
  const { search_query, currency } = state
  const cache = useRef<any>({})
  const [products, setProducts] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<any>(1)

  // get all products
  useEffect(() => {
    let cancelRequest = false
    const url = `/api/products?page=${page}`
    setLoading(true)
    const getData = async () => {
      if (cache.current[url]) {
        const data = cache.current[url]
        setProducts(data)
        setLoading(false)
      } else {
        try {
          const { data } = await axios.post(url, {
            query: search_query,
          })
          cache.current[url] = data
          if (cancelRequest) return
          setProducts(data)
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
  }, [search_query, page])

  return (
    <ExploreLayout>
      {loading ? (
        <div className="scrollbar-hide relative mx-auto grid grid-cols-2 gap-4 rounded-lg bg-white p-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
            <div key={index} className="col-span-1 p-0">
              <ProductLoading />
            </div>
          ))}
        </div>
      ) : (
        <>
          {products?.length < 1 ? (
            <div className=" grid h-96 content-center items-center justify-center">
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
                className={`mx-auto grid w-full grid-cols-2 gap-4 rounded-lg md:grid-cols-4 md:gap-8  lg:grid-cols-4`}
              >
                {products?.map((product: any, index: number) => (
                  <div key={index} className="col-span-1 p-0">
                    {product.currency_type === currency ? (
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
                    ) : currency === 'ANY' ? (
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
                    ) : null}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
      <div className="flex flex-row items-center justify-between pt-8">
        {page === 1 ? (
          <div className="flex cursor-pointer rounded border border-blue-primary bg-white p-2 text-sm font-semibold text-blue-primary hover:bg-blue-dark">
            Prev Page
          </div>
        ) : (
          <div
            onClick={() => setPage(page - 1)}
            className="flex cursor-pointer rounded bg-blue-primary p-2 text-sm font-semibold text-white hover:bg-blue-dark"
          >
            Prev Page
          </div>
        )}
        <div
          onClick={() => setPage(page + 1)}
          className="flex cursor-pointer rounded bg-blue-primary p-2 text-sm font-semibold text-white hover:bg-blue-dark"
        >
          Next Page
        </div>
      </div>
    </ExploreLayout>
  )
}

export async function getServerSideProps(context: any) {
  await connect()
  const products = await Products.find({}).lean()
  await disconnect()
  return {
    props: {
      //@ts-ignore
      products: products?.map(convertDocToObj),
    },
  }
}
