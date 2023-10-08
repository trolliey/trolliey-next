import {
  Avatar,
  Input,
  Radio,
  RadioGroup,
  Spinner,
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
import UsdPayment from '../Payment/UsdPayment'
import BlueButton from '../Buttons/BlueButton'
import Cookies from 'js-cookie'

function CheckoutSidebar({ total_amount, total_weight }) {
  const { state, dispatch } = useContext(Store)
  const { userInfo, cart, currency } = state
  const [handle_order_type, setHandleOrderType] = useState('collect_my_order')
  const [coupon_code, setCouponCode] = useState('')
  const [handle_order_payment_method, set_handle_order_payment_method] =
    useState('')
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
  const selectedCurrency = Cookies.get('trolliey_currency') || 'USD'

  const [paymentDetails, setPaymentDetails] = useState({
    currency: 'USD',
    payment_details: {
      phone: '',
      method: 'VISA',
      card_number: '',
      cvv: '',
      card_holder: '',
      card_expiry: '',
    },
  })

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const handlePaymentMethodClick = (item) => {
    setSelectedPaymentMethod(item.name)
  }

  const handleInputChange = (e, field) => {
    const newPaymentDetails = { ...paymentDetails }
    newPaymentDetails.payment_details[field] = e.target.value
    setPaymentDetails(newPaymentDetails)
  }

  const formattedCartItems = cart.cartItems.map((item) => {
    return {
      product_id: item.id,
      quantity: item.quantity,
      attributes: {
        color: 'black',
        size: 'XL',
      },
    }
  })

  const formattedObject = {
    products: formattedCartItems,
  }

  const handlePayment = async (id) => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${apiUrl}/api/v2/orders/${id}/payments`,
        paymentDetails,
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      console.log(paymentDetails, 'paymentDetails')
      console.log(data, 'hhhhhh')
      dispatch({ type: 'SET_POLL_URL', payload: data.respose })
      toast({
        title:
          selectedCurrency === 'USD'
            ? 'Order Created. Follow the link to complete purchase.'
            : 'Order created. Check your phone to complete the payment',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      setLoading(false)
      console.log(getError(error))

      if (getError(error).includes('Validation')) {
        toast({
          title: getError(error),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: getError(error),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  const handleEcoCashPayment = async (id) => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${apiUrl}/api/v2/orders/${id}/payments`,
        {
          currency: 'USD',
          payment_details: {
            method: 'ECOCASH',
            phone: paymentDetails.payment_details.phone,
          },
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      console.log(data, 'hhhhhh')
      dispatch({ type: 'SET_POLL_URL', payload: data.respose })
      toast({
        title: 'Order Created. Check your phone to complete the payment',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      setLoading(false)
      console.log(getError(error))

      if (getError(error).includes('Validation')) {
        toast({
          title: getError(error),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: getError(error),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  console.log(formattedObject, 'cartItems')

  const handle_payment = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${apiUrl}/api/v2/orders`,
        {
          products: formattedCartItems,
          address: address,
          // itemsPrice: total_amount,
          // shippingPrice: 0,
          // @ts-ignore

          name: full_name,
          province: city,
          // collect_my_order: handle_order_type,

          phone: phonr_number,
          city: city,
          country: 'Zimbabwe',
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      // window.location.assign(data.link)
      console.log(data.data.order._id, 'hhhhhh')

      if (selectedPaymentMethod === 'visa') {
        handlePayment(data.data.order._id)
      } else if (selectedPaymentMethod === 'ecocash') {
        handleEcoCashPayment(data.data.order._id)
      } else if (selectedPaymentMethod === 'paypal') {
        window.location.assign(data.approval_url)
      }
      dispatch({ type: 'SET_POLL_URL', payload: data.respose })
      toast({
        title:
          selectedCurrency === 'USD'
            ? 'Order Created. Follow the link to complete purchase.'
            : 'Order created. Check your phone to complete the payment',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      setLoading(false)
      console.log(getError(error))
      // if the response from getError(error) contains the word Validation, show a toast with message there are some missing values
      if (getError(error).includes('Validation')) {
        toast({
          title: getError(error),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: getError(error),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      }

      return
    }
  }

  return (
    <div className="mt-8 flex w-full flex-col rounded-lg bg-blue-primary p-4 md:mt-0">
      <div className="flex flex-row items-center justify-between pb-4 font-semibold text-white">
        <p>Payment Details</p>
        <Avatar size={'xs'} src={userInfo?.photoURL} name={userInfo?.name} />
      </div>
      <p className="py-4   text-white">Enter Shipment Info</p>
      <div className="mb-5 grid w-full grid-cols-2 gap-2">
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
      <div className="flex w-full flex-col">
        <p className="pb-4 text-white">How do you want to handle your order?</p>
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
      <div className="flex w-full flex-col">
        <p className="mt-5 pb-4 text-white">
          How do you want to pay for your order?
        </p>
        <div className="flex rounded bg-blue-secondary p-2 text-white md:p-4">
          <RadioGroup
            onChange={set_handle_order_payment_method}
            value={handle_order_payment_method}
          >
            <Stack direction="column">
              {handle_order_type === 'collect_my_order' && (
                <>
                  <Radio value="pay on collection">Pay on collection.</Radio>
                  <Radio value="pay online">Pay online</Radio>
                </>
              )}
              {handle_order_type === 'bring_to_doorstep' && (
                <>
                  {' '}
                  <Radio value="pay on delivery">Pay on delivery</Radio>
                  <Radio value="pay online">Pay online</Radio>
                </>
              )}
            </Stack>
          </RadioGroup>
        </div>
        <Stack direction="column">
          <p className="pt-4 text-white">Coupon Code</p>
          <input
            type="text"
            placeholder="Enter your coupon code"
            value={coupon_code}
            onChange={(e) => setCouponCode(e.target.value)}
            className="col-span-2 w-full rounded border-none bg-blue-secondary p-2  text-sm text-blue-superlight placeholder-blue-superlight outline-none"
          />
        </Stack>
      </div>

      {/* REMOVED THIS BECAUSE IM NOW CHECKING PAYMENT METHOD FROM COOKIES */}
      <p className="py-4  text-center text-white">Select Payment Method</p>
      <div className="bg- flex flex-col space-y-2 rounded p-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {data.payment_methods?.map((item, index) => (
            <div
              onClick={() => handlePaymentMethodClick(item)}
              key={index}
              className={`${
                selectedPaymentMethod === item.name
                  ? ' hover:bg-gray-secodary bg-gray-100 '
                  : 'bg-white hover:bg-gray-100 '
              } relative flex cursor-pointer content-center items-center justify-center rounded border-2 border-blue-light p-2 `}
            >
              {selectedPaymentMethod === item.name && (
                <div className="absolute top-0 right-0 flex text-blue-primary">
                  <CheckCircleIcon height={14} width={14} />
                </div>
              )}
              <div className="relative h-10 w-10">
                <Image src={item.icon} layout="fill" />
              </div>
            </div>
          ))}

          {/* Render input fields based on the selected payment method */}
          {selectedPaymentMethod === 'ecocash' && (
            <div className="col-span-3">
              <input
                type="text"
                placeholder="Phone"
                value={paymentDetails.payment_details.phone}
                onChange={(e) => handleInputChange(e, 'phone')}
                className="col-span-2 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
              />
            </div>
          )}

          {selectedPaymentMethod === 'visa' && (
            <div className="col-span-3">
              <input
                type="text"
                placeholder="Card Number"
                value={paymentDetails.payment_details.card_number}
                onChange={(e) => handleInputChange(e, 'card_number')}
                className="col-span-2 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
              />
              <input
                type="text"
                placeholder="Card Holder Name"
                value={paymentDetails.payment_details.card_holder}
                onChange={(e) => handleInputChange(e, 'card_holder')}
                className="col-span-2 my-2 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expiry Date"
                  value={paymentDetails.payment_details.card_expiry}
                  onChange={(e) => handleInputChange(e, 'card_expiry')}
                  className="col-span-1 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
                />

                <input
                  type="text"
                  placeholder="CVV"
                  value={paymentDetails.payment_details.cvv}
                  onChange={(e) => handleInputChange(e, 'cvv')}
                  className="col-span-1 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* <div className="grid grid-cols-4 gap-4  ">
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
        </div> */}
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
          onClick={handle_payment}
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
            <p className="font-semibold">
              {loading ? 'Loading...' : 'Proceed'}
            </p>
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
