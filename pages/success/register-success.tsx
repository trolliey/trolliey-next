import { BriefcaseIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React from 'react'
import BlueButton from '../../components/Buttons/BlueButton'
import GeneralLayout from '../../layouts/GeneralLayout'

function RegisterSucess() {
  const router = useRouter()
  return (
    <GeneralLayout
      no_text
      title="Account Successfully registered"
      description="Your account has been created successfully"
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
            Please verify your email.
          </h2>
          <p className="font-semibold text-gray-700">
            We have sent you an email. If it doesn't appear check your spam
            folder
          </p>
          <p className="pb-8 font-semibold text-gray-700">
            If you have any questions please email{' '}
            <a
              className="font-semibold text-red-600"
              href="mailto:info@trolliey.com"
            >
              info@trolliey.com
            </a>
          </p>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default RegisterSucess
