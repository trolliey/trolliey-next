import {
  Avatar,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { Store } from '../../Context/Store'
import { data } from '../../utils/data'
import { getError } from '../../utils/error'
import { renderWeight } from '../../utils/renderWeight'
import Amount from '../Amount/Amount'
import { apiUrl } from '../../utils/apiUrl'
import PaymentModal from '../Modals/PaymentModal'

function CheckoutSidebar({ total_amount, total_weight }) {
  const { state } = useContext(Store)
  const { userInfo, cart } = state
  const [handle_order_type, setHandleOrderType] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useRouter()
  const { payment_method } = history.query
  const [address, setAddress] = useState('')
  const [full_name, setFullNamre] = useState('')
  const [phonr_number, setPhoneNumber] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [heading, setheading] = useState('')
  const [action_button, setActionButton] = useState('')
  const [body, setBody] = useState('')
  const toast = useToast()

  const next_page_Handler = () => {
    console.log('order', handle_order_type)
  }

  const order_payment_modal = () => {
    if (!city || !address || !phonr_number || !full_name) {
      toast({
        title: 'Enter all required info',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    if (
      payment_method === 'pay_on_collection' ||
      payment_method === 'pay_on_delivery'
    ) {
      setBody(
        <>
          <div className="flex w-full flex-col space-y-4">
            <p className="font-semibold">Place My Order</p>
            {handle_order_type === 'collect_my_order' ? (
              <p>
                You can collect your order at any of our collection points after
                3 days
              </p>
            ) : (
              <p>
                We will bring the order at your doorstep. On the address you
                have provided
              </p>
            )}
          </div>
        </>
      )
      setActionButton(
        <>
          <div
            onClick={
              loading
                ? () => console.log('Loading please wait ...')
                : order_without_payment_Handler
            }
            className="flex cursor-pointer rounded-lg bg-blue-primary p-2 font-semibold capitalize text-white hover:bg-blue-secondary"
          >
            {loading ? 'Loading ... ' : 'Place Order'}
          </div>
        </>
      )
      setheading('Proceed Place Your Order')
      onOpen()
    }
  }

  const order_without_payment_Handler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${apiUrl}/api/order/create`,
        {
          orderItems: cart.cartItems,
          address: address,
          itemsPrice: cart?.cartItems?.reduce(
            (a, c) =>
              parseFloat(a) + parseFloat(c.quantity) * parseFloat(c.price),
            0
          ),
          shippingPrice: 0,
          // @ts-ignore
          totalPrice: total_amount + renderWeight(total_weight),
          full_name: full_name,
          province: city,
          collect_my_order: handle_order_type,
          method: payment_method,
          isPaid: false,
          pay_on_delivery: handle_order_type,
          weight: total_weight,
          paying_number: 'No Payment Done',
          contact_phone_number: phonr_number,
          city: city,
          number_of_items_bought: cart?.cartItems?.reduce(
            (a, c) => parseInt(a) + parseInt(c.quantity),
            0
          ),
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      toast({
        title: 'Order Created.',
        description:
          'Your order has been created and will be delivered to your within 5 working days! Thank You',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      console.log(getError(data))
      history.push(`/success/order_success`)
      setLoading(false)
    } catch (error) {
      toast({
        title: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
      console.log(getError(error))
    }
  }

  return (
    <div className="mt-8 flex w-full flex-col rounded-lg bg-blue-primary p-4 md:mt-0">
      <div className="flex flex-row items-center justify-between pb-4 font-semibold text-white">
        <p>Payment Details</p>
        <Avatar size={'xs'} src={userInfo?.photoURL} name={userInfo?.name} />
      </div>
      <div className="flex w-full flex-col">
        <p className="pb-4 text-center text-white">
          How do you want to handle your order?
        </p>
        <div className="flex rounded bg-blue-secondary p-2 text-white md:p-4">
          <RadioGroup onChange={setHandleOrderType} value={handle_order_type}>
            <Stack direction="column">
              <Radio value="collect_my_order">
                Collect at our pickup point.
              </Radio>
              <Radio value="bring_to_doorstep">Bring to my doorstep</Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>
      <p className="py-4  text-center text-white">Select Payment Method</p>
      <div className="flex flex-col space-y-2 rounded bg-white p-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4  ">
          {data.payment_methods?.map((item, index) => (
            <div
              onClick={() =>
                history.push(`/shipping/?payment_method=${item.name}`)
              }
              key={index}
              className={`${
                payment_method === item.name
                  ? ' hover:bg-gray-secodary bg-gray-100 '
                  : 'bg-white hover:bg-gray-100 '
              } relative flex cursor-pointer content-center items-center justify-center rounded border-2 border-blue-light p-2 `}
            >
              {payment_method === item.name && (
                <div className="absolute top-0 right-0 flex text-blue-primary">
                  <CheckCircleIcon height={14} width={14} />
                </div>
              )}
              <div className="relative h-10 w-10">
                <Image src={item.icon} layout="fill" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4  ">
          {handle_order_type === 'bring_to_doorstep' && (
            <div
              onClick={() =>
                history.push(`/shipping/?payment_method=${'pay_on_delivery'}`)
              }
              className={`${
                payment_method === 'pay_on_delivery'
                  ? ' hover:bg-gray-secodary bg-gray-100 '
                  : 'bg-white hover:bg-gray-100 '
              } relative col-span-4 flex cursor-pointer content-center items-center justify-center rounded border-2 border-blue-light p-2 `}
            >
              {payment_method === 'pay_on_delivery' && (
                <div className="absolute top-0 right-0 flex text-blue-primary">
                  <CheckCircleIcon height={14} width={14} />
                </div>
              )}
              <p className="font-semibold text-blue-primary">Pay On Delivery</p>
            </div>
          )}
          {handle_order_type === 'collect_my_order' && (
            <div
              onClick={() =>
                history.push(`/shipping?payment_method=${'pay_on_collection'}`)
              }
              className={`${
                payment_method === 'pay_on_collection'
                  ? ' hover:bg-gray-secodary bg-gray-100 '
                  : 'bg-white hover:bg-gray-100 '
              } relative col-span-4 flex cursor-pointer content-center items-center justify-center rounded border-2 border-blue-light p-2 `}
            >
              {payment_method === 'pay_on_collection' && (
                <div className="absolute top-0 right-0 flex text-blue-primary">
                  <CheckCircleIcon height={14} width={14} />
                </div>
              )}
              <p className="font-semibold text-blue-primary">
                Pay On Collection
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="py-4  text-center text-white">Enter Shipment Info</p>
      <div className="grid w-full grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="col-span-2 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="col-span-1 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={full_name}
          onChange={(e) => setFullNamre(e.target.value)}
          className="col-span-1 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phonr_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="col-span-2 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
        />
      </div>

      <div className="my-8 space-y-2 border-t border-blue-light pt-8">
        <div className="flex flex-row items-center justify-between text-sm text-white">
          <p>Subtotal</p>
          {/* <p className=' font-semibold'></p> */}
          <span className="font-semibold">
            <Amount amount={total_amount} />
          </span>
        </div>
        <div className="flex flex-row items-center justify-between text-sm text-white">
          <p>Shipping</p>
          <span className="font-semibold">
            {handle_order_type === 'collect_my_order' ? (
              <Amount amount={0} />
            ) : (
              <Amount amount={renderWeight(total_weight)} />
            )}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between pb-8 text-sm text-white">
          <p>Total (Tax incl.)</p>
          <span className="font-semibold">
            {handle_order_type === 'collect_my_order' ? (
              <Amount amount={0.47 + total_amount} />
            ) : (
              <Amount
                amount={0.47 + total_amount + renderWeight(total_weight)}
              />
            )}
          </span>
        </div>
        <div
          onClick={order_payment_modal}
          className="flex cursor-pointer flex-row items-center justify-between rounded-lg bg-green-500 py-2 px-4 text-white hover:bg-green-600 "
        >
          <span className="font-semibold">
            {handle_order_type === 'collect_my_order' ? (
              <Amount amount={0.47 + total_amount} />
            ) : (
              <Amount
                amount={0.47 + total_amount + renderWeight(total_weight)}
              />
            )}
          </span>
          <div className="flex flex-row items-center space-x-2">
            <p className="font-semibold">Continue</p>
            <ArrowRightIcon height={20} width={20} />
          </div>
        </div>
      </div>
      <>
        <PaymentModal
          body={body}
          isOpen={isOpen}
          heading={heading}
          onOpen={onOpen}
          onClose={onClose}
          action_button={action_button}
        />
      </>
    </div>
  )
}

export default CheckoutSidebar
