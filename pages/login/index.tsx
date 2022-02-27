import React, { useContext, useEffect, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import GeneralLayout from '../../layouts/GeneralLayout'
import BlueButton from '../../components/Buttons/BlueButton'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Store } from '../../Context/Store'
import Cookies from 'js-cookie'

function login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [show_password, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const history = useRouter()
    const { redirect } = history.query

    const { state, dispatch } = useContext(Store)
    const { userInfo } = state

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [])

    const login_user_handler = async () => {
        try {
            const { data } = await axios.post(`/api/auth/login`, { email, password })
            dispatch({ type: 'USER_LOGIN', payload: data })
            Cookies.set('userInfo', JSON.stringify(data))
            //@ts-ignore
            history.push(redirect || '/')
            alert('login success')
        } catch (error) {
            //@ts-ignore
            alert(error.response.data ? error.response.data : error.message)
        }
    }


    return (
        <GeneralLayout no_text title='Login to you Trolliey account' description='Welcome back to Trolliey, login and enjoy shopping'>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="mt-2 text-center md:text-3xl text-lg font-extrabold text-gray-900">Login to your account</h1>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
                                    <a href="/register" className="font-medium text-blue-primary hover:text-red-400">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <BlueButton text="Sign In" className="w-full" onClick={login_user_handler} loading={loading} />
                            </div>
                            <p onClick={() => history.push('/register')} className="text-center text-gray-500 hover:text-gray-700 font-semibold text-sm my-4 cursor-pointer">Not registered? Register instead!</p>
                        </div>

                    </div>
                </div>
            </div>
        </GeneralLayout>
    )
}

export default login