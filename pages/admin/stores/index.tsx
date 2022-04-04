import React from 'react'
import StoresTable from '../../../components/Tables/StoresTable'
import AdminDashboard from '../../../layouts/AdminDashboard'
import Store from '../../../models/Store'
import { connect, disconnect } from '../../../utils/mongo'

function ManageStores(props: any) {
  const { stores} = props
  return (
    <AdminDashboard>
      <p className="my-4 text-center text-lg font-semibold capitalize text-gray-700">
        manage all stores
      </p>
      <div className="min-h-screen">
        <StoresTable stores={stores} />
      </div>
    </AdminDashboard>
  )
}

export async function getServerSideProps(context: any) {
  await connect()
  const stores = await Store.find({}).lean()
  await disconnect()
  return {
    props: {
      stores: JSON.parse(JSON.stringify(stores)),
    },
  }
}

export default ManageStores
