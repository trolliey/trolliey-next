import { CheckCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'

function Success() {
  const router = useRouter()
  const { data } = router.query
  console.log(data, 'ljjhkj')
  return (
    <GeneralLayout description="Payment Successful" title="Payment Successful">
      <div className="flex h-[65vh] flex-col items-center justify-center">
        <CheckCircleIcon className="mx-auto h-20 w-20 text-green-500" />
        <h1 className="text-center text-2xl font-semibold">Order Successful</h1>
        <div>
          <p className="text-center text-gray-500">
            Your order was successful, you will receive an email with your order
            details
          </p>

          <div className="mx-auto flex">
            <button
              onClick={() => router.push('/')}
              className="mx-auto mt-4 rounded-lg bg-new-primary px-4 py-2 text-white"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default Success
