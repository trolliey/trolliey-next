import React, { useContext, FunctionComponent } from 'react'
import GeneralLayout from './GeneralLayout'
import { Divider, Avatar } from '@chakra-ui/react'
import { Store } from '../Context/Store'
import { LockClosedIcon } from '@heroicons/react/outline'

interface Props {
    children: any,
    step?: number,
    heading:string
}

const ShipmentLayout: FunctionComponent<Props> = ({ children, step, heading }: Props) => {
    const { state } = useContext(Store)
    const { cart } = state

    //@ts-ignore
    const percentage = (step / 4) * 100

    return (
        <GeneralLayout title='Shipping' description='describe how you want trolliey to handle yout equipmwnt'>
            <div className="w-full items-center min-h-screen">
                <main className="grid lg:grid-cols-4 md:grid-cols-3 grid-col-1  gap-8  max-w-7xl">
                    {/* Checkout form */}
                    <div className="flex flex-col lg:col-span-3 md:col-span-2 col-span-1  bg-white md:p-8 p-4 rounded shadow mb-8">
                        <div className="flex flex-row items-start justify-between w-full pt-4 px-4">
                            <div className="flex flex-col">
                                <p className="text-gray-400 font-semibold text-sm uppercase">Step: {step} of 4</p>
                                <p className='text-gray-700 font-semibold'>{heading}</p>
                            </div>
                            <div className=" w-2/5 bg-gray-300 rounded-full h-2.5 flex flex-row">
                                <div className="bg-blue-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                        <Divider className='text-gray-300' my={5} />
                        {children}
                    </div>

                    <div className="md:order-2 order-1 col-span-1 flex flex-col">
                        <div className="bg-white rounded shadow p-4 w-full">
                            <h3 className='text-gray-800 font-semibold'>Order Summary</h3>
                            <div className="flex flex-row items-center text-gray-400 text-sm w-full justify-between font-semibold mt-4">
                                <p><span>{cart?.cartItems.reduce((a: any, c: any) => parseInt(a) + parseInt(c.quantity), 0)} items</span></p>
                                <p>$ {cart?.cartItems.reduce((a: any, c: any) => parseInt(a) + parseInt(c.quantity) * parseInt(c.price), 0)}</p>
                            </div>
                            <Divider className='my-4' color={'gray.400'} />
                            {cart?.cartItems?.map((item: any, index: any) => (
                                <div key={index} className="flex flex-1 flex-row items-center w-full">
                                    <Avatar src={item.pictures[0]} />
                                    <div className="flex flex-col ml-2">
                                        <p className='text-gray-900 font-semibold'>{item.title}</p>
                                        <p className='text-sm text-gray-400'>${item.price}</p>
                                    </div>
                                    <div className="flex-1"></div>
                                </div>
                            ))}
                            <Divider className='my-4' color={'gray.300'} />
                            <div className="flex flex-row items-center w-full justify-between font-semibold mt-4">
                                <p className='text-gray-800 font-bold text-sm'>TO PAY{" "}</p>
                                <div className="flex-1"></div>
                                <p className='text-blue-primary font-bold'> ${cart?.cartItems.reduce((a: any, c: any) => parseInt(a) + parseInt(c.quantity) * parseInt(c.price), 0)}</p>
                            </div>
                            <Divider className='mt-4 mb-2' color={'gray.300'} />
                            <div className="flex justify-center flex-row items-center">
                                <LockClosedIcon className='text-gray-500' height={12} width={12} />
                                <p className='text-sm text-gray-500 font-semibold'>Secure Checkout</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </GeneralLayout>
    )
}

export default ShipmentLayout
