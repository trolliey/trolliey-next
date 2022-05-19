import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import GeneralLayout from '../../layouts/GeneralLayout'
import BlueButton from '../../components/Buttons/BlueButton'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getError } from '../../utils/error'
import { useToast } from '@chakra-ui/react'

function Register() {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [show_password, setShowPassword] = useState<boolean>(false)
    const [agreed, setAgreed] = useState<any>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const toast = useToast()

    const history = useRouter()
    const { redirect } = history.query

    const register_user_handler = async (e: any) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`/api/auth/register`, { email, password, name: username, agreed })
            //@ts-ignore
            history.push(redirect || '/login')
            console.log(data)
            toast({
                title: 'Account created sucessfully!.',
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
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
        <GeneralLayout no_text title='Register on Trolliey' description='Create an account and join the evergrowing comminuty of Trolliey'>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* <img src={logo} alt="login page indicator of website" className="mx-auto self-center h-16 m-4" /> */}
                    <h1 className="mt-2 text-center md:text-3xl text-lg font-extrabold text-gray-900">Register</h1>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={register_user_handler} className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
                                    />
                                </div>
                            </div>
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
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        value={agreed}
                                        onChange={e => setAgreed(e.target.checked)}
                                        className="h-4 w-4 text-blue-primary focus:ring-red-400 border-gray-300 rounded"
                                    />
                                    <label onClick={()=> history.push('/termsandconditions')} htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                        I agree to the terms and conditions
                                    </label>
                                </div>

                            </div>

                            <div>
                                <BlueButton text="Register" onClick={register_user_handler} className="w-full" loading={loading} />
                            </div>
                            <p onClick={() => history.push(`/login?redirect=${redirect || '/'}`)} className="text-center text-gray-500 hover:text-gray-700 font-semibold text-sm my-4 cursor-pointer">Already registered? Login instead!</p>
                        </form>


                    </div>
                </div>
            </div>
        </GeneralLayout>
    )
}

export default Register