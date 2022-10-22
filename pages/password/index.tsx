import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import BlueButton from '../../components/Buttons/BlueButton'
import GeneralLayout from '../../layouts/GeneralLayout'

function Password() {
    const [show_og_password, setShowOgPassword] = useState<boolean>(false)
    const [show_password1, setShowPassword1] = useState<boolean>(false)
    const [show_password2, setShowPassword2] = useState<boolean>(false)

    const [old_password, setOldPassword] = useState('')
    const [new_password1, setNewPassword1] = useState('')
    const [new_password2, setNewPassword12] = useState('')



    const change_password = () => {
        console.log(new_password1)
    }

    return (
        <GeneralLayout no_text title='Change Password' description='Change the password of your account'>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="mt-2 text-center md:text-3xl text-lg font-extrabold text-gray-900">Change Password</h1>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="space-y-6" >


                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <div className="flex flex-row items-center border border-gray-300 rounded-md shadow-sm px-3 ">
                                        <input
                                            id="password"
                                            name="password"
                                            type={show_og_password ? "text" : "password"}
                                            value={old_password}
                                            onChange={e => setOldPassword(e.target.value)}
                                            required
                                            className="appearance-none block w-full py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
                                        />
                                        {
                                            show_og_password ? (
                                                <div onClick={() => setShowOgPassword(false)}>
                                                    <EyeOffIcon height={20} width={20} className="text-gray-400" />
                                                </div>
                                            ) : (
                                                <div onClick={() => setShowOgPassword(true)} className="cursor-pointer">
                                                    <EyeIcon height={20} width={20} className="text-gray-400" />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <div className="mt-1">
                                    <div className="flex flex-row items-center border border-gray-300 rounded-md shadow-sm px-3 ">
                                        <input
                                            id="password1"
                                            name="password1"
                                            type={show_password1 ? "text" : "password"}
                                            value={new_password1}
                                            onChange={e => setNewPassword1(e.target.value)}
                                            required
                                            className="appearance-none block w-full py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
                                        />
                                        {
                                            show_password1 ? (
                                                <div onClick={() => setShowPassword1(false)}>
                                                    <EyeOffIcon height={20} width={20} className="text-gray-400" />
                                                </div>
                                            ) : (
                                                <div onClick={() => setShowPassword1(true)} className="cursor-pointer">
                                                    <EyeIcon height={20} width={20} className="text-gray-400" />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <div className="flex flex-row items-center border border-gray-300 rounded-md shadow-sm px-3 ">
                                        <input
                                            id="password2"
                                            name="password2"
                                            type={show_password2 ? "text" : "password"}
                                            value={new_password2}
                                            onChange={e => setNewPassword12(e.target.value)}
                                            required
                                            className="appearance-none block w-full py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
                                        />
                                        {
                                            show_password2 ? (
                                                <div onClick={() => setShowPassword2(false)}>
                                                    <EyeOffIcon height={20} width={20} className="text-gray-400" />
                                                </div>
                                            ) : (
                                                <div onClick={() => setShowPassword2(true)} className="cursor-pointer">
                                                    <EyeIcon height={20} width={20} className="text-gray-400" />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>



                            <div>
                                <BlueButton text="Submit" className="w-full" onClick={change_password} loading={false} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </GeneralLayout>
    )
}

export default Password
