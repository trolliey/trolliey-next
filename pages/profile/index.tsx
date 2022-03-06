import { Container } from '@chakra-ui/react'
import React, { ReactElement, useState, useContext, useEffect } from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'
import { useToast } from '@chakra-ui/react'
import { getError } from '../../utils/error'
import axios from 'axios'
import { Store } from '../../Context/Store'
import { useRouter } from 'next/router'

function index(): ReactElement {
    const [name, setname] = useState<string>('')
    const [first_name, setFirstName] = useState<string>('')
    const [last_name, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [province, setProvince] = useState<string>('')
    const history = useRouter()
    const [user, setUser] = useState('')

    const { state } = useContext(Store)
    const { userInfo } = state

    const toast = useToast()
    const submitHandler = async (e: any) => {
        e.preventDefault()
        try {
            //@ts-ignore
            const { data } = axios.put('/api/users/profile', {
                name,
                first_name,
                last_name,
                email,
                country,
                address,
                city,
                province
            }, {
                headers: {
                    authorization: userInfo.token
                }
            })
            toast({
                title: 'Profile Updated Successfully ',
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })

        } catch (error) {
            toast({
                title: 'Failed.',
                description: getError(error),
                status: 'error',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        if (!userInfo) {
            history.push(`/login?redirect=profile`)
            return
        }

        const getUser = async () => {
            const data = await axios.get(`/api/users/${userInfo?.token}`, {
                headers: {
                    authorization: userInfo.token
                }
            })

            console.log(data?.data)
            setUser(data?.data.user)
        }

        getUser()
    }, [])

    return (
        <GeneralLayout no_text title='User Info' description='Edit and configure user info on Trolliey'>
            <Container maxW='container.lg'>
                <form className="space-y-8 divide-y divide-gray-200 py-8" onSubmit={submitHandler}>
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Profile Information</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        name
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                            trolliey.com/
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            //@ts-ignore
                                            defaultValue={user?.name}
                                            onChange={e => setname(e.target.value)}
                                            autoComplete="name"
                                            className="flex-1 p-2 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <div className="mt-1 flex items-center">
                                        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <button
                                            type="button"
                                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-primary"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                                <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        First name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            //@ts-ignore
                                            defaultValue={user?.firstname}
                                            onChange={e => setFirstName(e.target.value)}
                                            name="first-name"
                                            id="first-name"
                                            placeholder="enter your firstname"
                                            autoComplete="given-name"
                                            className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                        Last name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            //@ts-ignore
                                            defaultValue={user?.lastname}
                                            onChange={e => setLastName(e.target.value)}
                                            placeholder={'enter yout lastname'}
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            onChange={e => setEmail(e.target.value)}
                                            //@ts-ignore
                                            defaultValue={user?.email}
                                            placeholder={'enter your email'}
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="country"
                                            //@ts-ignore
                                            defaultValue={user?.country}
                                            onChange={e => setCountry(e.target.value)}
                                            placeholder={'enter your country'}
                                            name="country"
                                            autoComplete="country-name"
                                            className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                        Street address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            name="street-address"
                                            placeholder={'enter your address'}
                                            id="street-address"
                                            autoComplete="street-address"
                                            className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={e => setCity(e.target.value)}
                                            placeholder={'enter your city'}
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                        State / Province
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            value={province}
                                            onChange={e => setProvince(e.target.value)}
                                            placeholder={'enter your province'}
                                            name="region"
                                            id="region"
                                            autoComplete="address-level1"
                                            className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-primary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-dark hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-primary"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </Container>
        </GeneralLayout>
    )
}

export default index
