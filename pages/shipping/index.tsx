import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Amount from '../../components/Amount/Amount'
import CheckoutSidebar from '../../components/Shipping/CheckoutSidebar'
import { Store } from '../../Context/Store'
import GeneralLayout from '../../layouts/GeneralLayout'
import { apiUrl } from '../../utils/apiUrl'

type Props = {}

const Shipping = (props: Props) => {
  const { state, dispatch } = useContext(Store)
  const { cart, userInfo } = state
  const history = useRouter()
  const [number_in_cart, setNumberInCart] = useState(0)
  const [total_amount, setTotalAmount] = useState(0)
  const [total_weight, setTotalWeight] = useState(0)

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=/shipping')
    }
  }, [])

  useEffect(() => {
    setTotalWeight(
      cart?.cartItems?.reduce(
        (a: any, c: any) =>
          parseFloat(a) + parseFloat(c.quantity) * parseFloat(c.weight),
        0
      )
    )
  }, [cart.cartItems])

  useEffect(() => {
    setNumberInCart(
      cart?.cartItems?.reduce(
        (a: any, c: any) => parseInt(a) + parseInt(c.quantity),
        0
      )
    )
  }, [cart?.cartItems])

  console.log(cart?.cartItems)

  useEffect(() => {
    setTotalAmount(
      cart?.cartItems?.reduce(
        (a: any, c: any) =>
          parseFloat(a) +
          parseFloat(c.quantity) *
            (parseFloat(c.price) - parseFloat(c.discount_price)),
        0 // Start with 0 instead of '0' as the initial value
      )
    )
  }, [cart?.cartItems])

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

  return (
    <GeneralLayout
      title="Checkout Page"
      description="Choose how you want to pay for your items"
      no_text
    >
      <div className="rounded-lg bg-white p-2 shadow md:m-4 md:p-4">
        <div className="flex flex-col space-x-0 md:flex-row md:space-x-4">
          <div className="flex w-full flex-col md:w-2/3">
            <div
              onClick={() => history.push('/explore')}
              className="flex cursor-pointer flex-row items-center space-x-4 border-b border-gray-200 pb-2 text-gray-700 md:pb-4"
            >
              <ArrowLeftIcon height={16} width={16} />
              <p className="font-semibold">Continue shopping</p>
            </div>
            <div className="flex flex-row items-center justify-between py-4">
              <div className="flex flex-col ">
                <p className="font-bold text-gray-700">Shopping Cart</p>
                <p className="text-sm text-gray-400">
                  You have {number_in_cart}{' '}
                  {number_in_cart > 1 ? 'items' : 'item'} in your cart
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-800 ">
                <Amount
                  // currency_type={cart?.cartItems[0]?.currency_type}
                  amount={total_amount}
                />
              </p>
            </div>

            <div className="flex w-full flex-col space-y-8">
              {cart?.cartItems?.length < 1 && (
                <p className="my-16 flex w-full flex-1 text-center text-lg font-semibold capitalize text-gray-700">
                  Your cart is empty
                </p>
              )}
              {cart?.cartItems?.map((item: any, index: number) => (
                <OrderItem
                  image={item.pictures[0]}
                  name={item.title}
                  description={item.description}
                  quantity={item.quantity}
                  price={item.price - item.discount_price}
                  onRemove={() => remove_from_cart(item)}
                  descrease_amount_Handler={() =>
                    updateCartHandler(item, item.quantity - 1)
                  }
                  increase_amount_Handler={() =>
                    updateCartHandler(item, parseInt(item.quantity) + 1)
                  }
                  key={index}
                  countInStock={item.countInStock}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col md:w-1/3  ">
            <CheckoutSidebar
              total_amount={total_amount}
              total_weight={total_weight}
            />
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

interface ItemProps {
  onRemove: any
  name: string
  description: string
  price: number
  image: string
  quantity: number
  increase_amount_Handler: any
  descrease_amount_Handler: any
  countInStock: number
}

const OrderItem = ({
  onRemove,
  image,
  name,
  description,
  price,
  quantity,
  increase_amount_Handler,
  descrease_amount_Handler,
  countInStock,
}: ItemProps) => {
  return (
    <div className="flex flex-row items-center rounded-lg  p-2 shadow">
      <div className="relative flex h-14 w-14 cursor-pointer overflow-hidden rounded md:h-20 md:w-20">
        <Image src={image} layout="fill" className="rounded-lg" />
      </div>
      <div className="hidden flex-col px-4 md:flex">
        <p className="font-semibold text-gray-700">{name}</p>
        <p className="texxt-sm text-gray-400">
          click on item picture to view it's details
        </p>
      </div>
      <div className="ml-auto flex flex-row items-center">
        <span
          onClick={
            quantity <= 1
              ? () => console.log('cant reduce from 1')
              : descrease_amount_Handler
          }
          className={`${
            quantity <= 1
              ? 'border-gray-200 text-gray-200 '
              : ' cursor-pointer border-gray-400 text-gray-700 hover:bg-gray-100 '
          }  rounded border  p-2 `}
        >
          <MinusIcon height={8} width={8} />
        </span>
        <p className="px-2 font-bold">{quantity}</p>
        <span
          onClick={
            quantity >= countInStock
              ? () => console.log('You have reached maximum')
              : increase_amount_Handler
          }
          className={`${
            quantity >= countInStock
              ? 'border-gray-200 text-gray-200 '
              : ' cursor-pointer border-gray-400 text-gray-700 hover:bg-gray-100 '
          }  rounded border  p-2 `}
        >
          <PlusIcon height={8} width={8} />
        </span>
      </div>
      <div className="flex px-4">
        <Amount amount={price} />
      </div>
      <span
        onClick={onRemove}
        className="cursor-pointer text-gray-500 hover:text-red-500"
      >
        <TrashIcon height={20} width={20} />
      </span>
    </div>
  )
}

export default Shipping
