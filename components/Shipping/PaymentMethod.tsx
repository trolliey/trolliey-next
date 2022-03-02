import React, { ReactElement } from 'react'

interface Props {
    method?: any,
    setMethod?: any,
    setPayingNumber?: any
}

const payment_methods = [
    { id: 'ecocash', title: 'Ecocash' },
    { id: 'telecash', title: 'Telecash' },
    { id: 'onemoney', title: 'One  Money' },
    { id: 'paypal', title: 'PayPal' }
]

function PaymentMethod({ method, setMethod, setPayingNumber }: Props): ReactElement {
    return (
        <>
            <div>
                <label className="text-base font-medium text-gray-900">Payment Methods</label>
                <p className="text-sm leading-5 text-gray-500">Choose a method you want to pay with</p>
                <fieldset className="mt-4">
                    <legend className="sr-only">Payment Method</legend>
                    <div className="space-y-4">
                        {payment_methods.map((payment_method) => (
                            <div key={payment_method.id} className="flex items-center">
                                <input
                                    id={payment_method.id}
                                    name="payment-method"
                                    onChange={e => setMethod(payment_method.id)}
                                    type="radio"
                                    defaultChecked={payment_method.id === 'ecocash'}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label htmlFor={payment_method.id} className="ml-3 block text-sm font-medium text-gray-700">
                                    {payment_method.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
            {
                method === 'ecocash' && (
                    <div className="col-span-full mt-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            Paying Number
                        </label>
                        <div className="mt-4">
                            <input
                                type="text"
                                onChange={e => setPayingNumber(e.target.value)}
                                id="ecocash-method"
                                name="ecocash-method"
                                placeholder='phonenumber making the payment'
                                className="block w-full border-gray-200 shadow outline-gray-300 p-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                )
            }

            {
                method === 'telecash' && (
                    <div className="col-span-full mt-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            Paying Number
                        </label>
                        <div className="mt-4">
                            <input
                                type="text"
                                onChange={e => setPayingNumber(e.target.value)}
                                id="telecash-method"
                                name="telecash-number"
                                placeholder='phonenumber making the payment'
                                className="block w-full border-gray-200 shadow outline-gray-300 p-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                )
            }

            {
                method === 'onemoney' && (
                    <div className="col-span-full mt-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            Paying Number
                        </label>
                        <div className="mt-4">
                            <input
                                type="text"
                                onChange={e => setPayingNumber(e.target.value)}
                                id="onemoney-method"
                                name="onemoney-method"
                                placeholder='phonenumber making the payment'
                                className="block w-full border-gray-200 shadow outline-gray-300 p-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                )
            }

{
                method === 'paypal' && (
                    <div className="col-span-full mt-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                            Paying Number
                        </label>
                        <div className="mt-4">
                            <input
                                type="text"
                                onChange={e => setPayingNumber(e.target.value)}
                                id="paying-number"
                                name="paying-number"
                                placeholder='phonenumber making the payment'
                                className="block w-full border-gray-200 shadow outline-gray-300 p-2 border outline-none rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default PaymentMethod