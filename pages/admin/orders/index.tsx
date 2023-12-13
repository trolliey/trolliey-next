import React, { useContext, useEffect, useState } from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import Orders from '../../../models/Order'
import { connect, disconnect } from '../../../utils/mongo'
import moment from 'moment'
import OrdersDropdown from '../../../components/Dropdowns/OrdersDropdown'
import { Button, Text } from '@chakra-ui/react'
import { Store } from '../../../Context/Store'
import OrderForm from './OrderForm'
import axios from 'axios'
import { apiUrl } from '../../../utils/apiUrl'

function ManageOrders(props: any) {
  // const { orders } = props
  const { state } = useContext(Store)
  const { userInfo } = state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [order, setOrder] = useState({})
  const [orders, setOrders] = useState([])

  const handleSubmit = (newOrder: any) => {
    // Handle the submission of the order here
    console.log('Submitted order:', newOrder)
  }

  const getOrders = async () => {
    axios
      .get(`${apiUrl}/api/v2/orders`, {
        headers: {
          Authorization: `${userInfo?.token}`,
        },
      })

      .then((res) => {
        console.log(res.data, 'uuuuuuu')
        setOrders(res.data?.data?.orders)
      })
  }

  useEffect(() => {
    getOrders()
  }, [orders])

  return (
    <AdminDashboard>
      <p className="my-8 text-center text-lg font-semibold text-gray-800">
        Manage all orders from here!
      </p>
      {/* <Button onClick={() => setIsModalOpen(true)}>Open Order Form</Button>
      <OrderForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        order={order}
      /> */}
      <div className="min-h-screen overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-black text-sm text-white">
              <th className="py-2 px-3">Order</th>
              <th className="py-2 px-3">Status</th>
              <th className="hidden py-2 px-3 md:table-cell">Ordered by</th>
              <th className="hidden py-2 px-3 md:table-cell">Address</th>
              <th className="hidden py-2 px-3 md:table-cell">Payment Status</th>
              <th className="hidden py-2 px-3 md:table-cell">Phone Number</th>
              <th className="py-2 px-3">Time Ordered</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: any, index: number) => (
              <tr key={index} className="border-b text-sm">
                <td className="truncate py-3 px-3">{order?.number}</td>
                <td className="py-3 px-3">
                  {order.status === 'completed' ? (
                    <span className="rounded-full bg-green-600 py-1 px-2 text-xs text-white">
                      Delivered
                    </span>
                  ) : order.status === 'intransit' ? (
                    <span className="rounded-full bg-blue-600 py-1 px-2 text-xs text-white">
                      Transit
                    </span>
                  ) : order.status === 'declined' ? (
                    <span className="rounded-full bg-red-600 py-1 px-2 text-xs text-white">
                      Cancelled
                    </span>
                  ) : (
                    <span className="animate-pulse rounded-full bg-orange-600 py-1 px-2 text-xs text-white">
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="hidden py-3 px-3 md:table-cell">
                  {order.full_name}
                </td>
                <td className="hidden py-3 px-3 md:table-cell">
                  {order?.address}
                </td>
                <td className="hidden py-3 px-3 md:table-cell">
                  {order?.payment ? order?.payment?.status : 'Not Paid'}
                </td>
                <td className="hidden py-3 px-3 md:table-cell">
                  {order?.phone}
                </td>
                <td className="py-3 px-3">
                  <Text noOfLines={1}>{moment(order.createdAt).fromNow()}</Text>
                </td>
                <td className="py-3 px-3">
                  <OrdersDropdown id={order._id} user={userInfo} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
