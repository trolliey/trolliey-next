import React, { useContext, useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import BlueButton from '../Buttons/BlueButton'
import { Store } from '../../Context/Store'
import { Spinner, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getError } from '../../utils/error'

function UsdPayment() {
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState('')
  const [orderID, setOrderID] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const toast = useToast()
  const [usd_loading, setUsdLoading] = useState(false)
  const router = useRouter()

  const { state, dispatch } = useContext(Store)
  const { userInfo, cart } = state

  const handle_usd_payment = async () => {
    try {
      setUsdLoading(true)
      const { data } = await axios.post(
        `${apiUrl}/api/order/usd`,
        {
          orderItems: cart.cartItems,
          address: values.address,
          itemsPrice: cart?.cartItems?.reduce(
            (a, c) => parseInt(a) + parseInt(c.quantity) * parseInt(c.price),
            0
          ),
          shippingPrice: 0,
          // @ts-ignore
          totalPrice: total_price + renderWeight(total_weight),
          full_name: values.full_name,
          province: values.province,
          collect_my_order: collect_my_order,
          method: selected_method,
          isPaid: false,
          pay_on_delivery: 'yes',
          weight: total_weight,
          paying_number: values.paying_number,
          contact_phone_number: values.contact_number,
          city: values.city,
          number_of_items_bought: cart?.cartItems?.reduce(
            (a, c) => parseInt(a) + parseInt(c.quantity),
            0
          ),
          orderId: orderID
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      toast({
        title: 'Redirecting ... ',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      // stripe.redirectToCheckout({ sessionId: data.id })
      router.push(getError(data))
    } catch (error) {
      setUsdLoading(false)
      toast({
        title: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      console.log(getError(error))
      return
    }
  }

  useEffect(() => {
    for (let i = 0; i < cart?.cartItems?.length; i++) {
      setCartItems([
        {
          description: cart?.cartItems[i]?.title,
          amount: {
            currency_code: 'USD',
            value: cart?.cartItems[i]?.price,
          },
        },
      ])
    }
  }, [cart])

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: cartItems,
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        setOrderID(orderID)
        return orderID
      })
  }

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details
      console.log('item was payed by', payer)
      setSuccess(true)
      handle_usd_payment()
    })
  }
  //capture likely error
  const onError = (data, actions) => {
    setUsdLoading(false)
    setErrorMessage('An Error occured with your payment ')
    toast({
      title: 'An Error occured with your payment',
      status: 'error',
      position: 'top-right',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <div className="flex w-full flex-col items-center">
      {usd_loading ? (
        <Spinner size="xl" />
      ) : (
        <div className='w-full'>
          <PayPalScriptProvider
            options={{
              'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            }}
          >
            {!show && (
              <BlueButton
                text={'Proceed to payment'}
                onClick={() => setShow(true)}
              />
            )}
            <div>
              {show ? (
                <PayPalButtons
                  style={{ layout: 'vertical' }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              ) : null}
            </div>
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  )
}

export default UsdPayment
