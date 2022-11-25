import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Fragment, ReactElement, useContext } from 'react'
import { Store } from '../../Context/Store'
import BlueButton from '../Buttons/BlueButton'
import RedButtons from '../Buttons/RedButtons'
import dynamic from 'next/dynamic'
import axios from 'axios'
import Amount from '../Amount/Amount'

interface Props {
    open?: any,
    setOpen?: any,
    cart?: any
}

function CartSidebar({ open, setOpen }: Props): ReactElement {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const history = useRouter()

    console.log('cart item ------- ', cart)

    const remove_from_cart = (item: any) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: {...item} })
    }

    const updateCartHandler = async (item: any, value: any) => {
        const { data } = await axios.get(`/api/products/${item?._id}`)
        if (data?.countInStock <= 0) {
            alert('Sorry. Product out of stock')
            return
        }
        dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: value } })
    }

    const handleCheckout = () =>{
        history.push('/shipping')
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="z-20 fixed inset-0 overflow-hidden " onClose={setOpen}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-y-0 mt-16 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-md">
                                <div className="h-full flex flex-col bg-gray-50 shadow-xl overflow-y-scroll">
                                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                            <div className="ml-3 h-6 flex items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500 outline-none"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <div className="-my-6 divide-y divide-gray-200 w-full">
                                                    {cart?.cartItems?.length < 1 ? (
                                                        <p className="text-lg text-center text-gray-700 my-16 flex capitalize flex-1">Your cart is empty</p>
                                                    ) : (
                                                        <>
                                                            {cart?.cartItems?.map((product: any) => (
                                                                <div key={product._id} className="py-6 flex">
                                                                    <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                                        <Image
                                                                            src={product.pictures[0]}
                                                                            alt={product.title}
                                                                            layout="fill"
                                                                            className="w-full h-full object-center object-cover"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex-1 flex flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <p >{product.title}</p>
                                                                                </h3>
                                                                            </div>
                                                                            <div className="flex flex-row items-center gap-8">
                                                                                <p className="ml-4">{product.price}</p>
                                                                                <select
                                                                                    defaultValue={product.quantity}
                                                                                    title='quantity'
                                                                                    onChange={e => updateCartHandler(product, e.target.value)}
                                                                                    // value={product.quantity}
                                                                                    className={'outline-none border--gray-200 rounded bg-gray-100'} >
                                                                                    {/*@ts-ignore*/}
                                                                                    {[...Array(product?.countInStock).keys()].map((x) => (
                                                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-1 flex items-end justify-between text-sm">
                                                                            {/* <p className="text-gray-500">Qty {product.quantity}</p> */}

                                                                            <div className="flex">
                                                                                <button onClick={() => remove_from_cart(product)} type="button" className="font-medium text-blue-primary hover:text-indigo-500">
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 bg-white shadow py-2 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal for <span>{cart?.cartItems?.reduce((a: any, c: any) => parseInt(a) + parseInt(c.quantity), 0)} items</span></p>
                                            <p>{
                                                cart.cartItems ? (
                                                    <Amount amount={cart?.cartItems?.reduce((a: any, c: any) =>  parseFloat(a) + parseFloat(c.quantity) * parseFloat(c.price), 0)} />
                                                ):(
                                                    <Amount amount={0} />
                                                )
                                                }</p>
                                                {/* <p>{cart?.cartItems?.reduce((a: any, c: any) =>  parseFloat(a) + parseFloat(c.quantity) * parseFloat(c.price), 0)}</p> */}
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes included on grand total.</p>
                                        <div className="mt-6">
                                            <BlueButton text="Checkout" className="flex justify-center w-full" onClick={handleCheckout} />
                                        </div>
                                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                            <p>
                                                or{' '}
                                                <RedButtons text="Continue shopping" className="flex-1" onClick={() => setOpen(false)} />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog >
        </Transition.Root >
    )
}

export default dynamic(() => Promise.resolve(CartSidebar), {
    ssr: false
})