import React, { useState, useEffect, useContext } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { SearchIcon } from '@heroicons/react/outline'
import ProductsTable from '../../../components/Tables/ProductsTable'
import BlueButton from '../../../components/Buttons/BlueButton'
import { useRouter } from 'next/router'
import { Store } from '../../../Context/Store'
import { Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import no_product from '../../../public/img/no_product.svg'
import { useAuthFetch } from '../../../hooks/useAuthFetch'
import { apiUrl } from '../../../utils/apiUrl'
import { XIcon } from '@heroicons/react/solid'

const PER_PAGE = 8

export default function Inventory() {
  const history = useRouter()
  const [search_query, setSearchQuery] = useState<string>('')
  const [products, setProducts] = useState<any>([])
  const { state } = useContext(Store)
  const [page, setPage] = useState(1)
  const { userInfo } = state
  const prod_page = page ? page : 1
  const new_url = `${apiUrl}/api/store/products?page=${prod_page}&keyword=${
    search_query ? search_query : ''
  }&perPage=${PER_PAGE}&sortOrder=${
    history.query.sort_order ? history.query.sort_order : ''
  }&sortBy=${history.query.sort_value ? history.query.sort_value : ''}`
  const all_products = useAuthFetch(new_url, userInfo?.token)

  useEffect(() => {
    setProducts(all_products?.data)
  }, [all_products])

  console.log(all_products)

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
                value={search_query}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search something and press enter"
                className="flex-1 p-2 outline-none"
              />
              {search_query && (
                <span
                  className="cursor-pointer rounded-full bg-[#0e75bc] p-1 text-white hover:bg-blue-dark"
                  onClick={() => setSearchQuery('')}
                >
                  <XIcon height={12} width={12} />
                </span>
              )}
            </div>

            <BlueButton
              text="Create Product"
              onClick={() => history.push('/dashboard/inventory/create')}
            />
          </div>
        </div>

        {all_products?.status === 'fetching' ? (
          <div className="grid h-96 w-full content-center items-center justify-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            {all_products?.status === 'fetched' && (
              <>
                {products?.length < 1 ? (
                  <div className=" h-68 grid content-center items-center justify-center">
                    <div className="relative h-40">
                      <Image
                        src={no_product}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <p className="my-4 text-center font-semibold capitalize text-gray-700">
                      You have not added any products yet
                    </p>
                    <BlueButton
                      text={'Click here to add product'}
                      onClick={() =>
                        history.push('/dashboard/inventory/create')
                      }
                    />
                  </div>
                ) : (
                  <>
                    <ProductsTable
                      products={products?.products}
                      PER_PAGE={PER_PAGE}
                      delete_item_from_table={delete_item_from_table}
                      data_info={products?.meta}
                      setPage={setPage}
                      page={page}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
