import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Avatar, Button, Divider, Flex } from '@chakra-ui/react'
import { Store } from '../../Context/Store'
import GeneralLayout from '../../layouts/GeneralLayout'
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import Address from '../../components/Shipping/Address'

function Shipping() {
  const router = useRouter()
  const { state } = useContext(Store)
  const { userInfo, cart } = state

  const [full_name, setFullName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [province, setProvince] = useState<string>('')
  const [contact_number, setContacNumber] = useState<string>('')
  const [method, setMethod] = useState<string>('')
  const [paying_number, setPayingNumber] = useState<string>('')
  const [cvv, setCvv] = useState<string>('')
  const [expiry, setExpiry] = useState<string>('')
  const [step, setStep] = useState(1)


  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping')
    }
  }, [])

  return (
    <GeneralLayout title='shipping screen' description='describe how you want trolliey to handle yout equipmwnt'>
      <div className="w-full items-center min-h-screen">
        <main className=" flex md:flex-row flex-col-reverse  gap-8  max-w-7xl">
          {/* Checkout form */}
          <div className="flex flex-col md:w-3/4 w-full bg-white p-8 rounded shadow">
            <div className="flex flex-row items-start justify-between w-full">
              <div className="flex flex-col">
                <p className="text-gray-400 font-semibold text-sm uppercase">Step: 1 of 4</p>
                <p className='text-gray-700 font-semibold'>Login</p>
              </div>
              <div className="w-2/5 bg-gray-300 rounded-full h-2.5">
                <div className="bg-blue-primary h-2.5 rounded-full" style={{width: "45%"}}></div>
              </div>
            </div>
            <Divider className='text-gray-300' my={5}/>
            {
              step === 1 && (
                <Address
                  setFullName={setFullName}
                />
              )
            }
          </div>

          <div className="md:w-1/4 w-full flex flex-col">
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

export default Shipping