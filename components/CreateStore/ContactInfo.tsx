import React from 'react';
import { useState } from 'react';
import Error from '../Alerts/Error';
import BlueButton from '../Buttons/BlueButton';

interface Props {
    nextStep?: any,
    handleChange?: any,
    values?: any
}

function ContactInfo({ nextStep, handleChange, values }: Props) {
    const [page_err, setPageErr] = useState('')
    return (
        <div className="py-8 max-w-7xl">
            <div className="bg-white rounded md:p-8 p-4 mx-auto">
                <p className='text-gray-700 text-lg font-semibold text-center'>How do we get in touch?</p>

                <div className="md:py-8 py-4 lg:px-32 md:px-16 px-4">
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                            <div>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        This information will be used by us to get intouch with you.
                                        </p>
                                </div>

                                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            First Name <span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <div className="max-w-lg flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={values?.first_name}
                                                    onChange={handleChange('first_name')}
                                                    id="first-name"
                                                    autoComplete="first-name"
                                                    className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Last Name <span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <div className="max-w-lg flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={values?.last_name}
                                                    onChange={handleChange('last_name')}
                                                    id="last-name"
                                                    autoComplete="last-name"
                                                    className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Email <span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <div className="max-w-lg flex rounded-md shadow-sm">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={values?.email}
                                                    onChange={handleChange('email')}
                                                    id="email"
                                                    autoComplete="email"
                                                    className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 italic">
                                            Phone Number <span className='text-gray-500 italic font-normal'>(Optional)</span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-1">
                                            <div className="max-w-lg flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={values?.phone_number}
                                                    onChange={handleChange('phone_number')}
                                                    id="phone-number"
                                                    autoComplete="phone-number"
                                                    className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Mobile Number <span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-1">
                                            <div className="max-w-lg flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={values?.mobile_number}
                                                    onChange={handleChange('mobile_number')}
                                                    id="mobile-number"
                                                    autoComplete="mobile-number"
                                                    className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {page_err && <Error error={page_err} />}
                <div className="flex flex-row items-center w-full justify-between">
                    <div className="ml-auto">
                        {
                            values?.first_name && values?.last_name && values?.email && values?.mobile_number ? (
                                <BlueButton text={'Next Step'} onClick={() => nextStep(values)} />
                            ) : (
                                    <BlueButton text={'Next Step'} onClick={() => setPageErr('Please enter all requires fields')} outline />
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
