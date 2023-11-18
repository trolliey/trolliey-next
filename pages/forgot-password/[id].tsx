import { useToast } from '@chakra-ui/react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import BlueButton from '../../components/Buttons/BlueButton'
import GeneralLayout from '../../layouts/GeneralLayout'
import { apiUrl } from '../../utils/apiUrl'
import { getError } from '../../utils/error'

function ResetPasswordConfirm() {
  const [password, setPassword] = useState('')
  const [show_password, setShowPassword] = useState(false)
  const [confirm_password, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const { id } = router.query

  console.log(id)

  const reset_password = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${apiUrl}/api/auth/reset-password/reset`,
        {
          id: id,
          password: password,
          confirm_password: confirm_password,
        }
      )
      toast({
        title: 'Login successful.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        title: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
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
          <h2 className="pb-8 text-lg font-semibold capitalize text-blue-dark">
            enter your new password.
          </h2>
          <div className="flex w-full flex-row items-center rounded-md border border-gray-300 px-3 shadow-sm ">
            <input
              id="password"
              name="password"
              type={show_password ? 'text' : 'password'}
              value={password}
              placeholder="enter new password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full appearance-none py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
            />
            {show_password ? (
              <div onClick={() => setShowPassword(false)}>
                <EyeOffIcon height={20} width={20} className="text-gray-400" />
              </div>
            ) : (
              <div
                onClick={() => setShowPassword(true)}
                className="cursor-pointer"
              >
                <EyeIcon height={20} width={20} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex w-full flex-row items-center rounded-md border border-gray-300 px-3 shadow-sm ">
            <input
              id="password"
              name="password"
              type={show_password ? 'text' : 'password'}
              value={confirm_password}
              placeholder="confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full appearance-none py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
            />
            {show_password ? (
              <div onClick={() => setShowPassword(false)}>
                <EyeOffIcon height={20} width={20} className="text-gray-400" />
              </div>
            ) : (
              <div
                onClick={() => setShowPassword(true)}
                className="cursor-pointer"
              >
                <EyeIcon height={20} width={20} className="text-gray-400" />
              </div>
            )}
          </div>

          <p className="pb-8 pt-4 text-sm text-gray-700">
            If you have any questions please email{' '}
            <a
              className="font-semibold text-red-600"
              href="mailto:info@trolliey.com"
            >
              info@trolliey.com
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

export default ResetPasswordConfirm
