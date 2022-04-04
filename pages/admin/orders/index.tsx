import React from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import Orders from '../../../models/Order'
import { connect, disconnect } from '../../../utils/mongo'
import moment from 'moment'
import OrdersDropdown from '../../../components/Dropdowns/OrdersDropdown'

function ManageOrders(props: any) {
  const { orders } = props
  return (
    <AdminDashboard>
      <p className="my-8 text-center text-lg font-semibold text-gray-800">
        Manage all orders from here!
      </p>
      <div className="flex min-h-screen flex-col px-2 md:px-4">
        <div className="grid grid-cols-5 rounded-t bg-black p-2 text-sm text-white">
          <div className="col-span-1">order number</div>
          <div className="col-span-1">status</div>
          <div className="col-span-1">Orderd by</div>
          <div className="col-span-1">time orderd</div>
          <div className="col-span-1">action</div>
        </div>
        {orders?.map((order: any, index: number) => (
          <div key={index} className="grid grid-cols-5 p-2">
            <div className="col-span-1">{order._id}</div>
            <div className="col-span-1 items-center">
              <div className="flex items-center">
                {order.isDelivered ? (
                  <p className="rounded-full bg-green-600 py-1 px-2 text-xs text-white">
                    delivered
                  </p>
                ) : (
                  <p className="animate-pulse rounded-full bg-blue-600 py-1 px-2 text-xs text-white">
                    pending
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">{order.full_name}</div>
            <div className="col-span-1">
              {moment(order.createdAt).fromNow()}
            </div>
            <div className="col-span-1">
              <OrdersDropdown id={order._id} />
            </div>
          </div>
        ))}
      </div>
    </AdminDashboard>
  )
}

export async function getServerSideProps(context: any) {
  await connect()
  const orders = await Orders.find({}).lean()
  await disconnect()
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  }
}

export default ManageOrders
