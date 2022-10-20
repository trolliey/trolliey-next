import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { BriefcaseIcon } from '@heroicons/react/solid'
import BlueButton from '../../../components/Buttons/BlueButton'
import { Store } from '../../../Context/Store'
import { getError } from '../../../utils/error'
import Cookies from 'js-cookie'
import { useToast } from '@chakra-ui/react'
import GeneralLayout from '../../../layouts/GeneralLayout'
import { apiUrl } from '../../../utils/apiUrl'

function VerifyEmail() {
  const router = useRouter()
  const { token } = router.query
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const { state, dispatch } = useContext(Store)
  const toast = useToast()

  const verify_email = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/verify?code=${token}`)
      dispatch({ type: 'USER_LOGIN', payload: data })
      Cookies.set('userInfo', JSON.stringify(data), { expires: 7 })
      setTimeout(() => {
        //@ts-ignore
        history.push('/')
      }, 1000)
      setLoading(false)
      toast({
        title: 'Login successful.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.error(getError(error))
      setLoading(false)
      //@ts-ignore
      toast({
        title: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

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
              href="mailto:mytrolliey@gmail.com"
            >
              mytrolliey@gmail.com
            </a>
          </p>
          <div className="flex">
            <BlueButton
            loading={loading}
              text={'Verify Email'}
              onClick={verify_email}
            />
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default VerifyEmail
