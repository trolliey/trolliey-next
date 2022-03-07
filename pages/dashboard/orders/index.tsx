import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../../Context/Store'
import DashboardLayout from '../../../layouts/DashboardLayout'

function Orders() {
    const { state } = useContext(Store)
    const [all_orders, setAllOrders] = useState<any>()
    const { userInfo } = state
    const history = useRouter()

    useEffect(()=>{
        const get_orders = async () =>{
            const data = await axios.get('/api/orders',{headers:{
                authorization: userInfo.token
            }})
            setAllOrders(data?.data)
        }
        get_orders()
    },[])
    console.log(all_orders)
    return (
        <DashboardLayout>
            <div className="bg-white md:my-16 my-8">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
                    <div className="max-w-xl">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Check the status of recent orders, manage returns, and download invoices.
                        </p>
                    </div>

                    <div className="mt-16">
                        <h2 className="sr-only">Recent orders</h2>

                        <div className="space-y-20">
                            {all_orders?.map((order:any) => (
                                <div key={order._id}>
                                    <h3 className="sr-only">
                                        Order placed on <time dateTime={order.createdAt}>{order.createdAt}</time>
                                    </h3>

                                    <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                                        <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                            <div className="flex justify-between sm:block">
                                                <dt className="font-medium text-gray-900">Date placed</dt>
                                                <dd className="sm:mt-1">
                                                    <time dateTime={order.createdAt}>{order.createdAt}</time>
                                                </dd>
                                            </div>
                                            <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                                <dt className="font-medium text-gray-900">Order number</dt>
                                                <dd className="sm:mt-1">{order._id}</dd>
                                            </div>
                                            <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                                <dt>Total amount</dt>
                                                <dd className="sm:mt-1">{order?.orderItems.reduce((a: any, c: any) =>  parseInt(a) + parseInt(c.quantity) * parseInt(c.price), 0)}</dd>
                                            </div>
                                        </dl>
                                        <a
                                            href={order.invoiceHref}
                                            className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                                        >
                                            View Invoice
                                            <span className="sr-only">for order {order.number}</span>
                                        </a>
                                    </div>

                                    <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                        <caption className="sr-only">Products</caption>
                                        <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                                            <tr>
                                                <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
                                                    Product
                                                </th>
                                                <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">
                                                    Price
                                                </th>
                                                <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                                                    Status
                                                </th>
                                                <th scope="col" className="w-0 py-3 font-normal text-right">
                                                    Info
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                                            {order?.orderItems.map((product:any) => (
                                                <tr key={product.id}>
                                                    <td className="py-6 pr-8">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={product.pictures[0]}
                                                                alt={product.description}
                                                                className="w-16 h-16 object-center object-cover rounded mr-6"
                                                            />
                                                            <div>
                                                                <div className="font-medium text-gray-900">{product.title}</div>
                                                                <div className="mt-1 sm:hidden">{product.price}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>
                                                    <td className="hidden py-6 pr-8 sm:table-cell">{order.status}</td>
                                                    <td className="py-6 font-medium text-right whitespace-nowrap">
                                                        <div onClick={() => history.push(`/product/description/${product._id}`)} className="text-blue-primary cursor-pointer">
                                                            View<span className="hidden lg:inline"> Product</span>
                                                            <span className="sr-only">, {product.name}</span>
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
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Orders
