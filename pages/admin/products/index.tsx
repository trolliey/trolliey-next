import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ProductsTable from '../../../components/Tables/ProductsTable'
import AdminDashboard from '../../../layouts/AdminDashboard'

function ManageProducts() {

  const [loading, setLoading] = useState<boolean>(false)
  const [search_query, setSearchQuery] = useState<string>('')
  const [products, setProducts] = useState<any>([])
  const [data_info, setDAtaInfo] = useState()
  const [page, setPage] = useState(1)
  const cache = useRef<any>({})

  useEffect(() => {
    let cancelRequest = false
    const prod_page = page ? page : 1
    const url = `/api/products?page=${prod_page}&perPage=${16}`
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

  return (
    <AdminDashboard>
      <div className="flex w-full flex-1 flex-col px-4">
        <p className="my-4 text-center font-semibold text-gray-900">
          Manage all products
        </p>
        <div className="flex flex-col">
          <ProductsTable data_info={data_info} products={products} />
        </div>
      </div>
    </AdminDashboard>
  )
}

export default ManageProducts
