import React, { useState, useEffect, useContext, useRef } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { SearchIcon } from '@heroicons/react/outline'
import ProductsTable from '../../../components/Tables/ProductsTable'
import BlueButton from '../../../components/Buttons/BlueButton'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Store } from '../../../Context/Store'
import { Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import no_product from '../../../public/img/no_product.svg'

const PER_PAGE = 8

export default function Inventory() {
  const history = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [search_query, setSearchQuery] = useState<string>('')
  const [products, setProducts] = useState<any>([])
  const [data_info, setDAtaInfo] = useState()
  const { state } = useContext(Store)
  const [page, setPage] = useState(1)
  const { userInfo } = state
  const cache = useRef<any>({})

  useEffect(() => {
    let cancelRequest = false
    const prod_page = page ? page : 1
    const url = `/api/dashboard/store_products/?page=${prod_page}&keyword=${search_query ? search_query : ''}&perPage=${PER_PAGE}`
    const getData = async () => {
      if (cache.current[url]) {
        const data = cache.current[url]
        setProducts(data?.products)
        
        setLoading(false)
      } else {
        try {
          setLoading(true)
          const { data } = await axios.post(
            url,
            {
              query: search_query,
            },
            {
              headers: {
                authorization: userInfo?.token,
              },
            }
          )
          cache.current[url] = data
          if (cancelRequest) return
          setProducts(data?.products)
          setDAtaInfo(data?.meta)
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

  // console.log(products)
  const delete_item_from_table = (id: any) => {
    setProducts(products.filter((item: any) => item._id !== id))
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col p-2 md:p-8">
        <div className="mb-8 flex flex-col rounded bg-white p-2 shadow md:p-4">
          <div className="flex flex-col items-center space-x-2 md:flex-row md:space-x-8">
            {/* <p className="text text-gray-700 font-semibold">Products</p> */}
            <div className="mb-4 flex w-full flex-1 flex-row items-center rounded border border-gray-200 px-2 text-gray-500 md:mb-0">
              <SearchIcon height={20} width={20} />
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search something and press enter"
                className="flex-1 p-2 outline-none"
              />
            </div>
            <BlueButton
              text="Create Product"
              onClick={() => history.push('/dashboard/inventory/create')}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid h-96 w-full content-center items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {products?.length < 1 ? (
              <div className=" h-68 grid content-center items-center justify-center">
                <div className="relative h-40">
                  <Image src={no_product} layout="fill" objectFit="contain" />
                </div>
                <p className="my-4 text-center font-semibold capitalize text-gray-700">
                  You have not added any products yet
                </p>
                <BlueButton
                  text={'Click here to add product'}
                  onClick={() => history.push('/dashboard/inventory/create')}
                />
              </div>
            ) : (
              <>
                <ProductsTable
                  products={products}
                  PER_PAGE={PER_PAGE}
                  delete_item_from_table={delete_item_from_table}
                  data_info={data_info}
                  setPage={setPage}
                  page={page}
                />
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
