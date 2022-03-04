import React, { ReactElement, useState, useContext } from 'react'
import BlueButton from '../Buttons/BlueButton'
import ShipmentLayout from '../../layouts/ShipmentLayout'
import paypal_logo from '../../public/img/paypal.png'
import Image from 'next/image'
import { Divider } from '@chakra-ui/react'
import { getError } from '../../utils/error'
import axios from 'axios'
import { Store } from '../../Context/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

interface Props {
    method?: any,
    nextStep?: any,
    values?: any,
    step?: number,
    handleChange: any,
    prevStep?: any
}

const payment_methods = [
    { id: 'ecocash', title: 'Ecocash' },
    { id: 'telecash', title: 'Telecash' },
    { id: 'onemoney', title: 'One  Money' },
    { id: 'paypal', title: 'PayPal' }
]

function PaymentMethod({ nextStep, values, step, handleChange, prevStep }: Props): ReactElement {
    const { state, dispatch } = useContext(Store)
    const router = useRouter()
    const { userInfo, cart } = state
    const [selected_method, setSelectedMethod] = useState('')
    const [loading, setLoading] = useState<boolean>(false)

    const placeOrderHandler = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(`/api/orders`, {
                orderItems: cart.cartItems,
                address: values.address,
                itemsPrice: cart?.cartItems.reduce((a: any, c: any) => parseInt(a) + parseInt(c.quantity) * parseInt(c.price), 0),
                shippingPrice: 0,
                totalPrice: cart?.cartItems.reduce((a: any, c: any) => parseInt(a) + parseInt(c.quantity) * parseInt(c.price), 0),
                full_name: values.full_name,
                province: values.province,
                method: selected_method,
                isPaid: false,
                pay_on_delivery: 'yes',
                paying_number: values.paying_number,
                contact_phone_number: values.contact_number,
                city: values.city,
                number_of_items_bought: cart?.cartItems.reduce((a: any, c: any) => parseInt(a) + parseInt(c.quantity), 0)

            }, {
                headers: {
                    authorization: `${userInfo.token}`
                }
            })
            dispatch({ type: 'CART_CLEAR' })
            Cookies.remove('cartItems')
            setLoading(false)
            // console.log(cart.cartItems)
            router.push(`/order/${data._id}`)
        } catch (error) {
            setLoading(false)
            console.log(getError(error))
        }
    }

    return (
        <ShipmentLayout step={step} heading="Payment Info">
            <div>
                <label className="text-base font-medium text-gray-900 pt-4 px-4">Payment Methods</label>
                <p className="text-sm leading-5 text-gray-500 px-4">Choose a method you want to pay with</p>

                <div className="mt-4 p-4 bg-gray-200">
                    <legend className="sr-only">Payment Method</legend>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                        {
                            payment_methods.map((method: any, index: number) => (
                                <div key={index} onClick={() => setSelectedMethod(method.id)} className="col-span-1">
                                    <PaymentCard
                                        className='col-span-1'
                                        method={method.id}
                                        title={method.title}
                                        selected_method={selected_method}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Divider className="mt-4 text-gray-200" />
            {
                selected_method === 'ecocash' && (
                    <div className="col-span-full mt-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            {values.method} Ecocash Number
                        </label>
                        <div className="mt-4">
                            <input
                                type="text"
                                value={values.paying_number}
                                onChange={handleChange('paying_number')}
                                id="paying_number"
                                name="paying_number"
                                placeholder='phonenumber making the payment'
                                className="block w-full border-gray-200 p-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                )
            }
            {
                selected_method === 'telecash' && (
                    <div className="col-span-full mt-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            {values.method} Telecash Number
                        </label>
                        <div className="mt-4">
                            <input
                                type="text"
                                value={values.paying_number}
                                onChange={handleChange('paying_number')}
                                id="paying_number"
                                name="paying_number"
                                placeholder='phonenumber making the payment'
                                className="block w-full border-gray-200 p-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                )
            }
            {
                selected_method === 'onemoney' && (
                    <div className="col-span-full mt-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            {values.method} OneMoney Number
                        </label>
                        <div className="mt-4">
                            <input
                                type="text"
                                value={values.paying_number}
                                onChange={handleChange('paying_number')}
                                id="paying_number"
                                name="paying_number"
                                placeholder='phonenumber making the payment'
                                className="block w-full border-gray-200 p-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                )
            }
            <div className="flex w-full space-x-4 border-t pt-4 mt-4 border-gray-200 px-4 pb-4">
                <BlueButton
                    text="previous"
                    onClick={() => prevStep(values)}
                />
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
    className?: string,
    method?: any,
    title: string,
    selected_method?: string
}

const PaymentCard = ({ title, method, selected_method }: IProps) => {
    return (
        <div className={`${method === selected_method ? " border-blue-primary border-2" : "border border-gray-200"} cursor-pointer col-span-1 flex flex-row items-center bg-white shadow p-2 justify-between rounded `}>
            <p className={`text-blue-dark text-lg font-semibold`}>{title}</p>
            <div className="relative h-12 w-12">
                <Image layout="fill" objectFit="cover" src={paypal_logo} />
            </div>
        </div>
    )
}

export default PaymentMethod