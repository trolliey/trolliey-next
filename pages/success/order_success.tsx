import React, { useEffect, useContext } from 'react'
import { BriefcaseIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { Store } from '../../Context/Store'
import GeneralLayout from '../../layouts/GeneralLayout'
import BlueButton from '../../components/Buttons/BlueButton'
import { runFireWorks } from '../../utils/utils'

function OrderSucess() {
  const { dispatch } = useContext(Store)

  useEffect(() => {
    dispatch({ type: 'CLEAR_CART' })
    runFireWorks()
  }, [])

  const router = useRouter()

  return (
    <GeneralLayout
      title="Order Created Sucessfully"
      description="Order created"
      no_text
    >
      <div className="grid h-screen w-full  content-center items-center justify-center">
        <div className="flex flex-col items-center space-y-2 rounded-lg bg-white p-16 text-center">
          <p className="icon self-center">
            <BriefcaseIcon
              height={40}
              width={40}
              className={'text-green-700'}
            />
          </p>
          <h2 className="pb-8 text-lg font-semibold text-blue-dark">
            Shopping on trolliey.
          </h2>
          <p className="font-semibold text-gray-700">
            We will send you an email for feedback.
            Check your email inbox for the feedback
          </p>
          <p className="pb-8 font-semibold text-gray-700">
            If you have any questions please email{' '}
            <a
              className="font-semibold text-red-600"
              href="mailto:mytrolliey@gmail.com"
            >
              mytrolliey@gmail.com
            </a>
          </p>
          <div className="flex">
            <BlueButton
              text={'Continue Shopping'}
              onClick={() => router.push('/explore')}
            />
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default OrderSucess
