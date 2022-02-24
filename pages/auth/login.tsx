import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import GeneralLayout from '../../Layouts/GeneralLayout'
import Link from 'next/link'

function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show_password, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const login_user_handler = () => {
    setLoading(true)
    console.log('login user and persist')
  }

  return (
    <GeneralLayout no_text title={'Login'} description={'Login to trolliey and access more features'}>
      <main className="min-h-screen bg-gray-100 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-2 text-center md:text-3xl text-lg font-extrabold text-gray-900">Sign in to your account</h2>
        </div>

        <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6" >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <div className="flex flex-row items-center border border-gray-300 rounded-md shadow-sm px-3 ">
                    <input
                      id="password"
                      name="password"
                      type={show_password ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="appearance-none block w-full py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
                    />
                    {
                      show_password ? (
                        <div onClick={() => setShowPassword(false)}>
                          <EyeOffIcon height={20} width={20} className="text-gray-400" />
                        </div>
                      ) : (
                        <div onClick={() => setShowPassword(true)} className="cursor-pointer">
                          <EyeIcon height={20} width={20} className="text-gray-400" />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-primary focus:ring-red-400 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/register">
                    <p className="font-medium text-blue-primary hover:text-red-400 cursor-pointer">Forgot your password?</p>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  disabled={loading}
                  type="button"
                  onClick={login_user_handler}
                  className="group relative w-full flex justify-around flex-row items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-primary hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-blue-dark group-hover:text-blue-light" aria-hidden="true" />
                  </span>
                  {
                    loading ? (
                      <p>Loading...</p>
                    ) : (
                      <p>Sign in</p>
                    )
                  }
                </button>
              </div>

              <Link href={'/auth/register'}>
                <p className="text-center text-gray-500 hover:text-gray-700 font-semibold text-sm my-4 cursor-pointer">Register instead!</p>
              </Link>
            </div>

          </div>
        </section>
      </main>
    </GeneralLayout>
  )
}

export default login