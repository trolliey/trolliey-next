import { Spinner, Text } from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../Context/Store'
import GeneralLayout from '../../layouts/GeneralLayout'
import no_product from '../../public/img/no_product.svg'

function Orders() {
  const { state } = useContext(Store)
  const [all_orders, setAllOrders] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { userInfo } = state
  const history = useRouter()

  useEffect(() => {
    const get_orders = async () => {
      setLoading(true)
      const { data } = await axios.get('/api/orders', {
        headers: {
          authorization: userInfo.token,
        },
      })
      setLoading(false)
      setAllOrders(data)
    }
    get_orders()
  }, [])

  return (
    <GeneralLayout
      no_text
      title="Order History"
      description="A history of all your orders you did through Trolliey"
    >
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

          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            {loading ? (
              <div className="flex w-full flex-col items-center">
                <Spinner />
              </div>
            ) : (
              <>
                {all_orders?.length < 1 ? (
                  <div className=" h-68 grid content-center items-center justify-center">
                    <div className="relative h-40">
                      <Image
                        src={no_product}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <p className="mt-4 text-center font-semibold capitalize text-gray-700">
                      no orders found
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-20">
                      {all_orders?.map((order: any) => (
                        <div key={order._id}>
                          <h3 className="sr-only">
                            Order placed on{' '}
                            <time dateTime={order.createdAt}>
                              {order.createdAt}
                            </time>
                          </h3>

                          <div className="rounded-lg bg-black py-1 px-2 text-white sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                            <div className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                              <div className="text-wg flex justify-between pt-6 sm:block sm:pt-0">
                                <div className="font-semibold text-white">
                                  Order number
                                </div>
                                <Text
                                  noOfLines={1}
                                  className="text-gray-200 sm:mt-1"
                                >
                                  {order._id}
                                </Text>
                              </div>
                              <div className="flex flex-row justify-between sm:block">
                                <div className="font-semibold text-white">
                                  Date placed
                                </div>
                                <div className="text-gray-200 sm:mt-1">
                                  <time dateTime={order.createdAt}>
                                    <Text noOfLines={1}>
                                      {moment(order.createdAt).fromNow()}
                                    </Text>
                                  </time>
                                </div>
                              </div>

                              <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                <div className="font-semibold text-white">
                                  Total amount
                                </div>
                                <div className="text-gray-200 sm:mt-1">
                                  {order?.orderItems.reduce(
                                    (a: any, c: any) =>
                                      parseInt(a) +
                                      parseInt(c.quantity) * parseInt(c.price),
                                    0
                                  )}
                                </div>
                              </div>
                            </div>
                            <a
                              href={order.invoiceHref}
                              className="mt-6 flex w-full items-center justify-center rounded-full border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              View Invoice
                              <span className="sr-only">
                                for order {order.number}
                              </span>
                            </a>
                          </div>

                          <table className="mt-4 w-full text-gray-500 sm:mt-6">
                            <caption className="sr-only">Products</caption>
                            <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                                >
                                  Product
                                </th>
                                <th
                                  scope="col"
                                  className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="hidden py-3 pr-8 font-normal sm:table-cell"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="w-0 py-3 text-right font-normal"
                                >
                                  Info
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                              {order?.orderItems.map((product: any) => (
                                <tr key={product.id}>
                                  <td className="py-2 pr-8">
                                    <div className="flex items-center">
                                      <img
                                        src={product.pictures[0]}
                                        alt={product.description}
                                        className="mr-6 h-10 w-10 rounded object-cover object-center"
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
                                  <td className="hidden py-2 pr-8 sm:table-cell">
                                    {product.price}
                                  </td>
                                  <td className="hidden py-2 pr-8 sm:table-cell">
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
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default Orders
