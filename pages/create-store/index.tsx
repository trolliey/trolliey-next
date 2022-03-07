import React, { useState, useContext } from 'react'
import GeneralLayout from '../../layouts/GeneralLayout';
import { Select, Divider } from '@chakra-ui/react';
import { data } from '../../utils/data';
import BlueButton from '../../components/Buttons/BlueButton';
import { Store } from '../../Context/Store';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { getError } from '../../utils/error';
import Tags from '../../components/Tags/Tags';
import Error from '../../components/Alerts/Error';

export default function CreateStore() {
    const [brands, setBrands] = useState<any>([])
    const [page_err, setPageErr] = useState<string>('')
    const [agreed, setAgreed] = useState<any>(false)
    const { state: me } = useContext(Store)
    const { userInfo } = me

    const toast = useToast()
    const selectedTags = (tags: any) => {
        setBrands(tags)
    };

    const [state, setState] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        mobile_number: '',
        company_name: '',
        business_category: '',
        company_website: '',
        about: '',
        facebook: '',
        instagram: '',
        twitter: '',
        vat_registered: false,
        busieness_registration_number: '',
        busines_owner_name: '',
        business_owner_email: '',
        number_of_uniqe_products: '',
        brands_products: [],
        stock: false,
        stock_handle: '',
        physical_store: false,
        physical_store_address: '',
        supplier_to_retailer: false,
        registered_account: false
    })

    const create_store = async () => {
        try {
            await axios.post(`/api/store`, { values: state, brands: brands, agreed }, {
                headers: {
                    authorization: userInfo.token
                }
            })
            toast({
                title: 'Application sent.',
                description: "We've sucessfully sent your application!. We will call you to veriy your details",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
            setState({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                mobile_number: '',
                company_name: '',
                business_category: '',
                company_website: '',
                about: '',
                facebook: '',
                instagram: '',
                twitter: '',
                vat_registered: false,
                busieness_registration_number: '',
                busines_owner_name: '',
                business_owner_email: '',
                number_of_uniqe_products: '',
                brands_products: [],
                stock: false,
                stock_handle: '',
                physical_store: false,
                physical_store_address: '',
                supplier_to_retailer: false,
                registered_account: false
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
        // console.log(state)
    }

    const {
        first_name,
        last_name,
        email,
        phone_number,
        mobile_number,
        company_name,
        business_category,
        company_website,
        about,
        facebook,
        instagram,
        twitter,
        vat_registered,
        busieness_registration_number,
        busines_owner_name,
        business_owner_email,
        number_of_uniqe_products,
        brands_products,
        stock,
        stock_handle,
        physical_store,
        physical_store_address,
        supplier_to_retailer,
        registered_account
    } = state

    const values: any = {
        first_name,
        last_name,
        email,
        phone_number,
        mobile_number,
        company_name,
        business_category,
        company_website,
        about,
        facebook,
        instagram,
        twitter,
        vat_registered,
        busieness_registration_number,
        busines_owner_name,
        business_owner_email,
        number_of_uniqe_products,
        brands_products,
        stock,
        stock_handle,
        physical_store,
        physical_store_address,
        supplier_to_retailer,
        registered_account
    }


    return (
        <GeneralLayout title="Create A Store" description="Apply to sell stuff on Trolliey" >
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
                                                        onChange={(e) => setState({ ...state, first_name: e.target.value })}
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
                                                        onChange={(e) => setState({ ...state, last_name: e.target.value })}
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
                                                        onChange={(e) => setState({ ...state, email: e.target.value })}
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
                                                        onChange={(e) => setState({ ...state, phone_number: e.target.value })}
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
                                                        onChange={(e) => setState({ ...state, mobile_number: e.target.value })}
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

                </div>
            </div>

            {/* // business info */}
            <div className="py-8 max-w-7xl">
                <div className="bg-white rounded md:p-8 p-4 mx-auto">
                    <p className='text-gray-700 text-lg font-semibold text-center'>Information about your business?</p>

                    <div className="md:py-8 py-4 lg:px-32 md:px-16 px-4">
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                <div>
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            This information will be used by us to know more about you and you business.
                                        </p>
                                    </div>

                                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Company Name <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="company_name"
                                                        onChange={(e) => setState({ ...state, company_name: e.target.value })}
                                                        id="copmany-name"
                                                        autoComplete="company-name"
                                                        className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Business Category <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <Select onChange={(e) => setState({ ...state, business_category: e.target.value })} placeholder='Select category' className="flex-1 block w-full outline-none min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300">
                                                        {
                                                            data.categories?.map((category, index) => (
                                                                <option key={index} value={category.value}>{category.name}</option>
                                                            ))
                                                        }
                                                    </Select>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 italic">
                                                Website <span className='text-gray-500 italic font-normal'>(Optional)</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="website"
                                                        onChange={(e) => setState({ ...state, company_website: e.target.value })}
                                                        id="company-website"
                                                        autoComplete="company-website"
                                                        className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 italic">
                                                Facebook link <span className='text-gray-500 italic font-normal'>(Optional)</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="facebook"
                                                        onChange={(e) => setState({ ...state, facebook: e.target.value })}
                                                        id="facebook-link"
                                                        autoComplete="facebook-link"
                                                        className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 italic">
                                                Twitter link <span className='text-gray-500 italic font-normal'>(Optional)</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="twitter"
                                                        onChange={(e) => setState({ ...state, twitter: e.target.value })}
                                                        id="twitter-link"
                                                        autoComplete="twitter-link"
                                                        className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 italic">
                                                Instagram link <span className='text-gray-500 italic font-normal'>(Optional)</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="instagran"
                                                        onChange={(e) => setState({ ...state, instagram: e.target.value })}
                                                        id="instagram-link"
                                                        autoComplete="instagram-link"
                                                        className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                About <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <textarea
                                                    id="about"
                                                    name="about"
                                                    onChange={(e) => setState({ ...state, about: e.target.value })}
                                                    rows={7}
                                                    className="max-w-lg shadow-sm block w-full p-3 outline-none sm:text-sm border border-gray-300 rounded-md"
                                                    defaultValue={''}
                                                    required
                                                />
                                                <p className="mt-2 text-sm text-gray-500">Write a few sentences about your store or your business.</p>
                                            </div>
                                        </div>
                                        <Divider />
                                        <p className='text-gray-700 text-lg text-center font-semibold'>Business Owner Info/ Director Details</p>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 italic">
                                                Business Owner Full Name <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-1">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="busines_owner_name"
                                                        onChange={(e) => setState({ ...state, busines_owner_name: e.target.value })}
                                                        id="owner-name"
                                                        autoComplete="owner-name"
                                                        className="flex-1 block w-full outline-none p-3 min-w-0 rounded-none rounded-r-md sm:text-sm border border-gray-300"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Business Owner Email <span className='text-red-600'>*</span>
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="business_owner_email"
                                                        onChange={(e) => setState({ ...state, business_owner_email: e.target.value })}
                                                        id="owner-email"
                                                        autoComplete="owner-email"
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
                </div>
            </div>

            {/* // product info */}
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
                                                        onChange={(e) => setState({ ...state, number_of_uniqe_products: e.target.value })}
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
                                                        onChange={(e) => setState({ ...state, physical_store: e.target.value })}
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
                                                        onChange={(e) => setState({ ...state, physical_store: e.target.value })}
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
                                            values?.physical_store === 'store_available' && (
                                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                        Enter address of store <span className='text-red-600'>*</span>
                                                    </label>
                                                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                        <div className="max-w-lg flex rounded-md shadow-sm">
                                                            <textarea
                                                                id="physical_store_address"
                                                                name="physical_store_address"
                                                                onChange={(e) => setState({ ...state, physical_store_address: e.target.value })}
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
                                                        onChange={(e) => setState({ ...state, stock_handle: e.target.value })}
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
                                                        onChange={(e) => setState({ ...state, stock_handle: e.target.value })}
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

                    {page_err && <Error error={page_err} />}
                    <div className="flex flex-row items-center w-full justify-between">
                        <div className="">
                            {/* <BlueButton text={'Prev Step'} onClick={() => prevStep(values)} /> */}
                        </div>

                        <BlueButton text={'Apply For Store'} onClick={create_store} />

                    </div>
                </div>
            </div>
        </GeneralLayout>
    )
}