import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { Fragment, ReactElement } from 'react'
import BlueButton from '../Buttons/BlueButton'
import RedButtons from '../Buttons/RedButtons'

interface Props{
    open ?: any,
    setOpen?: any,
    cart ?: any
}

function CartSidebar({ open, setOpen, cart }:Props):ReactElement {
    const history = useRouter()

    const remove_from_cart = () =>{
        console.log('removed')
    }
  return (
    <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden " onClose={setOpen}>
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
                                                <ul className="-my-6 divide-y divide-gray-200">
                                                    {cart?.length < 1 ? (
                                                        <li className="text-lg text-center text-gray-700 my-16 flex capitalize flex-1">Your cart is empty</li>
                                                    ) : (
                                                        <>
                                                        {cart?.map((product:any) => (
                                                            <li key={product.id} className="py-6 flex">
                                                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                                    <img
                                                                        src={product.picture}
                                                                        alt={'product.imageAlt'}
                                                                        className="w-full h-full object-center object-cover"
                                                                    />
                                                                </div>
    
                                                                <div className="ml-4 flex-1 flex flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <p >{product.name}</p>
                                                                            </h3>
                                                                        </div>
                                                                            <p className="ml-4">{product.price}</p>
                                                                        {/* <p className="line-clamp-1 mt-1 text-sm text-gray-500">{product.description}</p> */}
                                                                    </div>
                                                                    <div className="flex-1 flex items-end justify-between text-sm">
                                                                        {/* <p className="text-gray-500">Qty {product.quantity}</p> */}
    
                                                                        <div className="flex">
                                                                            <button onClick={remove_from_cart} type="button" className="font-medium text-blue-primary hover:text-indigo-500">
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 bg-white shadow py-2 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>$2323</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes included on grand total.</p>
                                        <div className="mt-6">
                                            <BlueButton text="Checkout" className="flex justify-center w-full" onClick={() => history.push('/payment')} />
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
            </Dialog>
        </Transition.Root>
  )
}

export default CartSidebar