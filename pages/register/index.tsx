import React, { useContext, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import GeneralLayout from '../../layouts/GeneralLayout'
import BlueButton from '../../components/Buttons/BlueButton'
import { useRouter } from 'next/router'
import axios from 'axios'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { firebaseApp } from '../../utils/firebase-config'
import { getError } from '../../utils/error'
import { Divider, useToast } from '@chakra-ui/react'
import { apiUrl } from '../../utils/apiUrl'
import { Store } from '../../Context/Store'
import GoogleAuthButton from '../../components/Buttons/GoogleAuthButton'

function Register() {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm_password, setConfirmPassword] = useState<string>('')
  const [show_confirm_password, setShowConfirmPassword] = useState<boolean>()
  const [role, setRole] = useState<string>('')
  const [show_password, setShowPassword] = useState<boolean>(false)
  const [agreed, setAgreed] = useState<any>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const { dispatch } = useContext(Store)

  // for google uauth
  const auth = getAuth(firebaseApp)
  const googleProvider = new GoogleAuthProvider()

  const history = useRouter()
  const { redirect } = history.query

  // register with google
  const register_With_Google = async () => {
    try {
      setLoading(true)
      const res = await signInWithPopup(auth, googleProvider)
      const user = res.user
      const { data } = await axios.post(`${apiUrl}/api/auth/register`, {
        email: user.email,
        agreed: agreed,
        role: 'user',
        method: 'google',
        username: user.displayName,
        googleAuthId: user.uid,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
      })
      dispatch({ type: 'USER_LOGIN', payload: data })
      setLoading(false)
      toast({
        title: 'Account Created',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      // @ts-ignore
      history.push(redirect || '/')
    } catch (error) {
      setLoading(false)
      toast({
        title: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const register_user_handler = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    try {
      const { data } = await axios.post(`${apiUrl}/api/v2/register`, {
        email,
        password,
        username: username,
        agreed,
      })
      //@ts-ignore
      history.push(redirect || '/success/register-success')
      console.log(data)
      toast({
        title: 'Account created sucessfully!.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
    } catch (error) {
      //@ts-ignore
      toast({
        title: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  return (
    <GeneralLayout
      no_text
      og_url="register"
      title="Register on Trolliey"
      description="Create an account and join the evergrowing comminuty of Trolliey"
    >
      <div className="flex min-h-screen flex-col  bg-gray-100 py-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img src={logo} alt="login page indicator of website" className="mx-auto self-center h-16 m-4" /> */}
          <h1 className="mt-2 text-center text-lg font-extrabold text-gray-900 md:text-3xl">
            Register
          </h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <GoogleAuthButton
              onClick={register_With_Google}
              loading={loading}
            />
            <div className="flex w-full flex-row items-center space-x-4 py-4">
              <Divider />
              <p>Or</p>
              <Divider />
            </div>
            <form
              onSubmit={register_user_handler}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none  sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none  sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <div className="flex flex-row items-center rounded-md border border-gray-300 px-3 shadow-sm ">
                    <input
                      id="password"
                      name="password"
                      type={show_password ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full appearance-none py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
                    />
                    {show_password ? (
                      <div onClick={() => setShowPassword(false)}>
                        <EyeOffIcon
                          height={20}
                          width={20}
                          className="text-gray-400"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => setShowPassword(true)}
                        className="cursor-pointer"
                      >
                        <EyeIcon
                          height={20}
                          width={20}
                          className="text-gray-400"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <div className="flex flex-row items-center rounded-md border border-gray-300 px-3 shadow-sm ">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type={show_confirm_password ? 'text' : 'password'}
                      value={confirm_password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="block w-full appearance-none py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
                    />
                    {show_confirm_password ? (
                      <div onClick={() => setShowConfirmPassword(false)}>
                        <EyeOffIcon
                          height={20}
                          width={20}
                          className="text-gray-400"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => setShowConfirmPassword(true)}
                        className="cursor-pointer"
                      >
                        <EyeIcon
                          height={20}
                          width={20}
                          className="text-gray-400"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none  sm:text-sm"
                  >
                    <option value="user">Buyer</option>
                    <option value="admin">Seller</option>
                  </select>
                </div>
              </div> */}

              {/* {role === 'seller' && (
                <>
                  <div>
                    <label
                      htmlFor="store_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Store Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="store_name"
                        name="store_name"
                        value={store_name}
                        onChange={(e) => setStoreName(e.target.value)}
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none  sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="card_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="card_number"
                        name="card_number"
                        value={card_number}
                        onChange={(e) => setCardNumber(e.target.value)}
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none  sm:text-sm"
                      />
                    </div>
                  </div>
                 
                </>
              )} */}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    value={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-primary focus:ring-red-400"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I agree to the{' '}
                    <span
                      className="text-blue-primary"
                      onClick={() => history.push('/termsandconditions')}
                    >
                      terms and conditions
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <BlueButton
                  text="Register"
                  onClick={register_user_handler}
                  className="w-full"
                  loading={loading}
                />
              </div>

              <p
                onClick={() =>
                  history.push(`/login?redirect=${redirect || '/'}`)
                }
                className="my-4 cursor-pointer text-center text-sm font-semibold text-gray-500 hover:text-gray-700"
              >
                Already registered? Login instead!
              </p>
            </form>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default Register
