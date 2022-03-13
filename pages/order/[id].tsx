import { Avatar, Divider, Spinner } from '@chakra-ui/react'
import { LockClosedIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useReducer } from 'react'
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

    const [{ loading, error, order }, dispatch] = useReducer(reducer, { loading: true, order: {}, error: '' })

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
                        authorization: userInfo.token
                    }
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
        <GeneralLayout title='Order Details' description={`Details for order with id ${orderId}`}>
            <h1 className='text-center font-semibold py-4 text-lg'>Order ${orderId}</h1>
            {loading ? (<Spinner />) : error ? (
                <p>{error}</p>
            ) : (
                <div className="w-full items-center min-h-screen">
                    <main className="grid lg:grid-cols-4 md:grid-cols-3 grid-col-1  gap-8  max-w-7xl">
                        {/* Checkout form */}
                        <div className="flex flex-col lg:col-span-3 md:col-span-2 col-span-1  bg-white p-8 rounded shadow">
                            <div className="flex flex-row items-start justify-between w-full pt-4 px-4">
                                <div className="flex flex-col">
                                    <p className="text-gray-400 font-semibold text-sm uppercase">Sucessful Order</p>
                                    <p className='text-gray-700 font-semibold'>{'Order'}</p>
                                </div>

                            </div>
                            <Divider className='text-gray-300' my={5} />
                            <div className="flex flex-col">
                                <p className='font-semibold text-lg text-gray-700 mb-2'>Payment Method</p>
                                <div className="flex flex-row items-center gap-4 ml-2">
                                    <p>{order?.data?.order.method}</p>
                                    {
                                        order?.data?.order.isPaid ? (

                                            <p className={'text-xs text-gray-700 font-semibold bg-green-400 p-1 rounded'}>paid</p>
                                        ) : (
                                            <p className={'text-xs text-gray-700 font-semibold bg-red-200 p-1 rounded'}>not paid</p>
                                        )
                                    }
                                </div>
                            </div>
                            <Divider className='text-gray-300' my={5} />
                            <div className="flex flex-col">
                                <p className='font-semibold text-lg text-gray-700 mb-2'>Order Status</p>
                                <div className="flex flex-row items-center gap-4 ml-2">
                                    <p>{order?.data?.order.method}</p>
                                    {
                                        order?.data?.order.status === 'pending' ? (

                                            <p className={'text-xs text-gray-700 font-semibold bg-blue-200 p-1 animate-pulse rounded'}>pending</p>
                                        ) : order?.data?.order.status === 'delivered' ? (
                                            <p className={'text-xs text-gray-700 font-semibold bg-green-200 p-1 rounded'}>{order?.data?.order.status}</p>
                                        ) : (
                                            <p className={'text-xs text-gray-700 font-semibold bg-red-200 p-1 rounded'}>{'cancelled'}</p>
                                        )
                                    }
                                </div>
                            </div>
                            <Divider className='text-gray-300' my={5} />
                            <div className="flex flex-col">
                                <p className='font-semibold text-lg text-gray-700 mb-2'>Shipping Info</p>
                                <div className="flex flex-col ml-2">
                                    <p>{order?.data?.order.address}</p>
                                    <p>{order?.data?.order.city}</p>
                                    <p>{order?.data?.order.contact_phone_number}</p>
                                </div>
                            </div>
                            <Divider className='text-gray-300' my={5} />
                        </div>

                       

                        <div className=" col-span-1 flex flex-col">
                            <div className="bg-white rounded shadow p-4 w-full">
                                <h3 className='text-gray-800 font-semibold'>Order Summary</h3>
                                <div className="flex flex-row items-center text-gray-400 text-sm w-full justify-between font-semibold mt-4">
                                    <p><span>{order?.data?.order?.number_of_items_bought} items</span></p>
                                    <p>$ {order?.data?.order?.itemsPrice}</p>
                                </div>
                                <Divider className='my-4' color={'gray.400'} />
                                {order?.data?.order?.orderItems.map((item: any, index: any) => (
                                    <div key={index} className="flex flex-1 flex-row items-center w-full">
                                        <Avatar src={item.pictures[0]} />
                                        <div className="flex flex-col ml-2">
                                            <p className='text-gray-900 font-semibold'>{item.title}</p>
                                            <p className='text-sm text-gray-400'>${item.price}</p>
                                        </div>
                                        <div className="flex-1"></div>
                                    </div>
                                ))}
                                <Divider className='my-4' color={'gray.300'} />
                                <div className="flex flex-row items-center w-full justify-between font-semibold mt-4">
                                    <p className='text-gray-800 font-bold text-sm'>TO PAY{" "}</p>
                                    <div className="flex-1"></div>
                                    <p className='text-blue-primary font-bold'> ${order?.data?.order.itemsPrice}</p>
                                </div>
                                <Divider className='mt-4 mb-2' color={'gray.300'} />
                                <div className="flex justify-center flex-row items-center">
                                    <LockClosedIcon className='text-gray-500' height={12} width={12} />
                                    <p className='text-sm text-gray-500 font-semibold'>Secured by Trolliey</p>
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
