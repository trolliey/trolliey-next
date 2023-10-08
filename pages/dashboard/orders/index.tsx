import { Select, Spinner, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { Store } from '../../../Context/Store'
import DashboardLayout from '../../../layouts/DashboardLayout'
import no_data from '../../../public/img/not_data.svg'
import Image from 'next/image'
import moment from 'moment'
import { apiUrl } from '../../../utils/apiUrl'
import { useAuthFetch } from '../../../hooks/useAuthFetch'

function Orders() {
  const { state } = useContext(Store)
  const { userInfo } = state

  const url = `${apiUrl}/api/order/store`
  const orders = useAuthFetch(url, userInfo?.token)

  const [filter, setFilter] = useState('') // Default filter is 'daily'

  // Filter orders based on the selected filter (daily, weekly, monthly)
  const filteredOrders = orders?.data?.orders?.filter((order: any) => {
    const orderDate = moment(order.createdAt)
    const currentDate = moment()

    if (filter === 'daily') {
      return orderDate.isSame(currentDate, 'day')
    } else if (filter === 'weekly') {
      return orderDate.isSame(currentDate, 'week')
    } else if (filter === 'monthly') {
      return orderDate.isSame(currentDate, 'month')
    } else if (filter === 'yearly') {
      return orderDate.isSame(currentDate, 'year')
    }

    return true // Show all orders if filter is not selected
  })
  console.log(filteredOrders)

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
        Order history
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Check the status of recent orders, manage returns, and download
        invoices.
      </p>
      <div className="lg:w-1/4">
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-4 w-1/2"
          size={'md'}
        >
          {/* option placeholder */}
          <option value="">Filter By</option>
          <option value="daily">Today</option>
          <option value="weekly">This Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Select>
      </div>
      {orders?.status === 'fetching' ? (
        <div className="mt-8 text-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <table className="mt-4 w-full border-collapse rounded border border-gray-300">
          <caption className="sr-only">Order history</caption>
          <thead className="rounded bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Order Id</th>
              <th className="py-2 px-4 text-left">Items</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Date Placed</th>
              <th className="py-2 px-4 text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order: any) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="text-wrap max-w-lg whitespace-normal py-2 px-4 ">
                  {' '}
                  <div className="flex items-center">
                    <div className="ml-2">
                      <Text>{order.order_id}</Text>
                    </div>
                  </div>
                </td>

                <td className="py-2 px-4">
                  {order?.items?.map((item: any) => (
                    <div key={item._id} className="flex items-center">
                      <div className="ml-2">
                        <Text>{item.title}</Text>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4">
                  {order?.status === 'pending' ? (
                    <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                      Pending
                    </span>
                  ) : order?.status === 'paid' ? (
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      Paid
                    </span>
                  ) : order?.status === 'delivered' ? (
                    <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                      Delivered
                    </span>
                  ) : order?.status === 'cancelled' ? (
                    <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                      Cancelled
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                      Unknown
                    </span>
                  )}
                </td>

                <td className="py-2 px-4">
                  {moment(order.createdAt).fromNow()}
                </td>
                <td className="py-2 px-4 text-right">
                  {order?.items?.reduce(
                    (a: any, c: any) => a + c.quantity * c.price,
                    0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Orders
