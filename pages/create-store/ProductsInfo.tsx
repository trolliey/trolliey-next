import { Divider } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import GeneralLayout from '../../layouts/GeneralLayout';
import BlueButton from '../../components/Buttons/BlueButton'
import Tags from '../../components/Tags/Tags';
import axios from 'axios';
import { Store } from '../../Context/Store';
import { useToast } from '@chakra-ui/react'
import { getError } from '../../utils/error';

interface Props {
    nextStep?: any,
    handleChange?: any,
    values?: any,
    setBrands?: any,
    prevStep?: any,
    brands?: any
}


function ProductsInfo({ brands, handleChange, values, setBrands, prevStep }: Props) {
    const [page_err, setPageErr] = useState<string>('')
    const [agreed, setAgreed] = useState<any>(false)
    const { state } = useContext(Store)
    const { userInfo } = state
    const toast = useToast()

    const selectedTags = (tags: any) => {
        setBrands(tags)
    };

    const create_store = async () => {
        try {
            await axios.post(`/api/store`, { values, brands: brands, agreed }, {
                headers: {
                    authorization: userInfo.token
                }
            })
            toast({
                title: 'Application sent.',
                description: "We've sucessfully sent your application!.",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
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
        <GeneralLayout no_text title="Products Info" description="Enter your info about product and how you want to sell to people">
            <div className="py-8 max-w-7xl">
                <div className="bg-white rounded md:p-8 p-4 mx-auto">
                    <p className='text-gray-700 text-lg font-semibold text-center'>Details about the products you sell?</p>

                    <div className="md:py-8 py-4 lg:px-32 md:px-16 px-4">
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                <div>
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Products Information</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            This information will help us provide suitable customers for your shop.
                                        </p>
                                    </div>

                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Number Of Unique Products <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        name="number_of_uniqe_products"
                                                        value={values.number_of_uniqe_products}
                                                        onChange={handleChange('number_of_uniqe_products')}
                                                        id="unique-products"
                                                        autoComplete="unique-products"
                                                        className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                        placeholder='0'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Which brand of brands or products do you carry <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md w-full">
                                                    <Tags
                                                        selectedTags={selectedTags}
                                                        className=""
                                                    />
                                                </div>
                                                <p className='text-sm text-gray-400'>Add all your brands, one at a time</p>
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Do have a physical store? <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="flex items-center p-3 rounded bg-gray-100">
                                                    <input
                                                        id="physical_store"
                                                        name="physical_store"
                                                        type="radio"
                                                        value={'store_available'}
                                                        onChange={handleChange('physical_store')}
                                                        className="focus:ring-blue-primary h-4 w-4 textblue-primary border-gray-300"
                                                        required
                                                    />
                                                    <label htmlFor="push-nothing" className="ml-3 block text-sm font-semibold text-gray-700">
                                                        Yes, I have a physical store
                                                    </label>
                                                </div>
                                                <div className="flex items-center p-3 rounded bg-gray-100 mt-2">
                                                    <input
                                                        id="stock"
                                                        name="physical_store"
                                                        type="radio"
                                                        value={'store_not_available'}
                                                        onChange={handleChange('physical_store')}
                                                        className="focus:ring-blue-primary h-4 w-4 textblue-primary border-gray-300"
                                                        required
                                                    />
                                                    <label htmlFor="push-nothing" className="ml-3 block text-sm font-semibold text-gray-700">
                                                        No, I sell through other channels
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            values.physical_store === 'store_available' && (
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Enter address of store <span className='text-red-600'>*</span>
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <div className="max-w-lg flex rounded-md shadow-sm">
                                                            <textarea
                                                                id="physical_store_address"
                                                                name="physical_store_address"
                                                                value={values.physical_store_address}
                                                                onChange={handleChange('physical_store_address')}
                                                                rows={7}
                                                                className="max-w-lg shadow-sm block w-full p-3 outline-none sm:text-sm border border-gray-300 rounded-md"
                                                                defaultValue={''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                How do you like to handle stock? <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="flex items-center p-3 rounded bg-gray-100">
                                                    <input
                                                        id="stock_handle"
                                                        name="stock_handle"
                                                        type="radio"
                                                        value={'stock_handled_by_self'}
                                                        onChange={handleChange('stock_handle')}
                                                        className="focus:ring-blue-primary h-4 w-4 textblue-primary border-gray-300"
                                                        required
                                                    />
                                                    <label htmlFor="push-nothing" className="ml-3 block text-sm font-semibold text-gray-700">
                                                        To keep my stock and bring only delivered items
                                                    </label>
                                                </div>
                                                <div className="flex items-center p-3 rounded bg-gray-100 mt-2">
                                                    <input
                                                        id="stock_handle"
                                                        name="stock_handle"
                                                        type="radio"
                                                        value={'stock_handled_by_trolliey'}
                                                        onChange={handleChange('stock_handle')}
                                                        className="focus:ring-blue-primary h-4 w-4 textblue-primary border-gray-300"
                                                        required
                                                    />
                                                    <label htmlFor="push-nothing" className="ml-3 block text-sm font-semibold text-gray-700">
                                                        Let Trolliey keep my stock and deliver for me when items are ordered
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider className='my-8' />
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                onChange={e => setAgreed(e.target.checked)}
                                className="h-4 w-4 text-blue-primary focus:ring-red-400 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                By applying to sell on Trolliey I agree to the terms and conditions
                            </label>
                        </div>
                        <Divider className='my-8' />
                        <div className=''>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Disclaimer</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Trolliey will contact you before approving your store to check if you are a legit seller. Thank You!.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center w-full justify-between">
                        <div className="">
                            <BlueButton text={'Prev Step'} onClick={() => prevStep(values)} />
                        </div>
                        {
                            values.stock_handle && values.physical_store && values.stock_handle ? (
                                <BlueButton text={'Apply For Store'} onClick={create_store} />
                            ) : (
                                    <BlueButton text={'Apply For Store'} onClick={() => setPageErr('Please enter all requires fields')} outline />
                                )
                        }
                    </div>
                </div>
            </div>
        </GeneralLayout>
    );
}

export default ProductsInfo;
