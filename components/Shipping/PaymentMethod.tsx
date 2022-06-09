import React, { ReactElement, useState, useContext, useEffect } from 'react'
import BlueButton from '../Buttons/BlueButton'
import ShipmentLayout from '../../layouts/ShipmentLayout'
import Image from 'next/image'
import { Divider, useToast } from '@chakra-ui/react'
import { getError } from '../../utils/error'
import axios from 'axios'
import { Store } from '../../Context/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import ecocash from '../../public/img/eco_cash.svg'
import telecash from '../../public/img/telecash.svg'
import onemoney from '../../public/img/ONEMONEY.png'
import visa_mastercard from '../../public/img/visamastercard.svg'

interface Props {
  method?: any
  nextStep?: any
  values?: any
  step?: number
  handleChange: any
  prevStep?: any
  collect_my_order: boolean
  payment_method?: any
}

const payment_methods = [
  { id: 'ecocash', title: 'Ecocash', icon: ecocash, currency: 'ZWL' },
  { id: 'telecash', title: 'Telecash', icon: telecash, currency: 'ZWL' },
  { id: 'onemoney', title: 'One  Money', icon: onemoney, currency: 'ZWL' },
  // { id: 'paypal', title: 'PayPal', icon: paypal_logo, currency: 'USD' },
  {
    id: 'visa/mastercard',
    title: 'Visa/Mastercard',
    icon: visa_mastercard,
    currency: 'USD',
  },
]

function PaymentMethod({
  values,
  step,
  handleChange,
  prevStep,
  collect_my_order,
  payment_method,
}: Props): ReactElement {
  const { state, dispatch } = useContext(Store)
  const router = useRouter()
  const { userInfo, cart, currency } = state
  const [selected_method, setSelectedMethod] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()

  useEffect(() => {
    setSelectedMethod(payment_method)
  }, [payment_method])

  const placeOrderHandler = async () => {
    if (payment_method === 'pay_on_delivery') {
      setSelectedMethod(payment_method)
    }

    try {
      setLoading(true)
      const { data } = await axios.post(
        `/api/orders`,
        {
          orderItems: cart.cartItems,
          address: values.address,
          itemsPrice: cart?.cartItems.reduce(
            (a: any, c: any) =>
              parseInt(a) + parseInt(c.quantity) * parseInt(c.price),
            0
          ),
          shippingPrice: 0,
          totalPrice: cart?.cartItems.reduce(
            (a: any, c: any) =>
              parseInt(a) + parseInt(c.quantity) * parseInt(c.price),
            0
          ),
          full_name: values.full_name,
          province: values.province,
          collect_my_order: collect_my_order,
          method: selected_method,
          isPaid: false,
          pay_on_delivery: 'yes',
          paying_number: values.paying_number,
          contact_phone_number: values.contact_number,
          city: values.city,
          number_of_items_bought: cart?.cartItems.reduce(
            (a: any, c: any) => parseInt(a) + parseInt(c.quantity),
            0
          ),
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      dispatch({ type: 'CART_CLEAR' })
      Cookies.remove('cartItems')
      setLoading(false)
      toast({
        title: 'Order Created.',
        description:
          'Your order has been created and will be delivered to your within 5 working days! Thank You',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      console.log(data)
      router.push(`/success/order_success`)
    } catch (error) {
      setLoading(false)
      // console.log(getError(error))
      toast({
        title: 'Order Not Created.',
        description: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  console.log(payment_method)

  if (payment_method === 'pay_on_delivery') {
    return (
      <ShipmentLayout step={step} heading="Payment Info">
        <div>
          <label className="px-4 pt-4 text-base font-medium text-gray-900">
            We will deliver to you
          </label>
          <p className="px-4 text-sm leading-5 text-gray-500">
            The item will be delivered to your doorstep within 5 working days
          </p>

          <div className="mt-4 rounded bg-gray-100 p-4">
            <legend className="sr-only">Thank your for shopping with us</legend>
            <p className=" text-center font-semibold capitalize text-black">
              Enjoy your items
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full space-x-4 border-t border-gray-200 px-4 pt-4 pb-4">
          <BlueButton text="previous" onClick={() => prevStep(values)} />
          <BlueButton
            text="Place Order"
            loading={loading}
            onClick={placeOrderHandler}
          />
        </div>
      </ShipmentLayout>
    )
  }

  //@ts-ignore
  if (collect_my_order === 'collect_my_order') {
    return (
      <ShipmentLayout step={step} heading="Payment Info">
        <div>
          <label className="px-4 pt-4 text-base font-medium text-gray-900">
            Collection Points
          </label>
          <p className="px-4 text-sm leading-5 text-gray-500">
            You can collect your items at any of the following pickup points
          </p>

          <div className="mt-4 bg-gray-100 p-4">
            <legend className="sr-only">Our warehouses</legend>
            <p className="pb-4 text-center font-semibold capitalize text-black">
              A list of our ware houses
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full space-x-4 border-t border-gray-200 px-4 pt-4 pb-4">
          <BlueButton text="previous" onClick={() => prevStep(values)} />
          <BlueButton
            text="Place Order"
            loading={loading}
            onClick={placeOrderHandler}
          />
        </div>
      </ShipmentLayout>
    )
  }

  return (
    <ShipmentLayout step={step} heading="Payment Info">
      <div>
        <label className="px-2 pt-4 text-base font-medium text-gray-900 md:px-4">
          Payment Methods
        </label>
        <p className="px-4 text-sm leading-5 text-gray-500">
          Choose a method you want to pay with
        </p>

        <div className="mt-4 bg-gray-200 p-4">
          <legend className="sr-only">Payment Method</legend>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {payment_methods.map((method: any, index: number) => (
              <>
                {method.currency === currency && (
                  <div
                    key={index}
                    onClick={() => setSelectedMethod(method.id)}
                    className="col-span-1"
                  >
                    <PaymentCard
                      className="col-span-1"
                      method={method.id}
                      title={method.title}
                      selected_method={selected_method}
                      icon={method.icon}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
      <Divider className="mt-4 text-gray-200" />
      {selected_method === 'ecocash' && (
        <div className="col-span-full mt-4">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            {values.method} Ecocash Number
          </label>
          <div className="mt-4">
            <input
              type="text"
              value={values.paying_number}
              onChange={handleChange('paying_number')}
              id="paying_number"
              name="paying_number"
              placeholder="phonenumber making the payment"
              className="block w-full rounded-md border border-gray-200 p-2 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}
      {selected_method === 'telecash' && (
        <div className="col-span-full mt-4">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            {values.method} Telecash Number
          </label>
          <div className="mt-4">
            <input
              type="text"
              value={values.paying_number}
              onChange={handleChange('paying_number')}
              id="paying_number"
              name="paying_number"
              placeholder="phonenumber making the payment"
              className="block w-full rounded-md border border-gray-200 p-2 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}
      {selected_method === 'onemoney' && (
        <div className="col-span-full mt-4">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            {values.method} OneMoney Number
          </label>
          <div className="mt-4">
            <input
              type="text"
              value={values.paying_number}
              onChange={handleChange('paying_number')}
              id="paying_number"
              name="paying_number"
              placeholder="phonenumber making the payment"
              className="block w-full rounded-md border border-gray-200 p-2 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}
      {selected_method === 'visa/mastercard' && (
        <div className="col-span-full mt-4">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            {values.method} Card Number
          </label>
          <div className="mt-4">
            <input
              type="text"
              value={values.paying_number}
              onChange={handleChange('paying_number')}
              id="paying_number"
              name="paying_number"
              placeholder="Enter card number"
              className="block w-full rounded-md border border-gray-200 p-2 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <div className="mt-4 flex flex-row items-center gap-4">
              <input
                type="text"
                value={values.paying_number}
                onChange={handleChange('paying_number')}
                id="paying_number"
                name="paying_number"
                placeholder="Expiry Date"
                className="block w-full rounded-md border border-gray-200 p-2 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <input
                type="text"
                value={values.paying_number}
                onChange={handleChange('paying_number')}
                id="paying_number"
                name="paying_number"
                placeholder="CVV"
                className="block w-full rounded-md border border-gray-200 p-2 outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 flex w-full space-x-4 border-t border-gray-200 px-4 pt-4 pb-4">
        <BlueButton text="previous" onClick={() => prevStep(values)} />
        <BlueButton
          text="Place Order"
          loading={loading}
          onClick={placeOrderHandler}
        />
      </div>
    </ShipmentLayout>
  )
}

interface IProps {
  className?: string
  method: any
  title: string
  selected_method: string
  icon: any
}

const PaymentCard = ({ title, method, selected_method, icon }: IProps) => {
  return (
    <div
      className={`${
        method === selected_method
          ? ' border-2 border-blue-primary'
          : 'border border-gray-200'
      } col-span-1 flex cursor-pointer flex-row items-center justify-between rounded bg-white p-2 shadow `}
    >
      <p className={`text-lg font-semibold text-blue-dark`}>{title}</p>
      <div className="relative h-12 w-12">
        <Image layout="fill" objectFit="contain" src={icon} />
      </div>
    </div>
  )
}

export default PaymentMethod
