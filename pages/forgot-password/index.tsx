import { BriefcaseIcon } from '@heroicons/react/outline'
import axios from 'axios'
import React, { useState } from 'react'
import BlueButton from '../../components/Buttons/BlueButton'
import GeneralLayout from '../../layouts/GeneralLayout'
import { apiUrl } from '../../utils/apiUrl'
import { getError } from '../../utils/error'

type Props = {}

function ForgotPassword({}: Props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const reset_password = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${apiUrl}/auth/reset-password/start`, {
        email: email,
      })

      console.log(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(getError(error))
    }
  }

  return (
    <GeneralLayout
      no_text
      title="Reset Your Password"
      description="Please enter you email below to reset your password"
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
            Please enter your email.
          </h2>
          <input
            type="text"
            className="w-full rounded bg-gray-200 p-2"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
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
              loading={loading}
              text={'Reset Password'}
              onClick={reset_password}
            />
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default ForgotPassword
