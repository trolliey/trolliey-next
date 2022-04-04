import React from 'react'
import ProductsTable from '../../../components/Tables/ProductsTable'
import AdminDashboard from '../../../layouts/AdminDashboard'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'

function ManageProducts(props: any) {
  const { products } = props
  return (
    <AdminDashboard>
      <div className="flex w-full flex-1 flex-col px-4">
        <p className="my-4 text-center font-semibold text-gray-900">
          Manage all products
        </p>
        <div className="flex flex-col">
          <ProductsTable products={products} />
        </div>
      </div>
    </AdminDashboard>
  )
}

export async function getServerSideProps(context: any) {
  await connect()
  const products = await Products.find({}).lean()
  await disconnect()
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

export default ManageProducts
