import { Spinner, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext} from 'react'
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
  const history = useRouter()  

  const url = `${apiUrl}/api/order/store`
  const orders = useAuthFetch(url, userInfo?.token)

  return (
    <DashboardLayout>
      <div className="my-8 bg-white md:my-16">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-xl">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download
              invoices.
            </p>
          </div>

          {orders?.status === 'fetching' ? (
            <div className="grid h-96 content-center items-center justify-center">
              <Spinner size="xl" />
            </div>
          ) : (
            <>
              {orders?.data?.orders?.length < 1 ? (
               <div className="grid h-96 items-center content-center justify-center">
                   <Image src={no_data} height={150} objectFit="contain" />
                    <p className="text-center text-gray-700 font-semibold capitalize mt-4">No Pending Orders at the momet</p>
               </div>
              ) : (
                <>
                  <div className="mt-16">
                    <h2 className="sr-only">Recent orders</h2>
                    <div className="space-y-20">
                      {orders?.data?.orders?.map((order: any) => (
                        <div key={order._id}>
                          <h3 className="sr-only">
                            Order placed on{' '}
                            <time dateTime={order.createdAt}>
                            {moment(order.createdAt).fromNow()}
                            </time>
                          </h3>

                          <div className="rounded-lg bg-black py-2 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                            <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-3/4 lg:flex-none lg:gap-x-8">
                              
                            <div className="flex items-center justify-between pt-6 sm:pt-0">
                                <dt className="font-semibold text-white">
                                  Order
                                </dt>
                                <Text noOfLines={1} className="sm:ml-1 text-gray-200">{order.order_id}</Text>
                              </div>
                              
                              <div className="flex flex-row items-center justify-between ">
                                <dt className="font-medium text-white">
                                  Date placed
                                </dt>
                                <dd className="sm:ml-1 text-gray-200 text">
                                  <time dateTime={order.createdAt}>
                                    {moment(order.createdAt).fromNow()}
                                  </time>
                                </dd>
                              </div>
                              <div className="flex flex-row items-center pt-6 font-medium text-white sm:pt-0">
                                <p className='font-semibold'>Total amount:</p>
                                <p className="sm:ml-1">
                                  {order?.items?.reduce(
                                    (a: any, c: any) =>
                                      parseInt(a) +
                                      parseInt(c.quantity) * parseInt(c.price),
                                    0
                                  )}
                                </p>
                              </div>
                             
                              
                            </dl>
                            <a
                              href={order.invoiceHref}
                              className="mt-6 flex w-full items-center justify-center rounded-full border border-gray-300 bg-white py-1 px-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                            >
                              View Invoice
                              <span className="sr-only">
                                for order {order.number}
                              </span>
                            </a>
                          </div>

                          <table className="mt-4 w-full text-gray-500 sm:mt-6">
                            <caption className="sr-only">Products</caption>
                            <thead className="sr-only text-left font-semibold text-sm text-gray-900 sm:not-sr-only">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 pr-8 sm:w-2/5 lg:w-1/3"
                                >
                                  Product
                                </th>
                                <th
                                  scope="col"
                                  className="hidden w-1/5 py-3 pr-8 sm:table-cell"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="hidden py-3 pr-8 sm:table-cell"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="w-0 py-3 text-right"
                                >
                                  Info
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                              {order?.items?.map((product: any) => (
                                <tr key={product.id}>
                                  <td className="py-1 pr-8">
                                    <div className="flex items-center">
                                      <img
                                        src={product.pictures[0]}
                                        alt={product.description}
                                        className="mr-6 h-12 w-12 rounded object-cover object-center"
                                      />
                                      <div>
                                        <div className="font-medium text-gray-900">
                                          {product.title}
                                        </div>
                                        <div className="mt-1 sm:hidden">
                                          {product.price}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="hidden py-6 pr-8 sm:table-cell">
                                    {product.price}
                                  </td>
                                  <td className="hidden py-6 pr-8 sm:table-cell">
                                    {order.status}
                                  </td>
                                  <td className="whitespace-nowrap py-6 text-right font-medium">
                                    <div
                                      onClick={() =>
                                        history.push(
                                          `/product/d/${product._id}`
                                        )
                                      }
                                      className="cursor-pointer text-blue-primary"
                                    >
                                      View
                                      <span className="hidden lg:inline">
                                        {' '}
                                        Product
                                      </span>
                                      <span className="sr-only">
                                        , {product.name}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Orders
