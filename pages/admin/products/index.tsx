import React, { useState } from 'react'
import ProductsTable from '../../../components/Tables/ProductsTable'
import { useFetch } from '../../../hooks/useFetch'
import AdminDashboard from '../../../layouts/AdminDashboard'
import { apiUrl } from '../../../utils/apiUrl'

const PER_PAGE = 16 
function ManageProducts() {

  const [page, setPage] = useState(1)
  const url = `${apiUrl}/api/product/all?page=${page}&perPage=${PER_PAGE}`
  const all_pro = useFetch(url)

  return (
    <AdminDashboard>
      <div className="flex w-full flex-1 flex-col px-4">
        <p className="my-4 text-center font-semibold text-gray-900">
          Manage all products
        </p>
        <div className="flex flex-col">
          <ProductsTable setPage={setPage} PER_PAGE={PER_PAGE} data_info={all_pro?.data?.meta} products={all_pro?.data?.products} />
        </div>
      </div>
    </AdminDashboard>
  )
}

export default ManageProducts
