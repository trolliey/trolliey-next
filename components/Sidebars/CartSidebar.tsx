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
  open?: any
  setOpen?: any
  cart?: any
}

function CartSidebar({ open, setOpen }: Props): ReactElement {
  const { state, dispatch } = useContext(Store)

  const { cart, userInfo } = state
  const isLogged = userInfo?.token
  const history = useRouter()

  const remove_from_cart = (item: any) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { ...item } })
  }

  const updateCartHandler = async (item: any, value: any) => {
    const { data } = await axios.get(`/api/products/${item?._id}`)
    if (data?.countInStock <= 0) {
      alert('Sorry. Product out of stock')
      return
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: value } })
  }
  console.log(userInfo, '>>>>>>>>>>>>>>>>>')

  const handleCheckout = async () => {
    if (!isLogged) {
      history.push('/login')
      return
    }

    history.push('/shipping')
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-hidden "
        onClose={setOpen}
      >
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

          <div className="fixed inset-y-0 right-0 mt-16 flex max-w-full pl-10">
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
                <div className="flex h-full flex-col overflow-y-scroll bg-gray-50 shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 flex h-6 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 outline-none hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <div className="-my-6 w-full divide-y divide-gray-200">
                          {cart?.cartItems?.length < 1 ? (
                            <p className="my-16 flex flex-1 text-center text-lg capitalize text-gray-700">
                              Your cart is empty
                            </p>
                          ) : (
                            <>
                              {cart?.cartItems?.map((product: any) => (
                                <div key={product._id} className="flex py-6">
                                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={product.pictures[0]}
                                      alt={product.title}
                                      layout="fill"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <p>{product.title}</p>
                                        </h3>
                                      </div>
                                      <div className="flex flex-row items-center gap-8">
                                        <p className="ml-4">{product.price}</p>
                                        <select
                                          defaultValue={product.quantity}
                                          title="quantity"
                                          onChange={(e) =>
                                            updateCartHandler(
                                              product,
                                              e.target.value
                                            )
                                          }
                                          // value={product.quantity}
                                          className={
                                            'border--gray-200 rounded bg-gray-100 outline-none'
                                          }
                                        >
                                          {/*@ts-ignore*/}
                                          {[
                                            // @ts-ignore
                                            ...Array(
                                              product?.countInStock
                                            ).keys(),
                                          ].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                              {x + 1}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      {/* <p className="text-gray-500">Qty {product.quantity}</p> */}

                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            remove_from_cart(product)
                                          }
                                          type="button"
                                          className="font-medium text-blue-primary hover:text-indigo-500"
                                        >
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

                  <div className="border-t border-gray-200 bg-white py-2 px-4 shadow sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>
                        Subtotal for{' '}
                        <span>
                          {cart?.cartItems?.reduce(
                            (a: any, c: any) =>
                              parseInt(a) + parseInt(c.quantity),
                            0
                          )}{' '}
                          items
                        </span>
                      </p>
                      <p>
                        {cart.cartItems ? (
                          <Amount
                            amount={cart?.cartItems?.reduce(
                              (a: any, c: any) =>
                                parseFloat(a) +
                                parseFloat(c.quantity) * parseFloat(c.price),
                              0
                            )}
                          />
                        ) : (
                          <Amount amount={0} />
                        )}
                      </p>
                      {/* <p>{cart?.cartItems?.reduce((a: any, c: any) =>  parseFloat(a) + parseFloat(c.quantity) * parseFloat(c.price), 0)}</p> */}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes included on grand total.
                    </p>
                    <div className="mt-6">
                      <BlueButton
                        text="Checkout"
                        className="flex w-full justify-center"
                        onClick={handleCheckout}
                      />
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <RedButtons
                          text="Continue shopping"
                          className="flex-1"
                          onClick={() => setOpen(false)}
                        />
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

export default dynamic(() => Promise.resolve(CartSidebar), {
  ssr: false,
})
