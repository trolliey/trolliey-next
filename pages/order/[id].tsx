import { Avatar, Divider, Spinner } from '@chakra-ui/react'
import { LockClosedIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useReducer } from 'react'
import Amount from '../../components/Amount/Amount'
import { Store } from '../../Context/Store'
import GeneralLayout from '../../layouts/GeneralLayout'
import { getError } from '../../utils/error'

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

interface Props {
  params: any | null
}

function Order({ params }: Props) {
  const { state } = useContext(Store)
  const orderId = params.id
  const { userInfo, cart } = state
  const router = useRouter()

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  })

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        //@ts-ignore
        const data = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: userInfo.token,
          },
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(error) })
      }
    }
    if (!order?._id || (order && order._id !== orderId)) {
      fetchOrder()
    }
  }, [])

  return (
    <GeneralLayout
      title="Order Details"
      description={`Details for order with id ${orderId}`}
    >
      <h1 className="py-4 text-center text-lg font-semibold">
        Order {orderId}
      </h1>
      {loading ? (
        <div className="grid min-h-screen w-full content-center items-center justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="min-h-screen w-full items-center">
          <main className="grid-col-1 grid max-w-7xl gap-8  md:grid-cols-3  lg:grid-cols-4">
            {/* Checkout form */}
            <div className="col-span-1 flex flex-col rounded bg-white  p-8 shadow md:col-span-2 lg:col-span-3">
              <div className="flex w-full flex-row items-start justify-between px-4 pt-4">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold uppercase text-gray-400">
                    Sucessful Order
                  </p>
                  <p className="font-semibold text-gray-700">{'Order'}</p>
                </div>
              </div>
              <Divider className="text-gray-300" my={5} />
              <div className="flex flex-col">
                <p className="mb-2 text-lg font-semibold text-gray-700">
                  Payment Method
                </p>
                <div className="ml-2 flex flex-row items-center gap-4">
                  <p>
                    {order?.data?.order.method === 'pay_on_delivery'
                      ? 'To Pay Once Delivered'
                      : order?.data?.order.method}
                  </p>
                  {order?.data?.order.isPaid ? (
                    <p
                      className={
                        'rounded bg-green-400 p-1 text-xs font-semibold text-gray-700'
                      }
                    >
                      paid
                    </p>
                  ) : (
                    <p
                      className={
                        'rounded bg-red-200 p-1 text-xs font-semibold text-gray-700'
                      }
                    >
                      not paid
                    </p>
                  )}
                </div>
              </div>
              <Divider className="text-gray-300" my={5} />
              <div className="flex flex-col">
                <p className="mb-2 text-lg font-semibold text-gray-700">
                  Order Status
                </p>
                <div className="ml-2 flex flex-row items-center gap-4">
                  <p> {order?.data?.order.method === 'pay_on_delivery'
                      ? 'To Pay Once Delivered'
                      : order?.data?.order.method}</p>
                  {order?.data?.order.status === 'pending' ? (
                    <p
                      className={
                        'animate-pulse rounded bg-blue-200 p-1 text-xs font-semibold text-gray-700'
                      }
                    >
                      pending
                    </p>
                  ) : order?.data?.order.status === 'delivered' ? (
                    <p
                      className={
                        'rounded bg-green-200 p-1 text-xs font-semibold text-gray-700'
                      }
                    >
                      {order?.data?.order.status}
                    </p>
                  ) : (
                    <p
                      className={
                        'rounded bg-red-200 p-1 text-xs font-semibold text-gray-700'
                      }
                    >
                      {'cancelled'}
                    </p>
                  )}
                </div>
              </div>
              <Divider className="text-gray-300" my={5} />
              <div className="flex flex-col">
                <p className="mb-2 text-lg font-semibold text-gray-700">
                  Shipping Info
                </p>
                <div className="ml-2 flex flex-col">
                  <p>{order?.data?.order.address}</p>
                  <p>{order?.data?.order.city}</p>
                  <p>{order?.data?.order.contact_phone_number}</p>
                </div>
              </div>
              <Divider className="text-gray-300" my={5} />
            </div>

            <div className=" col-span-1 flex flex-col">
              <div className="w-full rounded bg-white p-4 shadow">
                <h3 className="font-semibold text-gray-800">Order Summary</h3>
                <div className="mt-4 flex w-full flex-row items-center justify-between text-sm font-semibold text-gray-400">
                  <p>
                    <span>
                      {order?.data?.order?.number_of_items_bought} items
                    </span>
                  </p>
                  <p>$ {parseFloat(order?.data?.order.itemsPrice)}</p>
                </div>
                <Divider className="my-4" color={'gray.400'} />
                {order?.data?.order?.orderItems.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex w-full flex-1 flex-row items-center"
                  >
                    <Avatar src={item.pictures[0]} />
                    <div className="ml-2 flex flex-col">
                      <p className="font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <Amount
                        currency_type={item.currency_type}
                        amount={item.price}
                      />
                      {/* <p className='text-sm text-gray-400'>$ {item.price}</p> */}
                    </div>
                    <div className="flex-1"></div>
                  </div>
                ))}
                <Divider className="my-4" color={'gray.300'} />
                <div className="mt-4 flex w-full flex-row items-center justify-between font-semibold">
                  <p className="text-sm font-bold text-gray-800">TO PAY </p>
                  <div className="flex-1"></div>
                  <p className="font-bold text-blue-primary">
                    {' '}
                    $ {parseFloat(order?.data?.order.itemsPrice)}
                  </p>
                </div>
                <Divider className="mt-4 mb-2" color={'gray.300'} />
                <div className="flex flex-row items-center justify-center">
                  <LockClosedIcon
                    className="text-gray-500"
                    height={12}
                    width={12}
                  />
                  <p className="text-sm font-semibold text-gray-500">
                    Secured by Trolliey
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </GeneralLayout>
  )
}

export async function getServerSideProps({ params }: Props) {
  return { props: { params } }
}

export default Order
