import { Spinner } from '@chakra-ui/spinner'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../../Context/Store'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { getError } from '../../../utils/error'
import no_data from '../../../public/img/not_data.svg'
import Image from 'next/image'

function Orders() {
  const { state } = useContext(Store)
  const { userInfo } = state
  const [store_data, setStore_Data] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const history = useRouter()

  useEffect(() => {
    setLoading(true)
    const getStoreDAta = async () => {
      try {
        const { data } = await axios.get(`/api/store/dashboard`, {
          headers: {
            authorization: userInfo?.token,
          },
        })
        setStore_Data(data?.store?.orders)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(getError(error))
      }
    }
    getStoreDAta()
  }, [])

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

          {loading ? (
            <div className="grid h-96 content-center items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {store_data?.length < 1 ? (
               <div className="grid h-96 items-center content-center justify-center">
                   <Image src={no_data} height={150} objectFit="contain" />
                    <p className="text-center text-gray-700 font-semibold capitalize mt-4">No Pending Orders at the momet</p>
               </div>
              ) : (
                <>
                  <div className="mt-16">
                    <h2 className="sr-only">Recent orders</h2>
                    <div className="space-y-20">
                      {store_data?.map((order: any) => (
                        <div key={order._id}>
                          <h3 className="sr-only">
                            Order placed on{' '}
                            <time dateTime={order.createdAt}>
                              {order.createdAt}
                            </time>
                          </h3>

                          <div className="rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                            <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                              <div className="flex justify-between sm:block">
                                <dt className="font-medium text-gray-900">
                                  Date placed
                                </dt>
                                <dd className="sm:mt-1">
                                  <time dateTime={order.createdAt}>
                                    {order.createdAt}
                                  </time>
                                </dd>
                              </div>
                              <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                <dt className="font-medium text-gray-900">
                                  Order number
                                </dt>
                                <dd className="sm:mt-1">{order._id}</dd>
                              </div>
                              <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                <dt>Total amount</dt>
                                <dd className="sm:mt-1">
                                  {order?.items.reduce(
                                    (a: any, c: any) =>
                                      parseInt(a) +
                                      parseInt(c.quantity) * parseInt(c.price),
                                    0
                                  )}
                                </dd>
                              </div>
                            </dl>
                            <a
                              href={order.invoiceHref}
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
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
                              {order?.items.map((product: any) => (
                                <tr key={product.id}>
                                  <td className="py-6 pr-8">
                                    <div className="flex items-center">
                                      <img
                                        src={product.pictures[0]}
                                        alt={product.description}
                                        className="mr-6 h-16 w-16 rounded object-cover object-center"
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
                                          `/product/description/${product._id}`
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
