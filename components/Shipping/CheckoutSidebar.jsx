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
import React, { useContext, useEffect, useState } from 'react'
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
  const [handle_order_type, setHandleOrderType] = useState('pay on collection')
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
  const [shipingMethods, setShipingMethods] = useState([])
  const [email, setEmail] = useState('')
  const toast = useToast()
  const selectedCurrency = Cookies.get('trolliey_currency') || 'USD'

  const [paymentDetails, setPaymentDetails] = useState({
    currency: 'USD',
    payment_method: handle_order_type,
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

  const getShippingMethods = () => {
    axios
      .get(`${apiUrl}/api/v2/shipping`, {
        headers: {
          authorization: `${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        console.log(data, 'shipping methods')
        setShipingMethods(data?.data?.shipping_methods)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getShippingMethods()
  }, [])

  const handlePaymentMethodClick = (item) => {
    setSelectedPaymentMethod(item.name)
  }
  console.log(selectedPaymentMethod, 'selectedPaymentMethod')

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

  const pollUntilComplete = async (orderId, paymentsId) => {
    console.log(orderId, paymentsId, 'polling')
    return new Promise(async (resolve, reject) => {
      const maxRetries = 5
      let retries = 0

      const poll = async () => {
        try {
          const { data } = await axios.get(
            `${apiUrl}/api/v2/orders/${orderId}/payments/${paymentsId}`,
            {
              headers: {
                authorization: userInfo.token,
              },
            }
          )

          if (data.data.payment.status === 'success') {
            resolve(data)
          } else if (
            data.data.payment.status === 'failed' ||
            retries >= maxRetries
          ) {
            reject(new Error('Payment Failed'))
          } else {
            setTimeout(poll, 10000)
            retries++
          }
        } catch (error) {
          reject(error)
        }
      }

      poll()
    })
  }

  const handlePolling = async (orderId, paymentsId) => {
    try {
      const data = await pollUntilComplete(orderId, paymentsId)
      console.log(data, 'data')
      toast({
        title: 'Payment Successful',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      dispatch({ type: 'CLEAR_CART' })
      history.push('/orders')
    } catch (error) {
      console.log(error)
      toast({
        title: 'Payment Failed',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handlePayment = (id) => {
    setLoading(true)

    axios
      .post(`${apiUrl}/api/v2/orders/${id}/payments`, paymentDetails, {
        headers: {
          authorization: `${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        console.log(paymentDetails, 'paymentDetails')
        console.log(data.data.payment._id, 'paymentId') // Log paymentId here
        return { paymentId: data.data.payment._id, data }
      })
      .then(({ paymentId, data }) => {
        // Delay the polling by 30 seconds
        setTimeout(() => {
          handlePolling(id, paymentId)
        }, 30000)

        dispatch({ type: 'SET_POLL_URL', payload: data.response })
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
      })
      .catch((error) => {
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
      })
  }
  const handleCash = (id) => {
    setLoading(true)

    axios
      .post(
        `${apiUrl}/api/v2/orders/${id}/payments`,
        {
          currency: 'USD',
          payment_details: {
            method: 'pay_on_delivery',
            phone: paymentDetails.payment_details.phone,
          },
          payment_method: handle_order_type,
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      .then(({ data }) => {
        toast({
          title: 'Order created. Your order will be delivered in 2-3 days',

          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
        return data.data.payment._id
      })
      .catch((error) => {
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
      })
  }

  const handleEcoCashPayment = (id) => {
    setLoading(true)

    axios
      .post(
        `${apiUrl}/api/v2/orders/${id}/payments`,
        {
          currency: 'USD',
          payment_details: {
            method: 'ECOCASH',
            phone: paymentDetails.payment_details.phone,
          },
          payment_method: handle_order_type,
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      .then(({ data }) => {
        return data.data.payment._id
      })
      .then((paymentId) => {
        return handlePolling(id, paymentId)
      })
      .then(() => {
        dispatch({ type: 'SET_POLL_URL', payload: data.response })
        setLoading(false)
        toast({
          title: 'Order Created. Check your phone to complete the payment',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((error) => {
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
      })
  }

  const handle_payment = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${apiUrl}/api/v2/orders`,
        {
          products: formattedCartItems,
          address: address,
          shipping: '656a4201e849823a0b9f7900',
          email: email,
          name: full_name,
          province: city,
          method_of_payment: handle_order_type,
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
      console.log(selectedPaymentMethod, 'selectedPaymentMethod')

      if (selectedPaymentMethod === 'visa') {
        handlePayment(data.data.order._id)
      } else if (selectedPaymentMethod === 'ecocash') {
        handleEcoCashPayment(data.data.order._id)
      } else if (selectedPaymentMethod === 'paypal') {
        window.location.assign(data.approval_url)
      } else if (handle_order_type === 'pay on delivery') {
        handleCash(data.data.order._id)
      }
      setLoading(false)
      dispatch({ type: 'SET_POLL_URL', payload: data.respose })
      toast({
        title:
          selectedCurrency === 'USD' && handle_order_payment_method === 'paypal'
            ? 'Order Created. Follow the link to complete purchase'
            : handle_order_payment_method === 'ecocash'
            ? 'Order created. Check your phone to complete the payment'
            : handle_order_type === 'pay on delivery'
            ? 'Order created. Your order will be delivered in 2-3 days'
            : handle_order_type === 'pay on collection'
            ? 'Order created successfully you can come and collect it at our pickup point. '
            : null,
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      history.push('/checkout/success', { data: data.data })
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
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="col-span-2 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
        />
      </div>
      <div className="flex w-full flex-col">
        <p className="pb-4 text-white">How do you want to handle your order?</p>
        <div className="flex rounded bg-blue-secondary p-2 text-white md:p-4">
          <RadioGroup onChange={setHandleOrderType} value={handle_order_type}>
            <Stack direction="column">
              <Radio value="pay on collection">
                Collect at our pickup point.
              </Radio>

              <Radio value="pay on delivery">Bring to my doorstep</Radio>
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
              {handle_order_type === 'pay on collection' && (
                <>
                  <Radio value="pay on collection">Pay on collection.</Radio>
                  <Radio value="pay online">Pay online</Radio>
                </>
              )}
              {handle_order_type === 'pay on delivery' && (
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
      {handle_order_payment_method === 'pay online' && (
        <>
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
                // <div className="col-span-3">
                //   <input
                //     type="text"
                //     placeholder="Card Number"
                //     value={paymentDetails.payment_details.card_number}
                //     onChange={(e) => handleInputChange(e, 'card_number')}
                //     className="col-span-2 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
                //   />
                //   <input
                //     type="text"
                //     placeholder="Card Holder Name"
                //     value={paymentDetails.payment_details.card_holder}
                //     onChange={(e) => handleInputChange(e, 'card_holder')}
                //     className="col-span-2 my-2 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
                //   />
                //   <div className="grid grid-cols-2 gap-4">
                //     <input
                //       type="text"
                //       placeholder="Expiry Date"
                //       value={paymentDetails.payment_details.card_expiry}
                //       onChange={(e) => handleInputChange(e, 'card_expiry')}
                //       className="col-span-1 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
                //     />

                //     <input
                //       type="text"
                //       placeholder="CVV"
                //       value={paymentDetails.payment_details.cvv}
                //       onChange={(e) => handleInputChange(e, 'cvv')}
                //       className="col-span-1 w-full rounded border-none bg-blue-secondary p-2 text-sm text-blue-superlight placeholder-blue-superlight outline-none"
                //     />
                //   </div>
                // </div>
                <div className="col-span-3">
                  <h1 className="text-center text-white">
                    Visa Payments are Coming Soon
                  </h1>
                </div>
              )}
            </div>

            {/* <div className="grid grid-cols-4 gap-4  ">
          {handle_order_type === 'pay on delivery' && (
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
          {handle_order_type === 'pay on collection' && (
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
        </>
      )}

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
            {handle_order_type === 'pay on collection' ? (
              <Amount amount={total_amount} />
            ) : (
              <Amount amount={renderWeight(total_weight)} />
            )}
          </span>
        </div>

        {selectedPaymentMethod === 'visa' ? null : (
          <div
            onClick={handle_payment}
            className="flex cursor-pointer flex-row items-center justify-between rounded-lg bg-green-500 py-2 px-4 text-white hover:bg-green-600 "
          >
            <span className="font-semibold">
              {handle_order_type === 'pay on collection' ? (
                <Amount amount={total_amount} />
              ) : (
                <Amount amount={total_amount + renderWeight(total_weight)} />
              )}
            </span>
            <div className="flex flex-row items-center space-x-2">
              <p className="font-semibold">
                {loading ? 'Loading...' : 'Proceed'}
              </p>
              <ArrowRightIcon height={20} width={20} />
            </div>
          </div>
        )}
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
