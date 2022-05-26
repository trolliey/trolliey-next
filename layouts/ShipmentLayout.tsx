import React, { useContext, FunctionComponent } from 'react'
import GeneralLayout from './GeneralLayout'
import { Divider, Avatar } from '@chakra-ui/react'
import { Store } from '../Context/Store'
import { LockClosedIcon } from '@heroicons/react/outline'

interface Props {
  children: any
  step?: number
  heading: string
}

const ShipmentLayout: FunctionComponent<Props> = ({
  children,
  step,
  heading,
}: Props) => {
  const { state } = useContext(Store)
  const { cart } = state

  //@ts-ignore
  const percentage = (step / 4) * 100

  return (
    <GeneralLayout
      no_text
      title="Shipping"
      description="describe how you want Trolliey to handle yout equipmwnt"
    >
      <div className="min-h-screen w-full items-center py-6">
        <main className="grid-col-1 max-w-7xl gap-8 flex md:flex-row flex-col-reverse">
          {/* Checkout form */}
          <div className="col-span-1 md:w-3/4 w-full mb-8 flex flex-col rounded  bg-white p-4 shadow md:col-span-2 md:p-8 lg:col-span-3">
            <div className="flex w-full flex-row items-start justify-between px-4 pt-4">
              <div className="flex flex-col">
                <p className="text-sm font-semibold uppercase text-gray-400">
                  Step: {step} of 4
                </p>
                <p className="font-semibold text-gray-700">{heading}</p>
              </div>
              <div className=" flex h-2.5 w-2/5 flex-row rounded-full bg-gray-300">
                <div
                  className="h-2.5 rounded-full bg-blue-primary"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
            <Divider className="text-gray-300" my={5} />
            {children}
          </div>

          <div className="order-1 col-span-1 flex flex-col md:w-1/4 w-full md:order-2">
            <div className="w-full rounded bg-white p-4 shadow">
              <h3 className="font-semibold text-gray-800">Order Summary</h3>
              <div className="mt-4 flex w-full flex-row items-center justify-between text-sm font-semibold text-gray-400">
                <p>
                  <span>
                    {cart?.cartItems.reduce(
                      (a: any, c: any) => parseInt(a) + parseInt(c.quantity),
                      0
                    )}{' '}
                    items
                  </span>
                </p>
                <p>
                  $ {' '}
                  {cart?.cartItems.reduce(
                    (a: any, c: any) =>
                      parseInt(a) + parseInt(c.quantity) * parseInt(c.price),
                    0
                  )}
                </p>
              </div>
              <Divider className="my-4" color={'gray.400'} />
              {cart?.cartItems?.map((item: any, index: any) => (
                <div
                  key={index}
                  className="flex w-full flex-1 flex-row items-center"
                >
                  <Avatar src={item.pictures[0]} />
                  <div className="ml-2 flex flex-col">
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-400">$ {item.price}</p>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
              <Divider className="my-4" color={'gray.300'} />
              <div className="mt-4 flex w-full flex-row items-center justify-between font-semibold">
                <p className="text-sm font-bold text-gray-800">TO PAY </p>
                <div className="flex-1"></div>
                <p className="font-bold text-blue-primary">
                  {' '}
                  $
                  {cart?.cartItems.reduce(
                    (a: any, c: any) =>
                      parseInt(a) + parseInt(c.quantity) * parseInt(c.price),
                    0
                  )}
                </p>
              </div>
              <Divider className="mt-4 mb-2" color={'gray.300'} />
              <div className="flex flex-row items-center justify-center">
                <LockClosedIcon
                  className="text-gray-500"
                  height={12}
                  width={12}
                />
                <p className="text-sm font-semibold text-gray-500">
                  Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </GeneralLayout>
  )
}

export default ShipmentLayout
